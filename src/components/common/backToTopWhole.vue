<template>
  <div class="page-component-up">
    <i class="el-icon-edit"></i>

    <i class="el-icon-caret-up"></i>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
    }
  };
</script>
<style lang="scss" scoped>
  .page-component-up{
    background-color: #fff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    i {
      color: #409eff;
      display: block;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
    }
  }
</style>
