<template>
  <div class="section">
    <div class="btn-box">
      <a id="submit" href="javascript:;" :style="{background: buttonColor}" class="btn">{{buttonFont}}</a>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
      };
    },
    props: ['index'],
    methods: {
    },
    computed: {
      buttonFont () {
        return this.$store.state.fill.button[0].buttonFont;
      },
      buttonColor () {
        return this.$store.state.fill.button[0].buttonColor;
      }
    }
  };
</script>

<style lang="scss" scoped>
  $error: #ff3021;
  $theme: #40c9b3;
  .section {
    padding: 0 12px 7px;
  .btn-box {
  .btn {
    display: block;
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    border-radius: 3px;
    background-color: $theme;
    color: #FFF;
  &:link{
     color: #FFF!important;
   }
  &:visited{
     color: #FFF!important;
   }
  &:hover{
     color: #FFF!important;
   }
  &:active {
     background-color: $theme!important;
     color: #FFF!important;
   }
  }
  .disable{
    background-color: #c6c6c6;
    color: #c6c6c6;
  &:link{
     color: #fff!important;
   }
  &:visited{
     color: #fff!important;
   }
  &:hover{
     color: #fff!important;
   }
  &:active {
     color: #fff!important;
     background-color: #c6c6c6!important;
   }
  }
  }
  }
</style>
