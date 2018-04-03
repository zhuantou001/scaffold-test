<template>
  <div class="loadEffect">
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>

    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>

    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>
    <span :style="{backgroundColor: majorColor}"></span>

  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },
    mounted () {
    },
    updated () {
    },
    computed: {
      majorColor () {
        return this.$store.state.fill.pageNature[0].majorColor;
      }
    }
  };
</script>
<style scoped>
  .loadEffect{
    width: 80px;
    height: 80px;
    position: relative;
    margin: 0 auto;
    transform:scale(0.5);
    -webkit-transform:scale(0.5);
    z-index: 99999;
  }
  .loadEffect span{
    display: inline-block;
    width: 20px;
    height: 5px;
    border-top-left-radius: 2.5px;
    border-bottom-left-radius: 2.5px;
    position: absolute;
    animation: load 0.48s ease infinite;
    -webkit-animation: load 0.48s ease infinite;
  }
  .loadEffect div{
    width: 50%;
    height: 5px;
    border-right: 1px solid #f00;
  }
  @keyframes load{
    0%{
      opacity: 0.2;
    }
    100%{
      opacity: 1;
    }
  }
  @-webkit-keyframes load{
    0%{
      opacity: 0.2;
    }
    100%{
      opacity: 1;
    }
  }
  .loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-4px;
    animation-delay:0.04s;
    -webkit-animation-delay:0.04s;
  }
  .loadEffect span:nth-child(2){
    left: 4px;
    top: 22px;
    -webkit-transform: rotate(30deg);
    -webkit-animation-delay:0.08s;
  }
  .loadEffect span:nth-child(3){
    left: 15px;
    top: 11px;
    transform: rotate(60deg);
    animation-delay:0.12s;
    -webkit-transform: rotate(60deg);
    -webkit-animation-delay:0.12s;
  }
  .loadEffect span:nth-child(4){
    left: 50%;
    top: 8px;
    margin-left: -10px;
    transform: rotate(90deg);
    animation-delay:0.16s;
    -webkit-transform: rotate(90deg);
    -webkit-animation-delay:0.16s;
  }
  .loadEffect span:nth-child(5){
    right: 15px;
    top: 11px;
    transform: rotate(120deg);
    animation-delay:0.2s;
    -webkit-transform: rotate(120deg);
    -webkit-animation-delay:0.2s;
  }
  .loadEffect span:nth-child(6){
    right: 4px;
    top: 22px;
    transform: rotate(150deg);
    animation-delay:0.24s;
    -webkit-transform: rotate(150deg);
    -webkit-animation-delay:0.24s;
  }
  .loadEffect span:nth-child(7){
    right: 0;
    top: 50%;
    margin-top:-4px;
    transform: rotate(180deg);
    animation-delay:0.28s;
    -webkit-transform: rotate(180deg);
    -webkit-animation-delay:0.28s;
  }
  .loadEffect span:nth-child(8){
    right: 4px;
    bottom: 22px;
    transform: rotate(210deg);
    animation-delay:0.32s;
    -webkit-transform: rotate(210deg);
    -webkit-animation-delay:0.32s;
  }
  .loadEffect span:nth-child(9){
    right: 15px;
    bottom: 11px;
    transform: rotate(240deg);
    animation-delay:0.36s;
    -webkit-transform: rotate(240deg);
    -webkit-animation-delay:0.36s;
  }
  .loadEffect span:nth-child(10){
    bottom: 8px;
    left: 50%;
    margin-left: -10px;
    transform: rotate(270deg);
    animation-delay:0.4s;
    -webkit-transform: rotate(270deg);
    -webkit-animation-delay:0.4s;
  }
  .loadEffect span:nth-child(11){

    left: 15px;
    bottom: 11px;
    transform: rotate(300deg);
    animation-delay:0.44s;
    -webkit-transform: rotate(300deg);
    -webkit-animation-delay:0.44s;
  }
  .loadEffect span:nth-child(12){
    left: 4px;
    bottom: 22px;
    transform: rotate(330deg);
    animation-delay:0.48s;
    -webkit-transform: rotate(330deg);
    -webkit-animation-delay:0.48s;
  }

</style>
