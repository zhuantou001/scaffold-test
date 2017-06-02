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
    <img src="./images/king_map_top_01.jpg" alt="king">
    <img src="./images/king_map_top_02.jpg" alt="king">
</section>
<section class="apply">
    <div class="switch-area">
        <ul class="switch cf">
            <li class="left checked" data-type="0"><a href="javascript:;"><span>{{pageSwitchtitle01}}</span></a></li>
            <li class="right" data-type="1"><a href="javascript:;"><span>{{pageSwitchtitle02}}</span></a></li>
        </ul>
        <div class="charge-desc">
            <p id="fee0" class="fee">月费仅<span class="point">19</span>元，腾讯应用<span class="point1">专属全国流量免费</span></p>
            <p id="fee1" class="fee fee-small" hidden>月费仅<span class="point">59</span>元，腾讯应用<span class="point1">专属全国流量免费</span></p>
            <p id="fee-tips" class="tips">（非腾讯专属流量：省内1元500MB，省外2元500MB）</p>
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
    <img usemap="#planetmap" id="planet" src="./images/king_map_single_desc_01.jpg" alt="desc_01">
    <map name="planetmap" id="planetmap">
        <area shape="rect" coords="" href ="http://wk.75510010.com/KCard/page/my_tequan/tq_tengxun_desc.html" alt="desc_01" />
    </map>
    <img src="./images/king_map_single_desc_02.jpg" alt="desc_02">
    <img src="./images/king_map_single_desc_03.jpg" alt="desc_03">
    <img id="go-fee" src="./images/king_map_single_desc_04.jpg" alt="desc_04">
    <img src="./images/king_map_single_desc_05.jpg" alt="desc_05">
    <img src="./images/king_map_single_desc_06.jpg" alt="desc_06">
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
    },
    computed: {
      pageTitle () {
        return this.$store.state.page_title;
      },
      pageSwitchtitle01 () {
        return this.$store.state.switch_title01;
      },
      pageSwitchtitle02 () {
        return this.$store.state.switch_title02;
      }
    }
  };
</script>
