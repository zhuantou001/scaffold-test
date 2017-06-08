<template id="templateLandingPage">
  <!DOCTYPE html>
  <html>
  <head lang="en">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
      <meta name="format-detection" content="telephone=no"/>
      <title>{{pageTitle}}</title>
  </head>
  <body class="grey">
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
  import './index.scss';
  export default {
    name: 'templateLandingPage',
    data () {
      return {
      };
    },
    methods: {

    },
    watch: {
    },
    computed: {
      topImgShow () {
        return this.$store.state.topImgShow;
      },
      detailImgShow () {
        return this.$store.state.detailImgShow;
      },
      pageTitle () {
        return this.$store.state.page_title;
      },
      getComponentsItems () {
        return this.$store.state.getComponentsItems;
      }
    },
    components: {
      getTopImage,
      getSwitch,
      getPageButton,
      getPageWords,
      getPageWordsUrl,
      getDetailImage
    }
  };
</script>

<style lang="scss" scoped>
  .image-show{
     display:block;
   }
  .image-hide{
     display:none;
   }

</style>
