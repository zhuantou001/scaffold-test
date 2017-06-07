<template id="pageTitle">
  <span>
    <span class="page-title" >{{pageTitle}}</span>
    <span class="page-url" >({{pageUrl}})</span>
  </span>
</template>


<script>
  export default {
    name: 'pageTitle',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
      pageTitle () {
        return this.$store.state.page_title;
      },
      pageUrl () {
        return this.$store.state.page_url;
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
