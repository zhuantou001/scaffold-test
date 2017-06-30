<template>
    <div class="container">
      <div class="container-inner">
        <singleFolder v-for="item in folderList" :key="item.id" :id="item.id" :name="item.name"></singleFolder>
        <singleProject v-for="item in projectList" :key="item.id" :id="item.id" :name="item.name"></singleProject>
      </div>
    </div>
</template>


<script>
  import singleFolder from './singleFolder';
  import singleProject from './singleProject';
  import projectData from '../../mock/project';
  import failMsg from '../common/common';
  import loadAll from './projectCommon';
  export default {
    name: 'projectContainer',
    data () {
      return {
      };
    },
    mounted () {
      this.loadAll(111);
      this.$nextTick(function () {
      });
    },
    methods: {
    },
    computed: {
      projectList () {
        return this.$store.state.project.projectList;
      },
      folderList () {
        return this.$store.state.project.folderList;
      }
    },
    components: {
      singleFolder,
      singleProject,
      projectData,
      failMsg,
      loadAll
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
</style>
