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
    <getTopImage></getTopImage>
  </section>
  <section class="apply">
     <div :is="item.component" v-for="item in getComponentsItems"></div>
      <!--<p class="go-detail">-->
          <!--<span class="range-tips">*点击查看<a href="http://wk.75510010.com/KCard/page/my_tequan/tq_tengxun_desc.html">"腾讯应用专属流量范围"</a>”</span>-->
          <!--<a  class="detail" href="#go-fee">查看资费详情</a>-->
      <!--</p>-->
      <!--<getPageButton></getPageButton>-->
      <!--<div class="btn-box">-->
          <!--<a id="apply" href="javascript:;" class="btn" v-bind:style="{background: buttonStyle.buttonColor}">{{buttonFont}}</a>-->
      <!--</div>-->
      <!--<p class="activity-tips">本次活动由中国联通主办，活动名额有限，敬请谅解。</p>-->
  </section>
  <section class="charges-info mt-10">
    <getDetailImage></getDetailImage>
  </section>
  </body>
  </html>
</template>

<script>
  import getTopImage from '../get/topImage';
  import getSwitch from '../get/switch';
  import getPageButton from '../get/pageButton';
  import getDetailImage from '../get/detailImage';
  import './index.scss';
  export default {
    name: 'templateLandingPage',
    data () {
      return {
      };
    },
    methods: {
    },
    computed: {
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
      getDetailImage
    }
  };
</script>
