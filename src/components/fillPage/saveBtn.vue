<template>
  <span>
    <el-button type="success" @click="save" v-html='saveWord'></el-button>
    <el-button type="success" v-if="isEffect" @click="saveAndEffect">保存并立即生效</el-button>    
    <modalBox v-if="showModal" @closeModal="showModal=false" :width="width">
      <div slot="header">请选择文件夹</div>
      <div slot="body">
        <ul class="chooseFolder">
          <li v-for="item in folderList" :class="{ active: category_id === item.category_id, cateFlag: category_id === item.category_id}" @click="chooseF(item.category_id)" :key="item.category_id"><img src="../../assets/folder.png"/>{{item.category_name}}</li>
        </ul>
      </div>
      <div slot="footer">
        <el-button type="success" @click="addFolder">新建文件夹</el-button>
        <el-button type="success" @click="transferData">保存</el-button>
        <el-button v-if="isEffect" type="success" @click="saveAndEffect">保存并立即生效</el-button>
        <el-button type="success" @click="showModal=false">取消</el-button>
      </div>
    </modalBox>
    <loading :show="loading"></loading>
  </span>
</template>

<script>
  import loading from '../loading/Loading';
  import modalBox from '../common/modalBox';
  import {Config, ROUTES} from '../common/api';
  import {loadAll} from '../project/projectCommon';
  export default {
    data: function () {
      return {
        mode: 'new', // 新建: new , 编辑: edit
        showModal: false,
        loading: false,
        category_id: '',
        fill_id: '',
        beforeAlias: '',
        isEffect: false,
        width: 400,
        saveWord: ''
      };
    },
    mounted () {
      if (localStorage.getItem('singleFillData')) {
        this.isEffect = true;
        this.saveWord = '填写页仅保存';
      } else {
        this.isEffect = false;
        this.saveWord = '填写页保存';
      }
    },
    methods: {
      save () {
        let data = '';
        if (localStorage.getItem('singleFillData')) {
          // 编辑
          data = JSON.parse(localStorage.getItem('singleFillData'));
          this.mode = 'edit';
          this.category_id = data.category_id;
          this.fill_id = data.fill_id;
          this.beforeAlias = data.fill_alias;
          // 编辑
          this.updateData();
        } else {
          // 新建
          this.showModal = true;
          this.loadAll();
        }
      },
      chooseF (id) {
        if (id === this.category_id) {
          this.category_id = '';
        } else {
          this.category_id = id;
        }
        // alert(this.category_id);
      },
      transferData () {
//         console.log('新建保存');
        // 传文件夹ID
        const self = this;
        const pageData = this.submitFillData(this.category_id);
        const url = Config.api_url + ROUTES.addFillOption;
//        console.log('提交给后台的数据: ' + JSON.stringify(pageData));
//        console.log('提交给后台接口: ' + url + '  文件夹id: ' + this.category_id);
        this.loading = true;
        this.$ajax({
          method: 'post',
          url: url,
          data: pageData
        }).then((res) => {
          if (res.data) {
            // alert(JSON.stringify(res.data));
            if (res.data.data.ret_code === '0000') {
              this.successMsg('保存成功');
              // localStorage.setItem('projectData', JSON.stringify(pageData));
              setTimeout(function () {
                self.$router.push('/project');
              }, 500);
            } else if (res.data.data.ret_code === '5555') {
              this.failMsg(res.data.data.ret_msg);
            } else  if (res.data.data.ret_code === '9999'){
              this.failMsg('保存失败');
            }
          }
//          console.log(res.data);
          this.showModal = false;
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
          this.loading = false;
        });
      },
      saveAndEffect () {
        const data = JSON.parse(localStorage.getItem('singleFillData'));
        this.category_id = data.category_id;
        this.fill_id = data.fill_id;
        this.beforeAlias = data.fill_alias;
        this.$confirm('此操作将在导出页面生效该文件内容, 是否继续?', '提示(生产环境请谨慎操作)', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateCommon(true);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消文件立即生效'
          });
        });
      },
      updateData () {
       //console.log('更新保存');
        // 传文件夹ID
        this.updateCommon(false);
      },
      updateCommon (isCdn) {
        const pageData = this.submitFillData(this.category_id, this.fill_id);
        //console.log(pageData);
        let updateData = {};
        updateData.fill_data = pageData;
        updateData.fill_id = this.fill_id;
        updateData.beforeAlias = this.beforeAlias;
        updateData.isCdn = isCdn;
        //console.log('更新保存要提交的数据: ' + JSON.stringify(updateData));
        const url = Config.api_url + ROUTES.updateFillOption;
        this.loading = true;
        this.$ajax({
          method: 'post',
          url: url,
          data: updateData
        }).then((res) => {
          if (res.data) {
             //alert(JSON.stringify(res.data));
            if (res.data.data.ret_code === '0000') {
              if (isCdn) {
                this.successMsg('更新成功，大约5分钟，可查看修改内容!');
              } else {
                this.successMsg('更新成功');
              }
              localStorage.setItem('singleFillData', '');
              localStorage.setItem('singleFillData', JSON.stringify(pageData));
              //console.log('更新保存完之后的localStorage数据:' + JSON.stringify(pageData));
            } else if (res.data.data.ret_code === '5555') {
              this.failMsg(res.data.data.ret_msg);
            } else  if (res.data.data.ret_code === '9999'){
              this.failMsg('更新失败');
            }
          }
          this.showModal = false;
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
          this.loading = false;
        });
      },
      addFolder () {
        this.$prompt('例如:文件夹123', '请输入文件夹名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const userId = JSON.parse(localStorage.getItem('user')).id;
          const url = Config.api_url + ROUTES.addFolders + '?fname=' + value + '&operator=' + userId;
//          console.log(url);
          this.loading = true;
          this.$ajax({
            method: 'get',
            url: url
          }).then((res) => {
            // alert(JSON.stringify(res.data.data));
            if (res.data.data.ret_code === '0000') {
              this.$message({
                type: 'success',
                message: '新建文件夹:' + value + '成功'
              });
              this.loadAll();
            } else if (res.data.data.ret_code === '5555') {
              this.failMsg(res.data.data.ret_msg);
            } else  if (res.data.data.ret_code === '9999'){
              this.failMsg('保存失败');
            }
//            console.log(res.data);
            this.loading = false;
          }).catch((err) => {
            console.log(err);
            this.failMsg('服务器错误');
            this.loading = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
    computed: {
      folderList () {
        return this.$store.state.project.folderList;
      }
    },
    components: {
      modalBox,
      loadAll,
      loading
    }
  };
</script>

<style lang="scss" scoped>
  .chooseFolder{
    max-height:200px;
    overflow-y:scroll;
    &::-webkit-scrollbar{
       width: 2px;
     }
    &::-webkit-scrollbar-track
     {
       border-radius: 10px;
       background-color: #fff;
     }
    &::-webkit-scrollbar-thumb
     {
       border-radius: 10px;
       background-color: #aaa;
     }
    li{
      border-bottom: 1px solid #eee;
      padding:10px;
      font-size:16px;
      cursor:pointer;
      &:hover{
         background: #aaa;
       }
      &.active{
         background: #3970e8;
         color:#fff;
       }
      img{
        width:16px;
        margin-right:10px;
      }
    }
  }
</style>
