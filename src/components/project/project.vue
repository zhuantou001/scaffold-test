<template>
  <div id="project">
    <div class="side"><sideMenu></sideMenu></div>
    <div class="content">
      <projectTitle></projectTitle>
      <div class="container">
        <projectContainer></projectContainer>
      </div>
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
      flex: 1 auto;
     }
    .content{
      flex: 6 auto;
      .container{
        height: calc(100% - 50px);
        background:#f5f7f9;
      }
    }
  }

</style>
