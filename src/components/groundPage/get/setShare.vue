<template id="pageButton">

</template>

<script>
import { deleteComponent } from "../../common/common";
import {Config} from '../../common/api';
export default {
  name: "getShare",
  data() {
    return {};
  },
  mounted() {
    const len = this.share_type.length;
    if (len) {
      if (len === 1) {
        if (this.share_type[0] == 0) {
          this.loadwx();
        }
        if (this.share_type[0] == 1) {
          this.loadapp();
        }
      } else if (len === 2) {
        this.loadwx();
        this.loadapp();
      }
      this.loadjs();
    }
  },
  watch: {
    share_type() {
      const len = this.share_type.length;
      if (len) {
        if (len === 1) {
          if (this.share_type[0] == 0) {
            this.loadwx();
          }
          if (this.share_type[0] == 1) {
            this.loadapp();
          }
        } else if (len === 2) {
          this.loadwx();
          this.loadapp();
        }
        this.loadjs();
      }
    }
  },
  computed: {
    // 按钮设置
    share_type() {
      return this.$store.state.share.share_type;
    },
    share_title() {
      return this.$store.state.share.share_title;
    },
    share_desc() {
      return this.$store.state.share.share_desc;
    },
    share_url() {
      return this.$store.state.share.share_url;
    }
  },
  methods: {
    loadjs() {
      const head = document.getElementsByTagName("head")[0];
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://res.wx.qq.com/open/js/jweixin-1.0.0.js";
      head.appendChild(script);
      const scriptJQ = document.createElement("script");
      scriptJQ.type = "text/javascript";
      scriptJQ.src = "https://code.jquery.com/jquery-1.11.3.js";
      head.appendChild(scriptJQ);
    },
    loadwx() {
      // const shareTitle = "懂我卡";
      const shareTitle = this.share_title;
      // const shareDesc = "懂我就免我流量，懂我卡头条专属流量免费";
      const shareDesc = this.share_desc;
      const shareLink = location.href.split("#")[0];
      const shareImgUrl = Config.img_prev_url + this.share_url;
      // const shareImgUrl = "https://m.10010.com/queen/static/images/toutiao/dongwo/images/share-img.jpg?ad40c195f6cb1972ca0ec58479dbc3b7";
      window.onload = function() {
        // alert('wx test');
        $.ajax({
          type: "get",
          url: "/KCard/wxCommon/loadJsapiConfigInfo",
          data: {
            jsapiUrl: shareLink
          },
          dataType: "json",
          success: function(data) {
            wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: [
                "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone"
              ]
            });
            wx.ready(function() {
              // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
              wx.checkJsApi({
                jsApiList: ["getNetworkType", "previewImage"],
                success: function(res) {}
              });
              // 2. 分享接口
              // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareAppMessage({
                title: shareTitle,
                desc: shareDesc,
                link: shareLink,
                imgUrl: shareImgUrl,
                fail: function(res) {}
              });
              // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareTimeline({
                title: shareTitle,
                desc: shareDesc,
                link: shareLink,
                imgUrl: shareImgUrl,
                fail: function(res) {}
              });
              // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareQQ({
                title: shareTitle,
                desc: shareDesc,
                link: shareLink,
                imgUrl: shareImgUrl,
                fail: function(res) {}
              });
            });
            wx.error(function(res) {});
          },
          error: function(data) {}
        });
      };
    },
    loadapp() {
      // const shareTitle = "流量王";
      const shareTitle = this.share_title;
      // const shareContent = "尾号带4号码每月赠1GB！两种资费任您选。";
      const shareContent = this.share_desc;
      // const shareIconURL = "https://res.mall.10010.cn/mall/res/uploader/temp/20170808110150-614739152_310_310.jpg";
      const shareIconURL = Config.img_prev_url + this.share_url;
      const shareURL = window.location.href;
      const shareConent = shareTitle + shareURL;
      function getMenuConfig_Local() {
        const shareJson = "{\"shareType\":\"url\", \"shareTitle\":\""+shareTitle+"\", \"shareContent\":\""+shareContent+"\", \"shareURL\":\""+shareURL+"\", \"shareIconURL\":\""+shareIconURL+"\"}";
        const returnMsg = "{\"config\" : [{\"code\" : \"fenxiang\", \"title\" : \"分享\", \"shareList\" : \"sinaweibo, tencentweibo, qzone, wechat, wechatmoments, email, shortmessage, qq\", \"desc\" : \"" + shareConent + "\", \"shareJson\":" + shareJson +"}]}";
        return returnMsg;
      }
    }
  },
  component: {
    deleteComponent
  }
};
</script>

<style lang="scss" scoped>

</style>
