<template>
  <div>
    <el-menu mode="vertical" :default-active="activeState" class="el-side-menu">
      <router-link to="/scaffold">
        <div class="btn-layout"><el-button type="primary" icon="edit">创建作品</el-button></div>
      </router-link>
        <el-menu-item-group title="作品管理">
          <el-menu-item index="work" default-active @click="loadAll(111)"><i class="el-icon-message"></i>我的作品</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="文件夹管理">
          <div class="side-height">
            <el-menu-item v-for="item in folderList" @click="loadProject(item.id)" :key="item.id" :index="item.id"><i class="el-icon-message"></i>{{item.name}}</el-menu-item>
          </div>
          <div class="btn-layout"><el-button icon="plus">新建文件夹</el-button></div>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
  import failMsg from '../common/common';
  import {loadAll, loadProject, getFolderName} from './projectCommon';
  export default {
    name: 'sideMenu',
    data () {
      return {
        folderList: []
      };
    },
    mounted () {
      this.getFolderName();
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      activeState () {
        return this.$store.state.project.activeState;
      }
    },
    components: {
      failMsg,
      loadAll,
      loadProject,
      getFolderName
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
