<template id="detailImg">
  <div>
    <div class="replace-img" :class="{'show':isShow,'hide':!isShow}"><span>请上传详情图</span></div>
    <li v-for="(item, index) in absoluteDetailImgUrls">
      <img :src="item.image_url" :id="'image' + index">
    </li>
  </div>
</template>


<script>
  import {Config} from '../../common/api';
  export default {
    name: 'detailImg',
    data () {
      return {
      };
    },
    watch: {
    },
    methods: {
    },
    computed: {
      detailImgFileList () {
        return this.$store.state.detailImg.detailImgFileList;
      },
      absoluteDetailImgUrls () {
        let arr = [];
        for (let i = 0; i < this.detailImgFileList.length; i++) {
          let obj = {};
          obj.image_url = Config.image_url + this.detailImgFileList[i].image_url;
          arr.push(obj);
        }
        return arr;
      },
      isShow () { // 监控detailImgFileList变化控制replace-img显示
        if (this.detailImgFileList.length > 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .charges-info {
    font-size: 0;
    img {
      width: 100%;
      display: block;
      vertical-align: bottom;
    }
    .map-container {
      position: relative;
      .map-point {
        position: absolute;
      }
    }
  }
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
