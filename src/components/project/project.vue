<template>
  <div id="project">
    <div class="side"><sideMenu></sideMenu></div>
    <div class="content">
      <projectTitle></projectTitle>
      <projectContainer></projectContainer>
    </div>
  </div>
</template>

<script>
  import sideMenu from './sideMenu';
  import projectTitle from './projectTitle';
  import projectContainer from './projectContainer';
  export default {
    name: 'project',
    data () {
      return {
        msg: '您已经进入项目管理页面'
      };
    },
    methods: {
    },
    components: {
      sideMenu,
      projectTitle,
      projectContainer
    }
  };
</script>

<style lang="scss" scoped>
  #project{
    display: flex;
    .side{
      flex: 1 1 auto;
      width:1%;
     }
    .content{
      flex: 5 1 auto;
      width:1%;
    }
  }

</style>
