<template id="pageWords">
  <div class="page-words">
    <div v-bind:style="{'text-align': pageWordsStylePara}">
      <a v-bind:href="pageWordsStyleUrl" v-bind:style="{'color': pageWordsStyleColor}">{{pageWordsContent}}</a>
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
        return this.$store.state.words_url_object.wordsContent;
      },
      pageWordsStyleColor () {
        return this.$store.state.words_url_object.wordsColor;
      },
      pageWordsStylePara () {
        return this.$store.state.words_url_object.wordsPara;
      },
      pageWordsStyleUrl () {
        return this.$store.state.words_url_object.wordsUrl;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-words{
    margin:15px 0;
  }
</style>
