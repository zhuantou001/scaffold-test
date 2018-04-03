<template id="templateLandingPage">
  <!DOCTYPE html>
  <html>
  <head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <title>{{pageTitle}}</title>
  </head>

  <body :style='{backgroundImage:"url("+bgImg+")",backgroundColor:bgColor}' class='modalBody'>
      <backToTop></backToTop>
      <section class="apply">
        <div :is="item.component" :index="item.index" v-for="item in getComponentsItems"></div>
      </section>
  </body>

  </html>
</template>

<script>
import getTopImg from '../get/topImg';
import getSwitch from '../get/switch';
import getSwitchSlide from '../get/switchSlide';
import getSwitchImage from '../get/switchImage';
import getPageButton from '../get/pageButton';
import getPageWords from '../get/pageWords';
import getPageWordsUrl from '../get/pageWordsUrl';
import getDetailImg from '../get/detailImg';
import getApplyDownload from '../get/applyDownload.vue';
import getPageShare from '../get/setShare.vue';
import getFloatWindow from '../get/floatWindow';
import getFixedButton from '../get/fixedButton';
import { Config } from '../../common/api';
import backToTop from '../../common/backToTop.vue';

export default {
  data() {
    return {
      showBg: false
    };
  },
  mounted () {
  },
  methods: {

  },
  watch: {
  },
  computed: {
    topImgShow() {
      return this.$store.state.topImg.topImgShow;
    },
    detailImgShow() {
      return this.$store.state.detailImg.detailImgShow;
    },
    pageTitle() {
      return this.$store.state.topImg.listTitle;
    },
    getComponentsItems() {
      // alert(JSON.stringify(this.$store.state.app.getComponentsItems));
      return this.$store.state.app.getComponentsItems;
    },
    bgRadio () {
      return this.$store.state.background.pageBg.bgRadio;
    },
    bgColor () {
      if (this.bgRadio === 1) {
        return this.$store.state.background.pageBg.bgColor;
      } else {
        return '#ffffff';
      }
    },
    bgImg () {
      if  (this.bgRadio === 2) {
        if (this.$store.state.background.pageBg.bgImg) {
          let image_url = this.$store.state.background.pageBg.bgImg.replace(/\\/g, '\\\\');
          if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
            return Config.image_url + image_url;
          } else {
            return Config.img_prev_url + image_url;
          }
        }
      } else {
        return '';
      }
    }
  },
  components: {
    getTopImg,
    getSwitch,
    getSwitchSlide,
    getSwitchImage,
    getPageButton,
    getPageWords,
    getPageWordsUrl,
    getDetailImg,
    getApplyDownload,
    backToTop,
    getPageShare,
    getFloatWindow,
    getFixedButton
  }
};
</script>

<style lang="scss" scoped>
$blue: #4ca9d4;
$bg: #ececec;
$font: #666;
html{
  transform:translate(0,0);
  &::-webkit-scrollbar{
     width:0.1px;
   }
  }
body {
  background-repeat: repeat;
  max-width: 1280px;
  font-family: "Adobe Heiti Std", Helvetica, Arial, sans-serif;
  position: relative;
  color: $font;
  overflow-x: hidden;
  min-height: 100%;
  &.grey {
    background-color: $bg;
  }
}

.image-show {
  display: block;
}

.image-hide {
  display: none;
}

.apply {
  text-align: center;
  overflow: hidden;
  .tips {
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }
  .go-detail {
    line-height: 33px;
    overflow: hidden;
    position: relative;
    .range-tips {
      display: block;
      font-size: 12px;
      color: #a1a1a1;
      transform-origin: 0 50%;
      transform: scale(0.66);
      position: absolute;
      a {
        margin-left: 5px;
        color: #a1a1a1;
      }
    }
    .detail {
      float: right;
      display: inline-block;
      line-height: 33px;
      color: #a1a1a1;
      font-size: 12px;
      text-decoration: underline;
    }
  }
}
</style>
