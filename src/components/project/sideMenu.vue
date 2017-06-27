<template>
  <div>
    <el-menu mode="vertical" default-active="1" class="el-side-menu">
      <router-link to="/scaffold">
        <div class="btn-layout"><el-button type="primary" icon="edit">创建作品</el-button></div>
      </router-link>
      <el-menu-item-group title="作品管理">
        <el-menu-item index="work"><i class="el-icon-message"></i>我的作品</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="文件夹管理">
        <el-menu-item index="folder1"><i class="el-icon-message"></i>文件夹1</el-menu-item>
        <el-menu-item index="folder2"><i class="el-icon-message"></i>文件夹2</el-menu-item>
        <div class="btn-layout"><el-button icon="plus">新建文件夹</el-button></div>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'sideMenu',
    data () {
      return {
      };
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
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
</style>
