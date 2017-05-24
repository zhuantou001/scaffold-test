<template>
  <div class="scaffold">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'scaffold',
    data () {
      return {
        msg: '您已经进入装修页面'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

</style>
