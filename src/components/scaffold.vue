

<template>
  <div class="scaffold">
    <vueHeader></vueHeader>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

  import vueHeader from './common/header.vue'
  export default {
    name: 'scaffold',
    data () {
      return {
        msg: '您已经进入装修页面'
      }
    },
    components: {
      vueHeader
    }
  }
</script>
