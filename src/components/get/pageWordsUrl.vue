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
        return this.$store.state.button.descLinkObject.wordsContent;
      },
      pageWordsStyleColor () {
        return this.$store.state.button.descLinkObject.wordsColor;
      },
      pageWordsStylePara () {
        return this.$store.state.button.descLinkObject.wordsPara;
      },
      pageWordsStyleUrl () {
        return this.$store.state.button.descLinkObject.wordsUrl;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-words{
    margin:15px 0;
  }
</style>
