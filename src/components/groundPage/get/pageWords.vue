<template id="pageWords">
  <div class="page-words">
    <div :style="{'text-align': pageWordsStylePara}">
      <span :style="{'color': pageWordsStyleColor}">{{pageWordsContent}}</span>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'pageWords',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
      pageWordsContent () {
        return this.$store.state.button.wordsObject.wordsContent;
      },
      pageWordsStyleColor () {
        return this.$store.state.button.wordsObject.wordsColor;
      },
      pageWordsStylePara () {
        return this.$store.state.button.wordsObject.wordsPara;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-words{
    margin:15px 0;
  }
</style>
