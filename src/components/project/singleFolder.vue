<template>
  <div class="folder-box" @click="loadProject(id)">
    <div class="folder-box-con">
      <img src="../../assets/folder.png"/>
    </div>
    <div class="folder-box-title">{{name}}</div>
  </div>
</template>


<script>
  import failMsg from '../common/common';
  import loadProject from './projectCommon';
  export default {
    name: 'singleFolder',
    data () {
      return {
      };
    },
    props: ['id', 'name'],
    methods: {
    },
    computed: {
    },
    components: {
      failMsg,
      loadProject
    }
  };
</script>

<style lang="scss" scoped>
  .folder-box{
    width:180px;
    cursor:pointer;
    .folder-box-con{
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
        width:72px;
        height:72px;
      }
      &:hover{
        border:1px solid #37d6ff;
       }
    }
    .folder-box-title{
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
