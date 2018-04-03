<template>
  <div class="top-img">
    <div class="replace-img" :class="{'show':isShow,'hide':!isShow}"><span>请上传头图</span></div>
    <!-- <img class="imgDetail" :class="{'show':!isShow,'hide':isShow}" :data="topImgUrl" :src="topImgUrl" alt="" onerror="" title="" > -->
    <li v-for="(item, index) in absoluteTopImgUrls">
      <img :src="item.image_url" :id="'top_image' + index">
    </li>
  </div>
</template>


<script>
  import '../../../../commonJs/jpeg_encoder_basic';
  import { resizeMe } from '../../../../commonJs/resizeMe';
  import {Config} from '../../common/api';
  export default {
    data () {
      return {
      };
    },
    watch: {
    },
    methods: {
      tallMe: function (imgurl) {
        const reader = new FileReader();
        reader.onload = (function (f) {
          return function (e) {
            const preview = document.getElementsByClassName('imgDetail')[0];
            // 创建Image对象
            const image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              const resized = resizeMe(image);
              // 预览图片
              preview.src = resized;
              // let str = resized.substring(22);
              // const equalIndex = str.indexOf('=');
              // if (str.indexOf('=') > 0) {
              //   str = str.substring(0, equalIndex);
              // }
              // const strLength = str.length;
              // const fileLength = parseInt(strLength - (strLength / 8) * 2);
              // console.log(fileLength);
            };
          };
        })(imgurl);
        // 读取文件的缓冲数组流，读取完毕后执行onload
        reader.readAsDataURL(imgurl);
      }
    },
    computed: {
      // topImgUrl () {
      //   const that = this;
      //   if (this.$store.state.topImg.topImgFileList.size > 0) {
      //     that.tallMe(that.$store.state.topImg.topImgFileList);
      //   }
      //   if (that.$store.state.topImg.topImgFileList) {
      //     if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
      //       return Config.image_url + that.$store.state.topImg.topImgFileList;
      //     } else {
      //       return Config.img_prev_url + that.$store.state.topImg.topImgFileList;
      //     }
      //   } else {
      //     return '';
      //   }
      // },
      topImgFileList () {
        return this.$store.state.topImg.topImgFileList;
      },
      absoluteTopImgUrls () {
        let arr = [];
        for (let i = 0; i < this.topImgFileList.length; i++) {
          let obj = {};
          if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
            obj.image_url = Config.image_url + this.topImgFileList[i].image_url;
          } else {
            obj.image_url = Config.img_prev_url + this.topImgFileList[i].image_url;
          }
          arr.push(obj);
        }
        return arr;
      },
      isShow () {
        if (this.$store.state.topImg.topImgFileList.length) {
          return false;
        } else {
          return true;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .top-img {
    font-size: 0;
    img {
      width: 100%;
      display: block;
      vertical-align: bottom;
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
  }
  .show{
     display:block;
   }
  .hide{
     display:none;
   }
</style>
