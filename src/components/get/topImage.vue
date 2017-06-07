<template id="topImage">
  <div>
    头图
    <img :src="topImageUrl" alt="king" onerror="" title="请上传头图" >
  </div>
</template>


<script>
  export default {
    name: 'topImage',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
      topImageUrl () {
        return this.$store.state.topImageUrl;
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
