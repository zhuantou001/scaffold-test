<template id="pageButton">
  <div class="btn-box">
    <a href="javascript:;" class="btn" v-bind:style="{background: buttonColor}">{{buttonFont}}</a>
  </div>
</template>


<script>
  export default {
    name: 'pageButton',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
      buttonFont () {
        return this.$store.state.button.buttonObject.buttonFont;
      },
      buttonColor () {
        return this.$store.state.button.buttonObject.buttonColor;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .btn-box {
    margin:15px 0;
    .btn {
      display: block;
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 15px;
      text-align: center;
      text-decoration: none;
      border-radius: 3px;
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
</style>
