<template id="pageWords">
  <div class="page-words">
    <!-- <div v-bind:style="{'text-align': pageWordsStylePara}">
      <a v-bind:href="pageWordsStyleUrl" v-bind:style="{'color': pageWordsStyleColor}">{{pageWordsContent}}</a>
    </div> -->
    <a v-bind:href="pageWordsStyleUrl" v-html='pageWordsContent' style='display:block;'></a>
  </div>
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
        let arr = this.$store.state.button.wordsUrlArr;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].wordsContent;
          }
        }
      },
      pageWordsStyleUrl () {
        let arr = this.$store.state.button.wordsUrlArr;
        // console.log(this.index)
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return '#image' + (parseInt(arr[i].wordsUrl) - 1);
          }
        }
        // return '#image' + (parseInt(this.$store.state.button.wordsUrlObject.wordsUrl) - 1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-words{
    margin:0 20px;
    a{
      text-decoration: none;
      color:#666;
    }
  }
</style>
