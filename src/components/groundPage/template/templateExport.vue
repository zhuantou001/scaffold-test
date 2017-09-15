<template id="templateLandingPage">
  <span>
    <html  :style='{backgroundImage:"url("+getPageBg+")",backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundPosition: "center center",backgroundColor:getPageColor}'>

    <head lang="en">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
      <meta name="format-detection" content="telephone=no" />
      <title>{{pageTitle}}</title>
    </head>

    <body>
      <div></div>
      <div class="shade" v-show="shadeShow"></div>
      <section class='backToTop'>
        <backToTop></backToTop>
      </section>
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
    <loading :show="loading"></loading>
  </span>
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
import backToTop from '../../common/backToTop.vue';
import { Config, ROUTES } from '../../common/api';
import obtainData from '../../common/common';
import loading from '../../loading/Loading';
export default {
  name: 'templateLandingPage',
  data() {
    return {
      loading: false,
      shadeShow: true
    };
  },
  mounted() {
    // alert(this.$route.params.name);
    if (this.$route.params.name) {
      const url = Config.api_url + ROUTES.queryPageAliasData + '?page_alias=' + this.$route.params.name;
      this.loading = true;
      this.$ajax({
        method: 'get',
        url: url
      }).then((res) => {
        if (res.data) {
          // console.log(res.data);
          // alert(JSON.stringify(res.data));
          this.obtainData(res.data);
          this.shadeShow = false;
        } else {
          this.failMsg('暂时无数据');
        }
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.failMsg('服务器错误');
        this.loading = false;
      });
    }
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
      return this.$store.state.topImg.pageTitle;
    },
    getComponentsItems() {
      return this.$store.state.app.getComponentsItems;
    },
    getRadioSwitch() {
      if (this.$store.state.background.radioSwitchBg) {
        return this.$store.state.background.radioSwitchBg;
      }
    },
    getPageColor() {
      return this.$store.state.background.page_color || '';
    },
    getPageBg() {
      if (this.$store.state.background.bgImgUrl) {
        let image_url = this.$store.state.background.bgImgUrl.replace(/\\/g, '\\\\')
        return Config.image_url + image_url;
      } else {
        return '';
      }
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
    obtainData,
    loading,
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

html.page_color {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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

.shade {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20000;
  background: #fff;
  overflow: hidden;
}
</style>
