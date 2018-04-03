<template>
  <canvas :id="v_id" width="120" height="120"></canvas>
</template>


<script>
  import canvasSorry from './sorry';
  export default {
    props: ['v_id', 'v_color'],
    data () {
      return {
      };
    },
    mounted () {
      // 首次进来渲染canvas
      this.v_color.myCanvas = document.getElementById(this.v_id);
      canvasSorry.delay(this.v_color);
    },
    updated () {
      // 首次进来渲染canvas
      this.v_color.myCanvas = document.getElementById(this.v_id);
      canvasSorry.delay(this.v_color);
    }
  };
</script>
<style scoped>
</style>
