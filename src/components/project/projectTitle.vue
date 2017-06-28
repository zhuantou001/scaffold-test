<template>
  <div>
    <div class="projectTitle">
      <span>我的作品(2个)</span>
      <div class="userInfo"><userInfo></userInfo></div>
    </div>
  </div>
</template>


<script>
  import userInfo from '../login/userInfo';
  export default {
    name: 'projectTitle',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
    },
    components: {
      userInfo
    }
  };
</script>

<style lang="scss" scoped>
  .projectTitle{
    position: relative;
    background: #fff;
    height:50px;
    padding:0 20px;
    &>span{
      line-height: 50px;
      font-size: 18px;
      color:#888;
    }
    .userInfo{
      position: absolute;
      top:8px;
      right:10px;
    }
  }
</style>
