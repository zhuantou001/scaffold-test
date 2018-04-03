<template>
  <div class="describe" :style="scaleStyle" v-html="describe"></div>
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
      describe () {
        let arr = this.$store.state.fill.describes;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].describe;
          }
        }
      },
      scaleNum () {
        let arr = this.$store.state.fill.describes;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].scale;
          }
        }
      },
      scaleStyle () {
        let obj = {};
        obj.transformOrigin = 'left';
        obj.webkitTransformOrigin = 'left';
        if (this.scaleNum) {
          obj.transform = 'scale(' + this.scaleNum + ')';
          obj.webkitTransform = 'scale(' + this.scaleNum + ')';
          obj.width = 94/this.scaleNum +'%';
        }
        return obj;
      }
    }
  };
</script>

<style lang="scss" scoped>
  $error: #ff3021;
  $theme: #40c9b3;
  .describe{
    /*border-bottom:1px solid #ddd;*/
    margin:0 1.125rem;
    padding:0 0 0.625rem 0;
    color: #888;
  &.error {
     color: $error;
   }
  }
</style>
