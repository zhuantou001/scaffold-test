<template id="pageWords">
      <span class="page-words cardsPs" :style="scaleStyle" v-html="pageWordsContent"></span>
</template>


<script>
  export default {
    name: 'pageWords',
    data () {
      return {
      };
    },
    props: ['index'],
    methods: {
    },
    computed: {
      pageWordsContent () {
        let arr = this.$store.state.button.wordsArr;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].wordsContent;
          }
        }
      },
      wordScale () {
        let arr = this.$store.state.button.wordsArr;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].wordScale;
          }
        }
      },
      scaleStyle () {
        let obj = {};
        obj.transformOrigin = 'left';
        obj.webkitTransformOrigin = 'left';
        if (this.wordScale) {
          obj.transform = 'scale(' + this.wordScale + ')';
          obj.webkitTransform = 'scale(' + this.wordScale + ')';
          obj.width = 100/this.wordScale +'%';
        }
        return obj;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-words{
    margin:15px 20px;
  }
  .cardsPs {
    display: inline-block;
    font-size: .75rem;
    // -webkit-transform: scale(.8);
    // -moz-transform: scale(.8);
    // -ms-transform: scale(.8);
    // -o-transform: scale(.8);
    // transform: scale(.8);
    white-space: nowrap;
    color: #666;
    // width: 125%;
    // -webkit-transform-origin: left;
    // -moz-transform-origin: left;
    // -ms-transform-origin: left;
    // -o-transform-origin: left;
    // transform-origin: left;
    margin: .5rem 0;
    text-align: center;
  }
</style>
