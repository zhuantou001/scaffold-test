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
      <img :src="topImageUrl" alt="king" onerror="" title="请上传头图" >
  </section>
  <section class="apply">
      <div class="switch-area">
          <ul class="switch cf">
              <li class="left checked" data-type="0"><a href="javascript:;"><span>{{pageSwitchtitle01}}</span></a></li>
              <li class="right" data-type="1"><a href="javascript:;"><span>{{pageSwitchtitle02}}</span></a></li>
          </ul>
          <div class="charge-desc">
              <p id="fee0" class="fee">{{pageSwitchContent01}}</p>
              <p id="fee1" class="fee fee-small" hidden>{{pageSwitchContent02}}</p>
          </div>
      </div>
      <p class="go-detail">
          <span class="range-tips">*点击查看<a href="http://wk.75510010.com/KCard/page/my_tequan/tq_tengxun_desc.html">"腾讯应用专属流量范围"</a>”</span>
          <a  class="detail" href="#go-fee">查看资费详情</a>
      </p>
      <div class="btn-box">
          <a id="apply" href="javascript:;" class="btn">限时限量，立即申请</a>
      </div>
      <p class="activity-tips">本次活动由中国联通主办，活动名额有限，敬请谅解。</p>
  </section>
  <section class="charges-info mt-10">
    <li v-for="item in detailImgFileList">
      <img :src="item.url">
    </li>
  </section>
  </body>
  </html>
</template>

<script>
  import './index.scss';
  export default {
    name: 'templateLandingPage',
    data () {
      return {
      };
    },
    methods: {
      nofind: function (url) {
        let img = event.srcElement;
        img.src = url;
        img.onerror = null;
      }
    },
    computed: {
      pageTitle () {
        return this.$store.state.page_title;
      },
      topImageUrl () {
        return this.$store.state.topImageUrl;
      },
      pageSwitchtitle01 () {
        return this.$store.state.switch_title01;
      },
      pageSwitchtitle02 () {
        return this.$store.state.switch_title02;
      },
      pageSwitchContent01 () {
        return this.$store.state.switch_content01;
      },
      pageSwitchContent02 () {
        return this.$store.state.switch_content02;
      },
      detailImgFileList () {
        return this.$store.state.detailImgFileList;
      }
    }
  };
</script>
