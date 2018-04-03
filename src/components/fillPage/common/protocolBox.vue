
<template>
  <span>
    <section v-show="showProtocolBox" id="success-popup" class="popup number">
      <div class="content">
          <h2 class="protocol-title" v-text="proTitle"></h2>
          <div class="protocol-desc" v-html="localProtocal">
          </div>
      </div>
			<a class="popup-close" href="JavaScript:;" @click="$emit('close')" data-type="2"></a>
    </section>
    <div class="mask" v-show="showProtocolBox" @click="$emit('close')" @scroll.prevent @touchmove.prevent></div>
    <loading :show="loading"></loading>
  </span>
</template>

<script>
import loading from "../../loading/LoadingSmall";
export default {
  data() {
    return {
      loading: false,
      content: "",
      proTitle: "中国联通客户入网协议",
      localProtocal: []
    };
  },
  props: ["showProtocolBox", "isProtocolUrl", "activityType"],
  mounted() {},
  methods: {
    judgeShow() {
      if (this.isProtocolUrl == "1") {
        this.loadContent();
      } else {
        this.localProtocal = this.protocolContent;
      }
    },
    loadContent() {
      let data = {}; //提交参数准备
      const that = this;
      data.city = this.$store.state.fillInfoSubmit.essCity;
      data.province = this.$store.state.fillInfoSubmit.essProvince;
      data.custName = this.$store.state.fillInfoSubmit.certName;
      data.goodsId = this.$store.state.fillInfoSubmit.goodsId;
      data.number = this.$store.state.fillInfoSubmit.number;
      data.psptType = "02";
      data.psptTypeCode = this.$store.state.fillInfoSubmit.certId;
      data.activityType = this.activityType;
      this.loading = true;
      this.$ajax({
        method: "post",
        url: this.protocolUrl,
        data: data,
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.replace(/&$/, "");
        }],
      })
        .then(protocolData => {
          that.localProtocal = [];
          protocolData.data.forEach(function(value, key) {
            that.localProtocal.push(`${value.content}`);
          });
          that.localProtocal = that.localProtocal.join("<br>");
          that.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  },
  watch: {
    showProtocolBox() {
      if (this.showProtocolBox) {
        this.judgeShow();
      }
    }
  },
  computed: {
    protocolContent() {
      return this.$store.state.fill.protocol[0].protocolContent;
    },
    protocolUrl() {
      return this.$store.state.fill.protocol[0].protocolUrl;
    }
  },
  components: {
    loading
  }
};
</script>

<style lang="scss" scoped>
$theme: #f39801;
.mask {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1001;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.popup {
  width: 100%;
  padding: 0 12px;
  background-color: transparent;
  z-index: 1003;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // .content {
  //   background-color: #fff;
  //   padding: 20px;
  //   border-radius: 5px;
  //   position: relative;
  //   height: 300px;
  //   overflow-y: scroll;
  //   -webkit-overflow-scrolling: touch;
  //   overflow-scrolling: touch;
  // }
  .content {
    background-color: #fff;
    padding-bottom: 20px;
    border-radius: 5px;
    position: relative;
    .occupyTips {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      background: transparent;
      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        width: 210px;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
        background: #323232;
        text-align: center;
        border-radius: 4px;
      }
    }
    .p-title {
      font-size: 17px;
      color: $theme;
      text-align: center;
      margin: 0;
      font-family: PingFangSC-Regular;
    }
    .protocol-title {
      line-height: 44px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 15px;
      color: #505050;
      margin: 0;
    }
    .protocol-desc {
      font-size: 10px;
      max-height: 240px;
      overflow-y: auto;
      padding: 10px 16px 20px;
      text-indent: 2em;
      line-height: 20px;
      -webkit-overflow-scrolling: touch;
      h2 {
        text-indent: 0;
        font-size: 12px;
        text-align: center;
        margin: 0;
      }
      .no-indent {
        text-indent: 0;
      }
      .warn {
        color: red;
      }
      .rule {
        border-collapse: collapse;
        margin: 0 auto;
        th,
        td {
          border: 1px solid;
          text-align: center;
          text-indent: 0;
        }
        td:nth-child(2) {
          text-align: left;
          padding-left: 5px;
        }
      }
    }
    .protocol-desc::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0);
      border-left: 1px solid rgba(0, 0, 0, 0);
    }
    .protocol-desc::-webkit-scrollbar {
      width: 5px;
      height: 13px;
      border-radius: 5px;
    }
    .protocol-desc::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.5);
      background-clip: padding-box;
      border-radius: 5px;
      min-height: 28px;
    }
    .protocol-desc::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .point-list {
      padding: 0 10px;
      margin-top: 15px;
      font-family: PingFangSC-Regular;
      .point {
        color: #787878;
        font-size: 14px;
        line-height: 20px;
        padding-left: 15px;
        margin-bottom: 10px;
        background-size: 12px;
        span {
          color: $theme;
        }
      }
    }
    .referee {
      line-height: 35px;
      text-align: center;
      .to-referee {
        display: block;
        text-align: center;
        color: #7a97c3;
        font-size: 12px;
      }
      .referee-message {
        display: inline-block;
        width: 180px;
        line-height: 33px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 12px;
        padding: 0 10px;
      }
      .submit-referee {
        display: inline-block;
        width: 60px;
        line-height: 35px;
        border-radius: 4px;
        margin-left: 9px;
        background: #7a97c3;
        font-size: 12px;
        color: #fff;
      }
      .grey {
        background: #d3d3d3;
      }
      .referee-error {
        display: none;
        line-height: 20px;
        color: #ff3021;
        padding-left: 12px;
        text-align: left;
        font-size: 12px;
      }
      .referee-success {
        display: none;
        text-align: center;
        color: #7a97c3;
        font-size: 12px;
      }
    }
    .popup-title {
      font-size: 18px;
      text-align: center;
      line-height: 45px;
      color: $theme;
    }
    .popup-desc {
      padding: 0 12px;
      margin-bottom: 15px;
      font-size: 14px;
      color: #666;
      line-height: 20px;
      font-family: PingFangSC-Regular;
      span {
        color: $theme;
      }
    }
  }
  .popup-close {
    display: block;
    position: absolute;
    bottom: -56px;
    left: 50%;
    margin-left: -13px;
    width: 26px;
    height: 26px;
    background: url(../../../assets/closeImg.png) no-repeat;
    background-size: 26px;
  }
}
</style>
