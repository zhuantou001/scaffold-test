<template id="pageTitle">
  <span class="page-title" >{{pageTitle}}</span>
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-title{
    display: inline-block;
    position: relative;
    top:5px;
    margin-right:15px;
  }
</style>
