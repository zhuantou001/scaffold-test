<template>
    <canvas :id="v_id" width="100" height="28"></canvas>
</template>

<script>
  import canvasChecked from './checked';
  export default {
    props: ['v_id', 'v_color'],
    data () {
      return {
      };
    },
    watch: {
      v_color () {
        this.v_color.myCanvas = document.getElementById(this.v_id);
        canvasChecked.delay(this.v_color);
      }
    },
    mounted () {
      // 首次进来渲染canvas
      this.v_color.myCanvas = document.getElementById(this.v_id);
      canvasChecked.delay(this.v_color);
    },
    updated () {
      // 首次进来渲染canvas
      this.v_color.myCanvas = document.getElementById(this.v_id);
      canvasChecked.delay(this.v_color);
    }
  };
</script>
<style scoped>

</style>
