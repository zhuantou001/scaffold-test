<template>
  <div class="project-box">
    <div class="project-box-con">
      <img src="../template/images/king_map_top.png"/>
    </div>
    <div class="project-box-title">{{name}}</div>
  </div>
</template>


<script>
  export default {
    name: 'singleProject',
    data () {
      return {
      };
    },
    props: ['id', 'name'],
    methods: {
    },
    computed: {
    }
  };
</script>

<style lang="scss" scoped>
  .project-box{
    width:180px;
    cursor:pointer;
  .project-box-con{
    width:180px;
    height:180px;
    background: #fff;
    border:1px solid #eee;
    display: flex;
    justify-content:center;
    align-items:center;
    border-radius:6px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.06);
  img{
    max-width:100%;
    max-height:100%;
  }
  &:hover{
     border:1px solid #37d6ff;
   }
  }
  .project-box-title{
    width:100%;
    margin-top:10px;
    line-height: 40px;
    text-align: center;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  }
</style>
