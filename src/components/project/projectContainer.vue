<template>
    <div class="container">
      <div class="container-inner" id="folder" :class="{'show':containerShow,'hide':!containerShow}">
        <singleFolder v-for="item in folderList" :key="item.category_id" :id="item.category_id" :name="item.category_name"></singleFolder>
        <singleProject v-for="item in projectList" :key="item.page_id" :id="item.page_id" :name="item.page_title" :img="item.top_img_url" :page_alias="item.page_alias"></singleProject>
        <singleFillPage v-for="item in fillList" :key="item.fill_id" :id="item.fill_id" :fill_alias="item.fill_alias" :name="item.fill_title" ></singleFillPage>
      </div>
      <div class="container-inner" id="innerProject" :class="{'show':!containerShow,'hide':containerShow}">
        <singleProject v-for="item in innerProjectList" :key="item.page_id" :id="item.page_id" :name="item.page_title" :img="item.top_img_url" :page_alias="item.page_alias"></singleProject>
        <singleFillPage v-for="item in innerFillList" :key="item.fill_id" :id="item.fill_id" :fill_alias="item.fill_alias" :name="item.fill_title" ></singleFillPage>
      </div>
      <loading :show="loading"></loading>
      <a :href="helpMeHref" class='help-me' target="_blank">帮助文档</a>
      <div class='shortcuts'>
        <shortcuts></shortcuts>
      </div>
    </div>
</template>

<script>
  import singleFolder from './singleFolder';
  import singleProject from './singleProject';
  import singleFillPage from './singleFillPage';
  import failMsg from '../common/common';
  import loadAll from './projectCommon';
  import loading from '../loading/Loading';
  import shortcuts from './shortcuts';
  export default {
    name: 'projectContainer',
    data () {
      return {
        loading: false,
        helpMeHref: 'https://demo.mall.10010.com:8108/test/mall/front/msp/operation_manual/index.html'
      };
    },
    mounted () {
      this.loadAll();
    },
    methods: {
    },
    watch: {
    },
    computed: {
      projectList () {
        return this.$store.state.project.projectList;
      },
      fillList () {
        return this.$store.state.project.fillList;
      },
      folderList () {
        return this.$store.state.project.folderList;
      },
      innerProjectList () {
        return this.$store.state.project.innerProjectList;
      },
      innerFillList () {
        return this.$store.state.project.innerFillList;
      },
      containerShow () {
        return this.$store.state.project.containerShow;
      }
    },
    components: {
      singleFolder,
      singleProject,
      singleFillPage,
      failMsg,
      loadAll,
      loading,
      shortcuts
    }
  };
</script>

<style lang="scss" scoped>
 .container{
   height: calc(100vh - 50px);
   background:#f5f7f9;
   overflow-y:scroll;
   &::-webkit-scrollbar{
      width: 5px;
    }
    .container-inner{
      padding:30px;
      display:flex;
      flex-wrap: wrap;
      &>div{
       margin:15px;
     }
    }
 }
 .show{
    display:flex !important;
  }
 .hide{
    display:none !important;
  }
 .help-me {
   width: 20px;
   padding: 9px;
   color: #333;
   text-decoration: none;
   display: inline-block;
   line-height: 20px;
   border: 1px solid #c4c4c4;
   right: 10px;
   top: 200px;
   position: absolute;
   z-index: 100;
   background-color: #ffffff;
 }
</style>
