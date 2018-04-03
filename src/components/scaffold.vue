

<template>
  <div id="scaffold">
    <vueHeader></vueHeader>
    <groundContainer v-if="pageStyle"></groundContainer>
    <fillContainer v-else></fillContainer>
  </div>
</template>

<script>

  import vueHeader from './common/header.vue';
  import groundContainer from './groundPage/container.vue';
  import fillContainer from './fillPage/container.vue';
  export default {
    name: 'scaffold',
    data () {
      return {
        msg: '您已经进入装修页面',
        pageStyle: true
      };
    },
    mounted () {
      document.getElementsByTagName("title")[0].text = '装修工程';
      if (this.$route.params.style === 'ground') {
        this.pageStyle = true;
      } else if (this.$route.params.style === 'fill') {
        this.pageStyle = false;
      }
    },
    components: {
      vueHeader,
      groundContainer,
      fillContainer
    }
  };
</script>

<style lang="scss" scoped>
  #scaffold{
    height: 100vh;
    flex: 1 auto;
  }
</style>
