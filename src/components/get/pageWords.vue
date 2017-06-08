<template id="pageWords">
  <div class="page-words">
    <div v-bind:style="{'text-align': pageWordsStylePara}">
      <span v-bind:style="{'color': pageWordsStyleColor}">{{pageWordsContent}}</span>
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
        return this.$store.state.words_object.wordsContent;
      },
      pageWordsStyleColor () {
        return this.$store.state.words_object.wordsColor;
      },
      pageWordsStylePara () {
        return this.$store.state.words_object.wordsPara;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-words{
    margin:15px 0;
  }
</style>
