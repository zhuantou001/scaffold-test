<template>
    <div id="container">
      <div class="left">
        <div class="left-space">
          <div class="web">
            <div class="page">
              <templateLandingPage></templateLandingPage>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-space">
          <topAddButton></topAddButton>
          <div :is="item.component" v-for="item in setComponentsItems"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import topAddButton from './common/topAddButton';
  import setPageTitle from './set/pageTitle';
  import setPageWords from './set/pageWords';
  import setPageWordsUrl from './set/pageWordsUrl';
  import setTopImg from './set/topImg';
  import setSwitch from './set/switch';
  import setPageButton from './set/pageButton';
  import setDetailImg from './set/detailImg';
  import setApplyDownload from './set/applyDownload.vue';
  import templateLandingPage from './template/template';
  import './web.scss';
  export default {
    name: 'container',
    data () {
      return {
      };
    },
    methods: {
      onSubmit: function () {
      }
    },
    components: {
      topAddButton,
      setPageTitle,
      setPageWords,
      setPageWordsUrl,
      setTopImg,
      setSwitch,
      setPageButton,
      setDetailImg,
      setApplyDownload,
      templateLandingPage
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      }
    }
  };
</script>
<style lang="scss" scoped>
  #container{
    height: calc(100% - 60px);
    display:flex;
  &>.left {
      flex:2;
      overflow: hidden;
      height: 100%;
      border-right:1px solid #ddd;
    }
  &>.right {
      flex:3;
      overflow: hidden;
      height: 100%;
    }
  }
</style>
