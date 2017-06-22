<template id="topImg">
  <div>
    <div class="replace-img" :class="{'show':isShow,'hide':!isShow}"><span>请上传头图</span></div>
    <img class="imgDetail" :data="topImgUrl" alt="king" onerror="" title="请上传头图" >
  </div>
</template>


<script>
  import '../../../commonJs/jpeg_encoder_basic';
  import { resizeMe } from '../../../commonJs/resizeMe';
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
      topImgUrl () {
        const that = this;
        if (this.$store.state.topImg.topImgUrl.size > 0) {
          that.tallMe(that.$store.state.topImg.topImgUrl);
        }
        return that.$store.state.topImg.topImgUrl;
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
