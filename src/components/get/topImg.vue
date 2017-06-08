<template id="topImg">
  <div>
    <div class="replace-img" v-bind:class="{'show':isShow,'hide':!isShow}"><span>请上传头图</span></div>
    <img :src="topImgUrl" alt="king" onerror="" title="请上传头图" >
  </div>
</template>


<script>
  export default {
    name: 'topImg',
    data () {
      return {
        isShow: true
      };
    },
    watch: {
      topImgUrl () { // 监控topImgUrl变化控制replace-img显示
        if (this.topImgUrl) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      }
    },
    methods: {

    },
    computed: {
      topImgUrl () {
        return this.$store.state.topImgUrl;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .replace-img{
    border:3px solid #4ca9d4;
    text-align:center;
    padding:10px;
    span{
      border:1px dashed #4ca9d4;
      display: inline-block;
      width:100%;
      text-align:center;
      font-size: 30px;
      line-height: 120px;
      color:#4ca9d4;
    }
    &.show{
      display:block;
    }
    &.hide{
      display:none;
    }
  }
</style>
