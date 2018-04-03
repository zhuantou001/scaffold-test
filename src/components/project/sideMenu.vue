<template>
  <div>
    <el-menu mode="vertical" :default-active="activeState" class="el-side-menu">
        <div class="btn-layout"><el-button @click="toScaffold" type="primary" icon="edit">创建作品</el-button></div>
        <el-menu-item-group title="作品管理">
          <el-menu-item index="work" default-active @click="loadAllList"><i class="el-icon-message"></i>我的作品</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="文件夹管理">
          <div class="side-height" id='sideList'>
            <el-menu-item v-for="item in folderList" @click="loadInnerProject(item.category_id)" :key="item.category_id" :index="'a' + item.category_id" :title="item.category_name"><i class="el-icon-message"></i>{{item.category_name}}</el-menu-item>
          </div>
          <div class="btn-layout"><el-button @click="addFolder" icon="plus">新建文件夹</el-button></div>
        </el-menu-item-group>
    </el-menu>
    <loading :show="loading"></loading>
  </div>
</template>

<script>
  import {failMsg, resetVuex} from '../common/common';
  import {loadAll, loadInnerProject, getFolderName} from './projectCommon';
  import {Config, ROUTES} from '../common/api';
  import loading from '../loading/Loading';
  export default {
    name: 'sideMenu',
    data () {
      return {
        loading: false
      };
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      toScaffold () {
        // 创建作品
        localStorage.setItem('projectData', '');
        this.resetVuex();
        this.$router.push('/scaffold/ground');
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
            if (res.data.data.ret_code === '0000') {
              this.$message({
                type: 'success',
                message: '新建文件夹:' + value + '成功'
              });
              this.showModal = false;
              this.loadAll();
            } else if (res.data.data.ret_code === '5555') {
              this.failMsg(res.data.data.ret_msg);
            } else  if (res.data.data.ret_code === '9999'){
              this.failMsg('新建失败!');
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
      },
      loadAllList () {
        this.loadAll();
        this.$store.commit('newSearchValue', '---请选择用户---');
      }
    },
    computed: {
      activeState () {
        return this.$store.state.project.activeState;
      },
      folderList () {
        return this.$store.state.project.folderList;
      }
    },
    components: {
      failMsg,
      resetVuex,
      loadAll,
      loadInnerProject,
      getFolderName,
      loading
    }
  };
</script>

<style lang="scss" scoped>
  .el-side-menu{
    height: 100vh;
  }
  .btn-layout{
    margin:10px auto;
    text-align:center;
    button{
      width:80%;
    }
  }
  .side-height{
    height: calc(100vh - 300px);
    overflow-y:scroll;
    overflow-x:hidden;
    li{
      width:100%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    &::-webkit-scrollbar{
      width: 2px;
    }
    &::-webkit-scrollbar-track
    {
      border-radius: 10px;
      background-color: #eef1f6;
    }
    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      background-color: #aaa;
    }
  }
</style>
