<template id="templateLandingPage">
  <!DOCTYPE html>
  <html>
  
  <head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <title>{{pageTitle}}</title>
  </head>
  
  <body style='position:relative;z-index:0;' class='modalBody'>
    <section class='bg-container'>
      <getPageBg></getPageBg>
    </section>
    <!-- <section>
      <backToTop></backToTop>
    </section> -->
    <section class="top-img">
      <getTopImage :class="{'image-show':topImgShow,'image-hide':!topImgShow}"></getTopImage>
    </section>
    <section class="apply">
      <div :is="item.component" v-for="item in getComponentsItems"></div>
    </section>
    <section class="charges-info mt-10">
      <getDetailImage :class="{'image-show':detailImgShow,'image-hide':!detailImgShow}"></getDetailImage>
    </section>
  </body>
  
  </html>
</template>

<script>
import getTopImage from '../get/topImg';
import getSwitch from '../get/switch';
import getPageButton from '../get/pageButton';
import getPageWords from '../get/pageWords';
import getPageWordsUrl from '../get/pageWordsUrl';
import getDetailImage from '../get/detailImg';
import getApplyDownload from '../get/applyDownload.vue';
import getPageBg from '../get/pageBg.vue';
import { Config } from '../../common/api';
import backToTop from '../../common/backToTop.vue';

export default {
  name: 'templateLandingPage',
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {
     
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
      return this.$store.state.app.getComponentsItems;
    }
  },
  components: {
    getTopImage,
    getSwitch,
    getPageButton,
    getPageWords,
    getPageWordsUrl,
    getDetailImage,
    getApplyDownload,
    getPageBg,
    backToTop
  }
};
</script>

<style lang="scss" scoped>
$blue: #4ca9d4;
$bg: #ececec;
$font: #666;
body {
  max-width: 640px;
  font-family: "Adobe Heiti Std", Helvetica, Arial, sans-serif;
  position: relative;
  color: $font;
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
  padding: 0 20px;
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

// .back {
//     // opacity: 0;
//     position: fixed;
//     width: 35px;
//     height: 65px;
//     bottom: 46px;
//     left: 56%;
//     background: url('../../../assets/backTop.png') no-repeat;
//     transition: .5s opacity linear;
//     z-index: 9999;
// }

// .back:hover {
//     background: url('../../../assets/backTop.png') no-repeat 0 -65px;
// }
// .show {
//     opacity: 1;
// }
</style>
