<template>
  <el-menu theme="line" class="el-menu-demo" id="vueHeader" mode="horizontal">
    <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">落地页模板</el-menu-item>
      <el-menu-item index="2-2">填写页模板</el-menu-item>
    </el-submenu>
    <el-menu-item index="3"><router-link to="/project">我的作品管理</router-link></el-menu-item>
    <span class="header-title">
       <getpageTitle></getpageTitle>
      <el-button type="success">保存</el-button>
      <el-button type="warning">导出</el-button>
    </span>
    <span class="userInfo"><userInfo></userInfo></span>

  </el-menu>
</template>

<script>
  import getpageTitle from '../get/pageTitle';
  import userInfo from '../login/userInfo';
  export default {
    data: function () {
      return {
      };
    },
    methods: {
    },
    components: {
      getpageTitle,
      userInfo
    }
  };
</script>

<style lang="scss" scoped>
  #vueHeader{
    position: relative;
  .header-title{
    display: inline-block;
    position: absolute;
    right:100px;
    top:10px;
    font-size: 26px;
  }
  .userInfo{
    display: inline-block;
    position: absolute;
    right:20px;
    top:14px;
  }
  }
  a{
    text-decoration: none;
  }
</style>
