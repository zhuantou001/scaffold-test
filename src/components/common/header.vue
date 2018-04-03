<template>
  <el-menu theme="line" class="el-menu-demo" id="vueHeader" mode="horizontal">
    <!--<el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>-->
    <el-menu-item index="3"><router-link to="/project">我的作品管理</router-link></el-menu-item>
    <el-submenu index="2">
      <template slot="title">{{pageName}}</template>
      <el-menu-item @click="toScaffold('ground')" index="2-1">新建落地页</el-menu-item>
      <el-menu-item @click="toScaffold('fill')" index="2-2">新建填写页</el-menu-item>
    </el-submenu>
    <span class="header-title">
      <getPageTitleGround v-if="pageParams === 'ground'"></getPageTitleGround>
      <getPageTitleFill v-else-if="pageParams === 'fill'"></getPageTitleFill>

      <saveBtnGround v-if="pageParams === 'ground'"></saveBtnGround>
      <saveBtnFill v-else-if="pageParams === 'fill'"></saveBtnFill>

      <!--<a v-if="pageParams === 'ground'" :href="exportUrl" target="_blank">导出</a>-->
    </span>
    <span class="userInfo"><userInfo></userInfo></span>
    <userAuth></userAuth>
  </el-menu>
</template>

<script>
  import getPageTitleGround from '../groundPage/get/pageTitle';
  import getPageTitleFill from '../fillPage/get/pageTitle';
  import userInfo from '../login/userInfo';
  import saveBtnGround from '../groundPage/saveBtn';
  import saveBtnFill from '../fillPage/saveBtn';
  import {resetVuex} from '../common/common';
  import userAuth from '../project/userAuth'
  export default {
    data: function () {
      return {
        pageName: '',
        pageParams: '',
        exportUrl: ''
      };
    },
    mounted () {
      this.pageParams = this.$route.params.style;
      if (this.pageParams === 'ground') {
        this.pageName = '新建落地页';
      } else if (this.pageParams === 'fill') {
        this.pageName = '新建填写页';
      }
//      this.exportUrl = Config.http_show_url + this.page_alias;
    },
    methods: {
      toScaffold (style) {
        // 清空
        localStorage.setItem('projectData', '');
        localStorage.setItem('singleFillData', '');
        this.resetVuex();
        this.$router.push('/scaffold/' + style);
        window.location.reload();
      }
    },
    components: {
      getPageTitleGround,
      getPageTitleFill,
      userInfo,
      saveBtnGround,
      saveBtnFill,
      resetVuex,
      userAuth
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
