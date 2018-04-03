<template>
    <div class="top-img" :style="{right: consultRight, top: consultTop}">
        <div class="replace-img" :class="{'show':isShow,'hide':!isShow}"><span>请上传图标</span></div>
        <li v-for="(item, index) in absoluteFloatImgUrls" style="{width: 40px; overflow: hidden;}">
            <a :href="consultHrefUrl"><img :src="item.image_url" :id="'image' + index" :style="{width: consultWidth, height: consultHeight, borderRadius: consultRadius}"></a>
        </li>
    </div>
</template>

<script>
    import '../../../../commonJs/jpeg_encoder_basic';
    import { resizeMe } from '../../../../commonJs/resizeMe';
    import {Config} from '../../common/api';
    export default {
        data() {
            return {

            }
        },
        watch: {
        },
        mounted () {
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
                    };
                };
                })(imgurl);
                // 读取文件的缓冲数组流，读取完毕后执行onload
                reader.readAsDataURL(imgurl);
            },
        },
        computed: {
            floatImgFileList () {
                return this.$store.state.floatImg.floatImgFileList;
            },
            absoluteFloatImgUrls () {
                let arr = [];
                for (let i = 0; i < this.floatImgFileList.length; i++) {
                let obj = {};
                if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
                    obj.image_url = Config.image_url + this.floatImgFileList[i].image_url;
                } else {
                    obj.image_url = Config.img_prev_url + this.floatImgFileList[i].image_url;
                }
                //obj.image_url = Config.image_url + this.floatImgFileList[i].image_url;
                arr.push(obj);
                }
                return arr;
            },
            isShow () { // 监控detailImgFileList变化控制replace-img显示
                if (this.floatImgFileList.length > 0) {
                return false;
                } else {
                return true;
                }
            },
            consultRight() {
                return this.$store.state.app.consult[0].right;
            },
            consultTop() {
                return this.$store.state.app.consult[0].top;
            },
            consultHrefUrl() {
                return this.$store.state.app.consult[0].hrefUrl;
            },
            consultWidth() {
                return this.$store.state.app.consult[0].width;
            },
            consultHeight() {
                return this.$store.state.app.consult[0].height;
            },
            consultRadius() {
                return this.$store.state.app.consult[0].radius;
            }
        }
    }
</script>

<style lang="scss" scoped>
  .top-img {
    font-size: 0;
    width: 64px;
    height: 64px;
    position: absolute;
    z-index: 2000;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
    }
  }
  .replace-img{
    border:3px solid #4ca9d4;
    text-align:center;
    padding: 10px;
    width: 38px;
    height: 38px;
    span{
      border:1px dashed #4ca9d4;
      display: inline-block;
      width:100%;
      text-align:center;
      font-size: 10px;
      line-height: 19px;
      color:#4ca9d4;
    }
  }
  .show{
     display:block;
   }
  .hide{
     display:none;
   }
   .consultWord {
       font-size: 10px;
       line-height: 20px;
       text-align: center;
       text-decoration: none;
       margin-top: -25px;
   }
</style>