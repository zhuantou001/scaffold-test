<template>
  <span>
    <span class="page-title" >{{pageTitle}}</span>
    <span class="page-url" >({{pageUrl}})</span>
    <!--<span class="page-url" >({{pageDesc}})</span>-->
  </span>
</template>


<script>
  export default {
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
      pageTitle () {
        return this.$store.state.fill.pageNature[0].pageTitle;
      },
      pageUrl () {
        return this.$store.state.fill.pageNature[0].pageUrl;
      },
      pageDesc () {
        return this.$store.state.fill.pageNature[0].pageDesc;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-title{
    display: inline-block;
    position: relative;
    top:5px;
  }
  .page-url{
    display: inline-block;
    position: relative;
    top:5px;
    margin-right:15px;
    font-size: 18px;
    color:#0b97c4;
  }
</style>
