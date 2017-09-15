<template>
    <div class="container">
      <div class="container-inner" id="folder" :class="{'show':containerShow,'hide':!containerShow}">
        <singleFolder v-for="item in folderList" :key="item.category_id" :id="item.category_id" :name="item.category_name"></singleFolder>
        <singleProject v-for="item in projectList" :key="item.page_id" :id="item.page_id" :name="item.page_title" :img="item.image_url" :page_alias="item.page_alias"></singleProject>
      </div>
      <div class="container-inner" id="innerProject" :class="{'show':!containerShow,'hide':containerShow}">
        <singleProject v-for="item in innerProjectList" :key="item.page_id" :id="item.page_id" :name="item.page_title" :img="item.image_url" :page_alias="item.page_alias"></singleProject>
      </div>
      <loading :show="loading"></loading>
    </div>
</template>


<script>
  import singleFolder from './singleFolder';
  import singleProject from './singleProject';
  import projectData from '../../mock/project';
  import failMsg from '../common/common';
  import loadAll from './projectCommon';
  import loading from '../loading/Loading';
  export default {
    name: 'projectContainer',
    data () {
      return {
        loading: false
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
      folderList () {
        return this.$store.state.project.folderList;
      },
      innerProjectList () {
        return this.$store.state.project.innerProjectList;
      },
      containerShow () {
        return this.$store.state.project.containerShow;
      }
    },
    components: {
      singleFolder,
      singleProject,
      projectData,
      failMsg,
      loadAll,
      loading
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
</style>
