<template id="detailImg">
  <div>
    <div class="replace-img" :class="{'show':isShow,'hide':!isShow}"><span>请上传详情图</span></div>
    <li v-for="item in detailImgFileList">
      <img :src="item.url">
    </li>
  </div>
</template>


<script>
  export default {
    name: 'detailImg',
    data () {
      return {
        isShow: true
      };
    },
    watch: {
      detailImgFileList () { // 监控detailImgFileList变化控制replace-img显示
        if (this.detailImgFileList.length > 0) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      }
    },
    methods: {
    },
    computed: {
      detailImgFileList () {
        return this.$store.state.detailImg.detailImgFileList;
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
