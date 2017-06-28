

<template>
  <div id="scaffold">
    <vueHeader></vueHeader>
    <container></container>
  </div>
</template>

<script>

  import vueHeader from './common/header.vue';
  import container from './container.vue';
  export default {
    name: 'scaffold',
    data () {
      return {
        msg: '您已经进入装修页面'
      };
    },
    components: {
      vueHeader,
      container
    }
  };
</script>

<style lang="scss" scoped>
  #scaffold{
    height: 100vh;
    flex: 1 auto;
  }
</style>
