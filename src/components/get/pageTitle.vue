<template id="pageTitle">
  <div>{{pageTitle}}</div>
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

</style>
