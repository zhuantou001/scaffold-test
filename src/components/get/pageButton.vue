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
  .btn-box{
    margin:15px 0;
  }
</style>
