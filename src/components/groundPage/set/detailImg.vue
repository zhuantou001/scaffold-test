
<template id="detailImg">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 详情图
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click.stop="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>上传详情图</label></el-col>
      <el-col :span="18">
				<div class="img-list">
					<draggable v-model="transferArr" :move="getdata" @update="datadragEnd" @start="drag=true" @end="drag=false" :options="{animation: 200,handle:'.dragDiv'}" @dragover="allowDrop">
						<transition-group>
							<div class="img-content dragDiv" title='拖动排序'  :index="key" v-for="(item,key) in absoluteDetailImgUrls" :key="key">
								<img :src="item.url">
								<!-- 放大icon -->
								<div class="layer">
									<i class="icon el-icon-view"  @click="handleFileEnlarge(item.url)"></i>
									<i @click="handleRemove(item,key)" class="icon el-icon-delete"></i>
								</div>
							</div>
						</transition-group>
					</draggable>
					<div v-if="!pass && progress !== 0" class="img-content img-progress">
						<el-progress type='circle' :width='148' :percentage="progress" :status="proStatus"></el-progress>
					</div>
					<div class="img-upload">
						<el-upload class="uploader"
							ref="upload"
							list-type="picture-card"
							:show-file-list="false"
							:action="params.action"
							:headers="headerToken"
							:data="params.data"
							:on-change="uploadOnChange"
							:before-upload="beforeAvatarUpload"
							:on-success="handleAvatarSuccess"
							:on-error="uploadOnError"
							:on-progress="uploadOnProgress">
								<el-button type="primary">点击上传</el-button>
						</el-upload>
					</div>
					<el-dialog title="" :visible.sync="isEnlargeImage" size="tiny" :modal-append-to-body="false" top="15%" width="60%">
						<img @click="isEnlargeImage = false" style="width:100%;" :src="enlargeImage">
					</el-dialog>
				</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {scaffoldData, deleteComponent, successMsg, failMsg} from '../../common/common';
import {Config, ROUTES} from '../../common/api';
import draggable from 'vuedraggable';
import sortAB from '../../common/common';
export default{
	name: 'detailImg',
	data(){
		return {
      isSpread: true,
      index: 6,
      serverUrl: Config.api_url + ROUTES.detailImgUpload,
      headerToken: {'x-access-token':localStorage.getItem('token')},
      category_id: '',
      page_id: '',
      progress: 0,//上传进度
      detailImgShow: true,
			pass: null,//是否上传成功
			transferArr: [], // 拖动调整顺序后的数组
			isEnlargeImage: false,//放大图片
			enlargeImage: '',//放大图片地址
			params: {
				action: Config.api_url + ROUTES.detailImgUpload,
				// action: 'https://demo.mall.10010.com:8108/scaffold-app' + ROUTES.detailImgUpload,
				data: {}
			},
			page_alias: ''
		}
	},
	mounted () {
		this.transferArr = this.detailImgFileList;
	},
	watch: {
		detailImgShow: function () {
			this.$store.commit('newDetailImgShow', this.detailImgShow);
		}
	},
	methods: {
		getdata (evt) {
			// console.log(evt.draggedContext.element.index);
		},
		datadragEnd (evt) {
			this.detailImgFileList = this.transferArr;
			this.$store.commit('newDetailImgFileList', this.detailImgFileList);
		},
		allowDrop (evt) {
			evt.preventDefault();
		},
		uploadOnProgress(e,file){//开始上传
			this.progress = Math.floor(e.percent)
		},
		uploadOnChange(file){
			if(file.status == 'ready'){
				this.pass = null;
				this.progress = 0;
			}else if(file.status == 'fail'){
				this.$message.error("图片上传出错，请刷新重试！")
			}
		},
		beforeAvatarUpload (file) {
			const isJPG = file.type === 'image/jpeg';
			const isPNG = file.type === 'image/png';
			// 测试环境 限制50kb
			const isLt2M = file.size / 1024 < 50;
			// 正式环境  100kb
			// const isLt2M = file.size / 1024 < 100;
			if (!isJPG && !isPNG) {
				this.failMsg('上传头图图片只能是 JPG或者PNG 格式');
				return false;
			}
			if (!isLt2M) {
				this.failMsg('上传头图图片大小不能超过 50kb!');
				return false;
				// this.$message.error('上传头图图片大小不能超过 100kb!');
			}
			return (isPNG || isJPG) && isLt2M;
		},
		handleAvatarSuccess(res,file){//上传附件
			this.pass = true;
			if (res.resultCode === '0000') {
				this.successMsg('上传成功');
				let fileData = {};
				fileData.name = res.data.imgName;
				fileData.image_url = res.data.detailImg;
				this.detailImgFileList.push(fileData);
			} else {
				this.failMsg('上传失败');
			}
		},
		uploadOnError(e,file){
			this.pass = false;
		},
		handleRemove (file, fileList) {
			let i;
			const self = this;
			let data = '';
			if (localStorage.getItem('projectData')) {
				data = JSON.parse(localStorage.getItem('projectData'));
			}
			if (data) {
				// 编辑
				this.page_alias = data.page_alias;
			}
			for (i in this.detailImgFileList) {
				if (file.name === this.detailImgFileList[i].name) {
					this.$confirm('是否删除此附件？','提示',{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$ajax({
						method: 'get', //
						url: Config.api_url + ROUTES.deleteDetailImg + '?imgPath=' + this.detailImgFileList[i].image_url + '&page_alias=' + this.page_alias,
						}).then((res)=>{
							if (res.data.data.ret_code === '0000') {
								self.successMsg("删除成功！");
							}
							self.detailImgFileList.splice(i, 1);
							self.$store.commit('newDetailImgFileList', this.detailImgFileList);
							// let data = '';
							// if (localStorage.getItem('projectData')) {
							// 	data = JSON.parse(localStorage.getItem('projectData'));
							// }
							// if (data) {
							// 	// 编辑
							// 	this.category_id = data.category_id;
							// 	this.page_id = data.page_id;
							// 	this.updateData();
							// }
						}).catch((e)=>{
							self.failMsg("服务器错误");
						})
					}).catch((meg) => console.log(meg))
					
					break;
				}
			}
			console.log(this.detailImgFileList);
		},
		handleFileEnlarge(_url){//放大图片
			if(_url){
				this.enlargeImage = _url;
				this.isEnlargeImage = !this.isEnlargeImage;
			}
		},
		updateData () {
			const pageData = this.scaffoldData(this.category_id, this.page_id);
			let updateData = {};
			updateData.scaffold_data = pageData;
			updateData.page_id = this.page_id;
			updateData.isCdn = false;
			const url = Config.api_url + ROUTES.updateScaffolOption;
			this.loading = true;
			this.$ajax({
				method: 'post',
				url: url,
				data: updateData
			}).then((res) => {
				if (res.data) {
					if (res.data.data.ret_code === '0000') {
						this.successMsg('保存成功');
						localStorage.setItem('projectData', '');
						localStorage.setItem('projectData', JSON.stringify(pageData));
					} else if (res.data.data.ret_code === '5555') {
						this.failMsg(res.data.data.ret_msg);
					} else  if (res.data.data.ret_code === '9999'){
						this.failMsg('保存失败');
					}
				}
				this.loading = false;
			}).catch((err) => {
				console.log(err);
				this.failMsg('服务器错误');
				this.loading = false;
			});
		},
    deleteFun () {
      // 删除预览详情图
      this.detailImgShow = false;
      this.$store.commit('newDetailImgShow', this.detailImgShow);
      // 删除设置详情图
      this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
    },
    // 展开收起
    spread () {
      if (this.isSpread) {
        this.isSpread = false;
      } else {
        this.isSpread = true;
      }
    },
	},
	computed: {
		proStatus(){//上传状态
			if(this.pass){
				return 'success'
			}else if(this.pass == false){
				return 'exception'
			}else{
				return ''
			}
    },
    setComponentsItems () {
      return this.$store.state.app.setComponentsItems;
    },
    getComponentsItems () {
      return this.$store.state.app.getComponentsItems;
    },
		// 详情图链接数组
		detailImgFileList: {
			get () {
				return this.$store.state.detailImg.detailImgFileList;
			},
			set (value) {
				this.$store.commit('newDetailImgFileList', value);
			}
		},
		// 绝对路径数组
		absoluteDetailImgUrls () {
			let arr = [];
			for (let i = 0; i < this.detailImgFileList.length; i++) {
				let obj = {};
				obj.url = Config.img_prev_url + this.detailImgFileList[i].image_url;
				// obj.url = 'https://demo.mall.10010.com:8108/scaffold-img' + this.detailImgFileList[i].image_url;
				obj.name = this.detailImgFileList[i].name;
				arr.push(obj);
			}
			return arr;
		}
	},
  components: {
    deleteComponent,
    successMsg,
    failMsg,
		draggable
  }
}
</script>

<style scoped>
.img-list{
	overflow:hidden;
	width:100%;
}
.img-list .img-content{
	float:left;
	position:relative;
	overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
	border-radius:4px;
}
.img-list .img-upload{
	float:left;
	width: 148px;
  height: 148px;
	display:table;
	text-align:center;
}
.img-list .uploader{
	width:100%;
	display:table-cell;
	vertical-align:middle;
}
.img-list .img-progress{
	text-align:center;
	/* padding-top:50px; */
}
.img-list .img-content img{
	display:block;
	width:100%;
	height:100%;
	margin:0 auto;
	border-radius:4px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
	opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
	opacity:0;
	transition:all .3s;
}
.img-list .img-content .del{
	position:absolute;
	bottom:10px;
	right:10px;
	color:#8492a6;
	cursor:pointer;
	font-size:1.1em;
}
.img-list .img-content .layer{
	position:absolute;
	left:0;
	right:0;
	top:0;
	height:148px;
	color:#fff;
	text-align:center;
	z-index:5;
	background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
	font-size:22px;
	margin-top:62px;
}
.img-list .img-content .layer .el-icon-delete {
  margin-left: 6px;
}
.el-progress .el-progress-circle {
	margin: 0 auto;
  margin-top: 10px;
}
.el-progress .el-progress__text {
	margin-top: -145px;
}
</style>