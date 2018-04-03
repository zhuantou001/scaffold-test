<template>
  <span v-if="show" class="loading-mask">
    <loadingIcon></loadingIcon>
  </span>
</template>

<script>
  import loadingIcon from "../tabImg/loadingIcon";
  export default {
    props:['show'],
    components: {
      loadingIcon
    }
  };

</script>
<style>
  .loading-mask {
    display: block;
    position: fixed;
    text-align: center;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin: -30px 0 0 -30px;
    z-index: 2222;
  }

</style>

