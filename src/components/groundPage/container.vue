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
  import topAddButton from './topAddButton';
  import setPageTitle from './set/pageTitle';
  import setPageWords from './set/pageWords';
  import setPageWordsUrl from './set/pageWordsUrl';
  import setTopImg from './set/topImg';
  import setSwitch from './set/switch';
  import setPageButton from './set/pageButton';
  import setDetailImg from './set/detailImg';
  import setPageBg from './set/pageBg';
  import setApplyDownload from './set/applyDownload.vue';
  import templateLandingPage from './template/template';
  import obtainData from '../common/common';
  import '../web.scss';
  export default {
    name: 'container',
    data () {
      return {
        type: '', // new: 新建模式, edit: 编辑模式
        category_id: '', // 编辑页面里属于哪个文件夹ID
        page_id: '' // 编辑页面里页面ID
      };
    },
    mounted () {
      // const data = JSON.parse(localStorage.getItem('projectData'));
      let data = '';
      if (localStorage.getItem('projectData')) {
        data = JSON.parse(localStorage.getItem('projectData'));
      }
      if (data) {
        // console.log('进入落地页编辑页面');
        this.type = 'edit';
        this.obtainData(data);
      } else {
        // console.log('进入落地页新建页面');
        this.type = 'new';
      }
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
      setPageBg,
      setApplyDownload,
      templateLandingPage,
      obtainData
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
