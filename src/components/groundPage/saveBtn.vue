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
  import {scaffoldData, successMsg, failMsg} from '../common/common';
  import loading from '../loading/Loading';
  import modalBox from '../common/modalBox';
  import {Config, ROUTES} from '../common/api';
  import {loadAll} from '../project/projectCommon';
  export default {
    data: function () {
      return {
        mode: 'new', // 新建: new , 编辑: edit
       // showModal: false,
        loading: false,
        category_id: '',
        page_id: '',
        beforeAlias: '',
        isEffect: false,
        width: 400,
        saveWord: ''
      };
    },
    mounted () {
      if (localStorage.getItem('projectData')) {
        this.isEffect = true;
        this.saveWord = '仅保存';
        this.$store.commit('newIsDisable', true);
      } else {
        this.isEffect = false;
        this.saveWord = '保存';
        this.$store.commit('newIsDisable', false);  
      }
    },
    methods: {
      save () {
        let data = '';
        if (localStorage.getItem('projectData')) {
          // 编辑
          data = JSON.parse(localStorage.getItem('projectData'));
          this.mode = 'edit';
          this.category_id = data.category_id;
          this.page_id = data.page_id;
          this.beforeAlias = data.page_alias;
          this.updateData();
        } else {
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
        // alert('新建保存');
        // 传文件夹ID
        const self = this;
        const pageData = this.scaffoldData(this.category_id);
//        console.log(JSON.stringify(pageData));
        const url = Config.api_url + ROUTES.addScaffolOption;
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
               // console.log(res.data.data.ret_msg)
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
        const data = JSON.parse(localStorage.getItem('projectData'));
        this.category_id = data.category_id;
        this.page_id = data.page_id;
        this.beforeAlias = data.page_alias;
        this.$confirm('此操作将在导出页面生效该文件内容, 是否继续?', '提示(生产环境请谨慎操作)', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateCommon(ROUTES.updateScaffolProOption, true);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消文件立即生效'
          });
        });
      },
      updateData () {
        // alert('更新保存');
        // 传文件夹ID
        this.updateCommon(ROUTES.updateScaffolOption, false);
      },
      updateCommon (updateUrl, isCdn) {
        const pageData = this.scaffoldData(this.category_id, this.page_id);
        let updateData = {};
        updateData.scaffold_data = pageData;
        updateData.page_id = this.page_id;
        updateData.isCdn = isCdn;
        // beforeAlias 用于cdn刷新
        updateData.beforeAlias = this.beforeAlias;
        const url = Config.api_url + updateUrl;
        this.loading = true;
        this.$ajax({
          method: 'post',
          url: url,
          data: updateData
        }).then((res) => {
          if (res.data) {
//             alert(JSON.stringify(res.data));
            if (res.data.data.ret_code === '0000') {
              if (isCdn) {
                this.successMsg('更新成功，大约5分钟，可导出查看修改内容!');
              } else {
                this.successMsg('更新成功');
              }
              localStorage.setItem('projectData', '');
              localStorage.setItem('projectData', JSON.stringify(pageData));
            } else if (res.data.data.ret_code === '5555') {
              this.failMsg(res.data.data.ret_msg);
            } else  if (res.data.data.ret_code === '9999'){
              this.failMsg('更新失败');
            }
          }
//          console.log(res.data);
          this.showModal = false;
          this.loading = false;
          this.obtainData(JSON.parse(localStorage.getItem('projectData')));
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
          this.loading = false;
          this.obtainData(JSON.parse(localStorage.getItem('projectData')));
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
      },
      cancel () {
        if (this.$store.state.topImg.saveType === 'screenChange') {
          if (this.$store.state.topImg.screenType === 'vertical') {
            console.log(111)
            this.$store.commit('newScreenType', 'horizontal');
            this.$store.commit("newSaveShowModal", false);
          } else {
            this.$store.commit('newScreenType', 'vertical');
          }
        }

      }
    },
    computed: {
      showModal: {
        get() {
          return this.$store.state.topImg.saveShowModal;
        },
        set(value) {
          this.$store.commit("newSaveShowModal", value);
        }
      },
      folderList () {
        return this.$store.state.project.folderList;
      }
    },
    components: {
      scaffoldData,
      modalBox,
      loadAll,
      loading,
      successMsg,
      failMsg
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
