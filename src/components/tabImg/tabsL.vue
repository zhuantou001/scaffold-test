<template>
  <div>
    <canvas :id="v_id" width="66" height="44"></canvas>
    <p>{{v_color}}</p>
  </div>
</template>

<style>

</style>

<script>
  import canvasTabs from './../tabImg/canvas';
  export default {
    props: ['v_id', 'v_color'],
    data () {
      return {
      };
    },
    mounted () {
      // 首次进来渲染canvas
      this.v_color.myCanvas = document.getElementById(this.v_id);
      canvasTabs.delay(this.v_color);
    },
    updated () {
      // DOM元素变化时渲染canvas
      this.v_color.myCanvas = document.getElementById(this.v_id);
      canvasTabs.delay(this.v_color);
    }
  };
</script>
