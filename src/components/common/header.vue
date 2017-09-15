<template>
  <el-menu theme="line" class="el-menu-demo" id="vueHeader" mode="horizontal">
    <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
    <el-submenu index="2">
      <template slot="title">{{pageName}}</template>
      <el-menu-item @click="toScaffold('ground')" index="2-1">新建落地页</el-menu-item>
      <el-menu-item @click="toScaffold('fill')" index="2-2">新建填写页</el-menu-item>
    </el-submenu>
    <el-menu-item index="3"><router-link to="/project">我的作品管理</router-link></el-menu-item>
    <span class="header-title">
      <getPageTitleGround v-if="pageParams === 'ground'"></getPageTitleGround>
      <getPageTitleFill v-else-if="pageParams === 'fill'"></getPageTitleFill>
      <saveBtnGround v-if="pageParams === 'ground'"></saveBtnGround>
      <saveBtnFill v-else-if="pageParams === 'fill'"></saveBtnFill>
    </span>
    <span class="userInfo"><userInfo></userInfo></span>

  </el-menu>
</template>

<script>
  import getPageTitleGround from '../groundPage/get/pageTitle';
  import getPageTitleFill from '../fillPage/get/pageTitle';
  import userInfo from '../login/userInfo';
  import saveBtnGround from '../groundPage/saveBtn';
  import saveBtnFill from '../fillPage/saveBtn';
  import {resetVuex} from '../common/common';
  export default {
    data: function () {
      return {
        pageName: '',
        pageParams: ''
      };
    },
    mounted () {
      this.pageParams = this.$route.params.style;
      if (this.pageParams === 'ground') {
        this.pageName = '新建落地页';
      } else if (this.pageParams === 'fill') {
        this.pageName = '新建填写页';
      }
    },
    methods: {
      toScaffold (style) {
        // 清空
        localStorage.setItem('projectData', '');
        window.location.reload();
        this.resetVuex();
        this.$router.push('/scaffold/' + style);
      }
    },
    components: {
      getPageTitleGround,
      getPageTitleFill,
      userInfo,
      saveBtnGround,
      saveBtnFill,
      resetVuex
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
