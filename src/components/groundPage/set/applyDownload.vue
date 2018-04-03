<template id="applies">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 应用下载
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>应用下载主标题</label></el-col>
      <el-col :span="18">
        <el-input v-model="main_title" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <div>
      <div style="border-bottom: 1px solid #ccc;" v-if="showList.length > 0">
        <p>已添加运用预览</p>
        <ul>
          <li>
            <el-row :gutter="20">
              <el-col :span="3" class="flowHidden">序号</el-col>
              <el-col :span="5" class="flowHidden">图片名称</el-col>
              <el-col :span="4" class="flowHidden">应用标题</el-col>
              <el-col :span="4" class="flowHidden">按钮标题</el-col>
              <el-col :span="4" class="flowHidden">应用链接</el-col>
              <el-col :span="4">操作</el-col>
            </el-row>
          </li>
          <li v-for="(item, index) in showList">
            <el-row :gutter="20">
              <el-col :span="3" class="flowHidden">应用{{index + 1}}</el-col>
              <el-col :span="5" class="flowHidden">{{item.appliesImgName}}</el-col>
              <el-col :span="4" class="flowHidden">{{item.appliesTitle}}</el-col>
              <el-col :span="4" class="flowHidden">{{item.appliesButtonText}}</el-col>
              <el-col :span="4" class="flowHidden">{{item.appliesHref}}</el-col>
              <el-col :span="4">
                <el-tooltip content="编辑" placement="top">
                  <i class="el-icon-edit selfStyle"  @click="editApply(index)"></i>
                </el-tooltip>
                <el-tooltip content="删除" placement="top">
                  <i class="el-icon-delete selfStyle"  @click="delApply(index)"></i>
                </el-tooltip>
                <el-tooltip content="下移" placement="top">
                  <i class="el-icon-caret-bottom selfStyle" @click="moveDownApply(index)"></i>
                </el-tooltip>
                <el-tooltip content="上移" placement="top">
                  <i class="el-icon-caret-top selfStyle" @click="moveUpApply(index)"></i>
                </el-tooltip>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <div>
        <p>添加运用</p>
        <el-row :gutter="20">
          <el-col :span="6"><label>上传应用图片</label></el-col>
          <el-col :span="18">
            <el-upload
              class="upload-demo"
              :action="serverUrl"
              :headers="headerToken"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="handleBfUpload">
              <el-button v-if="buttonShow" size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，单个应用只能上传一张图片。</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20"   v-if="!buttonShow">
          <el-col :span="6"><label>图片预览</label></el-col>
          <el-col :span="18">
            <img class="img-preview" :src="imageUrl" alt="">
            <el-button type="primary" @click="handleRemove" size="small">删除后重新上传</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>应用标题</label></el-col>
          <el-col :span="18">
            <el-input v-model="apply_title" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>按钮文字</label></el-col>
          <el-col :span="18">
            <el-input v-model="apply_button_title" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>应用下载链接</label></el-col>
          <el-col :span="18">
            <el-input v-model="apply_url" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-button type="primary" @click="createApply(editIndex)" icon="menu">生成此应用下载</el-button>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import {deleteComponent, successMsg, failMsg} from '../../common/common';
  import {Config, ROUTES} from '../../common/api';
  export default {
    name: 'applies',
    data () {
      return {
        isSpread: true,
        index: 7,
        serverUrl: Config.api_url + ROUTES.appImgUpload,
        appliesShow: true,
        // appliesDetail: this.$store.state.applyDownload.applies,
        fileList: [], // 图片
        buttonShow: true,
        fileData: {}, // 图片
        imageUrl: '', // 当前图片绝对地址
        apply_title: '', // 应用标题
        apply_button_title: '', // 按钮标题
        apply_url: '', // 应用链接
        showList: this.$store.state.applyDownload.appliesList, // 创建单个应用后，所有应用展示
        editIndex: 888,
        isError: false,
        errorMessage: '报错啦！', // 报错信息
        headerToken: {'x-access-token':localStorage.getItem('token')}
      };
    },
    methods: {
      handleAvatarSuccess (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
          this.fileList = [];
          this.fileData = {};
          this.fileData.name = res.data.imgName;
          this.fileData.url = res.data.appImg;
          this.imageUrl = Config.img_prev_url + res.data.appImg;
          this.fileList.push(this.fileData);
          this.buttonShow = false;
        }
      },
      // 初始数据
      initData () {
        this.fileList = [];
        this.fileData = {};
        this.apply_title = '';
        this.apply_button_title = '';
        this.apply_url = '';
        this.imageUrl = '';
        this.buttonShow = true;
      },
      // 移除上传图片
      handleRemove (file, fileList) {
        this.buttonShow = true;
        this.fileList = [];
      },
      handlePreview (file) {
      },
      handleBfUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // 测试环境 限制50kb
        const isLt2M = file.size / 1024 < 50;
        // 正式环境  100kb
        // const isLt2M = file.size / 1024 < 100;
        if (!isJPG && !isPNG) {
          this.failMsg('上传头图图片只能是 JPG或者PNG 格式');
        }
        if (!isLt2M) {
          this.$message.error('上传头图图片大小不能超过 50kb!');
          // this.$message.error('上传头图图片大小不能超过 100kb!');
        }
        return (isPNG || isJPG) && isLt2M;
      },
      // 创建单个应用
      createApply (editIndex) {
        this.isEmpty();
        if (this.isError) {
          this.$notify({
            title: '提示',
            message: this.errorMessage,
            offset: 100,
            type: 'error'
          });
          return;
        }
        this.$notify({
          title: '提示',
          message: this.errorMessage,
          offset: 100,
          type: 'success'
        });
        let thisShowList = {};
        thisShowList.appliesImgUrl = this.fileData.url;
        thisShowList.appliesImgName = this.fileData.name;
        thisShowList.appliesTitle = this.apply_title;
        thisShowList.appliesButtonText = this.apply_button_title;
        thisShowList.appliesHref = this.apply_url;
        // 判断是编辑还是新增应用
        if (this.editIndex === 888) { // 新增
          this.showList.push(thisShowList);
        } else { // 编辑
          for (let key in this.showList[this.editIndex]) {
            for (let listKey in thisShowList) {
              if (key === listKey) {
                this.showList[this.editIndex][key] = thisShowList[listKey];
              }
            }
          }
          this.editIndex = 888;
        }
        this.$store.commit('newApplies', this.showList);
        this.initData();
      },
      // 删除应用
      delApply (index) {
        if (this.editIndex !== 888) {
          this.$notify({
            title: '提示',
            message: '编辑状态下不可删除，请保存后删除！！',
            offset: 100,
            type: 'error'
          });
          return;
        }
        this.$confirm('此操作将删除该应用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showList.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 编辑应用
      editApply (index) {
        this.buttonShow = false;
        this.fileData.url = this.showList[index].appliesImgUrl;
        this.fileData.name = this.showList[index].appliesImgName;
        this.apply_title = this.showList[index].appliesTitle;
        this.apply_button_title = this.showList[index].appliesButtonText;
        this.apply_url = this.showList[index].appliesHref;
        this.imageUrl = Config.img_prev_url + this.showList[index].appliesImgUrl;
        this.editIndex = index;
      },
      // 上移应用
      moveUpApply (index) {
        if (this.editIndex !== 888) {
          this.$notify({
            title: '提示',
            message: '编辑状态下不可上移，请保存后再上移！！',
            offset: 100,
            type: 'error'
          });
          return;
        }
        if (index > 0) {
          [this.showList[index], this.showList[index - 1]] = [this.showList[index - 1], this.showList[index]];
          // 利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue，无法触发状态更新,使用this.$set()解决
          this.$set(this.showList, index, this.showList[index]);
          this.$store.commit('newApplies', this.showList);
        } else {
          this.$notify({
            title: '提示',
            message: '这已经是第一个了，不能上移。',
            offset: 100,
            type: 'error'
          });
        }
      },
      // 下移应用
      moveDownApply (index) {
        if (this.editIndex !== 888) {
          this.$notify({
            title: '提示',
            message: '编辑状态下不可下移操作，请保存后再下移！！',
            offset: 100,
            type: 'error'
          });
          return;
        }
        if (index < (this.showList.length - 1)) {
          [this.showList[index], this.showList[index + 1]] = [this.showList[index + 1], this.showList[index]];
          this.$set(this.showList, index, this.showList[index]);
          this.$store.commit('newApplies', this.showList);
        } else {
          this.$notify({
            title: '提示',
            message: '这已经是最后一个了，不能下移。',
            offset: 100,
            type: 'error'
          });
        }
      },
      // 判断应用输入项是否为空
      isEmpty () {
        if (this.buttonShow === true) {
          this.errorMessage = '请先上传应用图片';
          this.isError = true;
          return;
        }
        if (this.apply_title.trim() === '') {
          this.errorMessage = '请先填写应用标题';
          this.isError = true;
          return;
        }
        if (this.apply_button_title.trim() === '') {
          this.errorMessage = '请先填写应用按钮文案';
          this.isError = true;
          return;
        }
        if (this.apply_url.trim() === '') {
          this.errorMessage = '请先填写应用超链接';
          this.isError = true;
          return;
        }
        this.errorMessage = '添加应用成功';
        this.isError = false;
      },
      deleteFun () {
        // 删除应用下载
        this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
      },
      // 展开收起
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      }
    },
    watch: {
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      },
      // 相对路径
      main_title: {
        get () {
          return this.$store.state.applyDownload.applyDownloadTitle;
        },
        set (value) {
          this.$store.commit('newApplyDownloadTitle', value);
        }
      }
    },
    component: {
      deleteComponent,
      successMsg,
      failMsg
    }
  };

</script>

<style lang="scss" scoped>
  .flowHidden{
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 2px;
  }
  .selfStyle{
    cursor: pointer;
  }
  .img-preview{
    display: inline-block;
    width: 100px;
    height: auto;
    vertical-align: middle;
    margin-right: 20px;
  }
</style>
