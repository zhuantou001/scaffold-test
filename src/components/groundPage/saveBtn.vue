<template>
  <span>
    <el-button type="success" @click="save">保存</el-button>
    <modalBox v-if="showModal" @closeModal="showModal=false" :width="400">
      <div slot="header">请选择文件夹</div>
      <div slot="body">
        <ul class="chooseFolder">
          <li v-for="item in folderList" :class="{ active: category_id === item.category_id }" @click="chooseF(item.category_id)" :key="item.category_id"><img src="../../assets/folder.png"/>{{item.category_name}}</li>
        </ul>
      </div>
      <div slot="footer">
        <el-button type="success" @click="addFolder">新建文件夹</el-button>
        <el-button type="success" @click="transferData">保存</el-button>
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
        showModal: false,
        loading: false,
        category_id: '',
        page_id: ''
      };
    },
    mounted () {
    },
    methods: {
      save () {
        let data = '';
        if (localStorage.getItem('projectData')) {
          data = JSON.parse(localStorage.getItem('projectData'));
        }
        if (data) {
          // 编辑
          this.category_id = data.scaffold_index[0].category_id;
          this.page_id = data.scaffold_index[0].page_id;
          this.updateData();
        } else {
          // 新建
          this.showModal = true;
          this.loadAll();
        }
      },
      chooseF (id) {
        this.category_id = id;
        // alert(this.category_id);
      },
      transferData () {
        // alert('新建保存');
        // 传文件夹ID
        const self = this;
        const pageData = this.scaffoldData(this.category_id);
        console.log(JSON.stringify(pageData));
        const url = Config.api_url + ROUTES.addScaffolOption;
        this.loading = true;
        this.$ajax({
          method: 'post',
          url: url,
          data: pageData
        }).then((res) => {
          if (res.data) {
            // alert(JSON.stringify(res.data));
            if (res.data.data.ret_msg === 'success') {
              this.successMsg('保存成功');
              // localStorage.setItem('projectData', JSON.stringify(pageData));
              setTimeout(function () {
                self.$router.push('/project');
              }, 500);
            } else {
              this.failMsg(res.data.data.ret_msg);
            }
          }
          console.log(res.data);
          this.showModal = false;
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
          this.loading = false;
        });
      },
      updateData () {
        // alert('更新保存');
        // 传文件夹ID
        const pageData = this.scaffoldData(this.category_id, this.page_id);
        let updateData = {};
        updateData.scaffold_data = pageData;
        updateData.page_id = this.page_id;
        console.log(JSON.stringify(updateData));
        const url = Config.api_url + ROUTES.updateScaffolOption;
        this.loading = true;
        this.$ajax({
          method: 'post',
          url: url,
          data: updateData
        }).then((res) => {
          if (res.data) {
            // alert(JSON.stringify(res.data));
            if (res.data.data.ret_msg === 'success') {
              this.successMsg('保存成功');
              localStorage.setItem('projectData', '');
              localStorage.setItem('projectData', JSON.stringify(pageData));
            } else {
              this.failMsg(res.data.data.ret_msg);
            }
          }
          console.log(res.data);
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
          console.log(url);
          this.loading = true;
          this.$ajax({
            method: 'get',
            url: url
          }).then((res) => {
            // alert(JSON.stringify(res.data.data));
            if (res.data.data.ret_code === 1) {
              this.$message({
                type: 'success',
                message: '新建文件夹:' + value + '成功'
              });
              this.loadAll();
            } else {
              this.failMsg(res.data.data.ret_msg);
            }
            console.log(res.data);
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
      &:hover, &.active{
        background:#20a0ff;
        color:#fff;
       }
      img{
        width:16px;
        margin-right:10px;
      }
    }
  }
</style>
