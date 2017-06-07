<template id="pageTitle">
  <div class="btn-box">
    <a id="apply" href="javascript:;" class="btn" v-bind:style="{background: buttonStyle.buttonColor}">{{buttonFont}}</a>
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
        return this.$store.state.button_font;
      },
      buttonStyle () {
        return this.$store.state.buttonStyle;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .btn-box{
    margin:15px 0;
  }
</style>
