<template>
  <el-menu theme="line" class="el-menu-demo" id="vueHeader" mode="horizontal">
    <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">落地页模板</el-menu-item>
      <el-menu-item index="2-2">填写页模板</el-menu-item>
    </el-submenu>
    <span class="header-title">
       <getpageTitle></getpageTitle>
    </span>
  </el-menu>
</template>

<script>
  import getpageTitle from '../get/pageTitle';
  export default {
    data: function () {
      return {
      };
    },
    methods: {
    },
    components: {
      getpageTitle
    }
  };
</script>
