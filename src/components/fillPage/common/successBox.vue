
<template>
  <span>
    <section v-show="showMsgBox" id="success-popup" class="popup number">
      <div class='content' v-if='showSuccess'>
          <div class="customIcon">
            <img class="customIconImg" v-show="imgUrl" :src="absoluteImgUrl" >
            <!--<successIcon :v_id="testId3" :v_color="testColor3"></successIcon>-->
          </div>
          <h2 class="p-title" :style="{color: majorColor}" v-html="succContent.title">123</h2>
          <p class="time" v-show="isTimer==='2'" v-html='timerHtml'></p>
          <div class="point-list" v-show="isFetch" v-html='hasContent'></div>
          <div class="point-list" v-show="!isFetch" v-html='noContent'></div>
          <div v-show="isPopButton" class="btn-box">
              <a class="popup-close1 btn" href="JavaScript:;" data-type="3" :style="{borderRadius: popButtonRadius,backgroundColor: majorColor}" @click="$emit('close', '3')">{{succContent.popButton}}</a>
          </div>
      </div>
      <div class='content' v-else>
        <div class="customIcon">
          <sorryIcon :v_id="testId1" :v_color="testColor1"></sorryIcon>
        </div>
        <div class="point-list" v-html="showFailBoxContent"></div>
			</div>
			<a class="popup-close" href="JavaScript:;" @click="$emit('close', '3')" data-type="3"></a>
    </section>
    <div class="mask" v-show="showMsgBox" @click="$emit('close')"></div>

    <!--<snailIcon :v_id="testId" :v_color="testColor"></snailIcon>-->
    <!--<sorryIcon :v_id="testId1" :v_color="testColor1"></sorryIcon>-->
    <!--<timeOutIcon :v_id="testId2" :v_color="testColor2"></timeOutIcon>-->
    <!--<successIcon :v_id="testId3" :v_color="testColor3"></successIcon>-->
  </span>
</template>

<script>
import snailIcon from "../../tabImg/snailIcon";
import sorryIcon from "../../tabImg/sorryIcon";
import timeOutIcon from "../../tabImg/timeOutIcon";
import successIcon from "../../tabImg/successIcon";
import {Config, ROUTES} from '../../common/api';
export default {
  name: "modal",
  data() {
    return {
      testId: "snailId",
      testId1: "sorryId",
      testId2: "timeOutId",
      testId3: "successId",
      timerHtml: '',
      hasContent1: '',
      noContent1: ''
    };
  },
  props: ["showMsgBox"],
  mounted () {
  },
  watch: {
    showSuccess () {
      if (this.showSuccess) {
        this.setNumber();
        if (this.isTimer === '2') {
          this.setTimer();
        }
      }
    },
    isTimer () {
      this.setTimer();
    },
    num () {
      this.setNumber();
    }
  },
  methods: {
    setTimer () {
      let second = 10;
      const toHomepage = setInterval(() => {
//        second -= 1; // 配置页面静止不变
        if (second > 1) {
          this.timerHtml = `${second}s后自动返回`;
          // $('.time').html(`${second}s后自动返回`);
        } else {
          this.$store.commit('newShowMsgBox', false);
          // 清空vuex提交数据和错误提示
          this.hideErrorOther();
          this.resetFillSubmitVuex();
          clearInterval(toHomepage);
        }
      }, 1000);
    },
    setNumber () {
      if (this.hasContent.indexOf('number')) {
        if (this.num) {
          this.hasContent1 = this.hasContent.replace('number',this.num);
        } else {
          this.hasContent1 = this.hasContent.replace('number','15000000000');
        }
      } else {
        this.hasContent = this.hasContent;
      }
      if (this.noContent.indexOf('number')) {
        if (this.num) {
          this.noContent1 = this.noContent.replace('number',this.num);
        } else {
          this.noContent1 = this.noContent.replace('number','15000000000');
        }
      } else {
        this.noContent1 = this.noContent;
      }
    }
  },
  computed: {
    showFailBoxContent () {
      return this.$store.state.fill.showFailBoxContent;
    },
    isFetch () {
      return this.$store.state.fill.isFetch;
    },
    isTimer () {
      return this.$store.state.fill.succContent.isTimer;
    },
    showSuccess () {
      return this.$store.state.fill.showSuccess;
    },
    showFail () {
      return this.$store.state.fill.showFail;
    },
    optionName () {
      return this.$store.state.options.selectedProductName;
    },
    majorColor () {
      return this.$store.state.fill.pageNature[0].majorColor;
    },
    testColor () {
      let obj = {};
      obj.colorA = this.majorColor;
      return obj;
    },
    testColor1 () {
      let obj = {};
      obj.colorA = this.majorColor;
      return obj;
    },
    testColor2 () {
      let obj = {};
      obj.colorA = this.majorColor;
      return obj;
    },
    testColor3 () {
      let obj = {};
      obj.colorA = this.majorColor;
      return obj;
    },
    succContent () {
      return this.$store.state.fill.succContent;
    },
    hasContent () {
      return this.$store.state.fill.succContent.hasContent;
    },
    noContent () {
      return this.$store.state.fill.succContent.noContent;
    },
    popButtonRadius () {
      return this.$store.state.fill.succContent.popButtonRadius / 16 + 'rem';
    },
    isPopButton () {
      if (this.$store.state.fill.succContent.isPopButton == '1') {
          return false;
      } else  if (this.$store.state.fill.succContent.isPopButton == '2') {
        return true;
      }
    },
    imgUrl () {
      return this.$store.state.fill.succContent.image;
    },
    absoluteImgUrl () {
      let image_url = '';
      if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
        image_url = Config.image_url + this.imgUrl;
      } else {
        image_url = Config.img_prev_url + this.imgUrl;
      }
      return image_url;
    },
    isJump () {
      return this.$store.state.fill.succContent.isJump;
    },
    jumpUrl () {
      return this.$store.state.fill.succContent.jumpUrl;
    }
  },
  components: {
    snailIcon,
    sorryIcon,
    timeOutIcon,
    successIcon
  }
};
</script>

<style lang="scss" scoped>
$theme: #f39801;
.mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.7);
}

.popup-icon {
  display: block;
  margin: 0 auto;
  padding-top: 25px;
  height: 60px;
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
  .content {
    background-color: #fff;
    padding: 5px 0 20px 0;
    border-radius: 5px;
    position: relative;
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

.point-list {
  padding: 0 25px;
  margin-top: 15px;
  line-height: 22px;
  p {
    color: #787878;
    font-size: 14px;
    line-height: 20px;
    padding-left: 15px;
    margin-top: -10px;
    margin-bottom: 10px;
    background-size: 12px;
    span {
      color: $theme;
    }
    i,em {
      font-style: normal;
    }
  }
}
.btn-box {
    margin-top: 15px;
    padding: 0 12px 10px 12px;
    .btn {
      display: block;
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 15px;
      color: #FFF;
      text-align: center;
      text-decoration: none;
      border-radius: 3px;
      &:link{
        color: #FFF!important;
      }
      &:visited{
        color: #FFF!important;
      }
      &:hover{
        color: #FFF!important;
      }
      &:active {
        color: #FFF!important;
      }
    }
  }

.p-title {
  color: #7a97c3;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
}
.time{
    text-align: center;
    font-size: 17px;
    color: #219eff;
  }
.customIcon {
  text-align: center;
  canvas {
    width: 60px;
    padding-top: 25px;
  }
}
.customIconImg {
    width: 60px;
    padding-top: 25px;
}
</style>
