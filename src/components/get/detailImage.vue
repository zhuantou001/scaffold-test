<template id="detailImage">
  <div>
    详情图
    <li v-for="item in detailImgFileList">
      <img :src="item.url">
    </li>
  </div>
</template>


<script>
  export default {
    name: 'detailImage',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
      detailImgFileList () {
        return this.$store.state.detailImgFileList;
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
