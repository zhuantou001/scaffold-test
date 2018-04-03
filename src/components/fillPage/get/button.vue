<template>
  <div class="section">
    <div class="btn-box">
      <a id="submit" @click="submit" plain="false" href="javascript:;" :style="{borderRadius: buttonRadius,background: buttonColor}" :class="!disable ? 'btn disable':'btn'">{{buttonFont}}</a>
    </div>
    <fetchBox></fetchBox>
    <successBox :showMsgBox="showMsgBox" @close="close"></successBox>
    <div class="submit-loading" v-show="submitLoad"><loadingIcon></loadingIcon>正在加载，请稍后... ...</div>
    <div class="mask" v-show="submitLoad"></div>
  </div>
</template>


<script>
import fetchBox from "../common/fetchBox";
import successBox from "../common/successBox";
import loadingIcon from "../../tabImg/loadingIcon";

export default {
  data() {
    return {
      // disable: this.disable
    };
  },
  props: ["index"],
  mounted() {},
  methods: {
    submit() {
      if (!this.disable) {
        return;
      }
      // 先验证
      const data = this.submitBeforeCheck();
      // 弹是否自提框
      if (data) {
        // 拉取自提数据
        if (this.isLogistics === 1) {
          this.selfFetch();
        } else if (this.isLogistics === 2) {
          // 提交数据
          this.submitFillButton();
        }
      }
    },
    close(data) { // scaffold 工程此功能关闭弹框即可
      this.$store.commit("newShowMsgBox", false);
      // 解除禁止页面滚动
      this.$store.commit("newIsScroll", false);
    }
  },
  watch: {},
  computed: {
    buttonFont() {
      return this.$store.state.fill.button[0].buttonFont;
    },
    buttonRadius() {
      return this.$store.state.fill.button[0].buttonRadius / 16 + 'rem';
    },
    buttonColor() {
      return this.$store.state.fill.button[0].buttonColor;
    },
    showMsgBox() {
      return this.$store.state.fill.showMsgBox;
    },
    disable() {
      return this.$store.state.fill.isCheck;
    },
    isJump () {
      return this.$store.state.fill.succContent.isJump;
    },
    submitLoad() {
      return this.$store.state.fillInfo.submitLoad;
    },
    isLogistics() {
      return this.$store.state.fill.succContent.isLogistics;
    },
    submitLoad() {
      return this.$store.state.fillInfo.submitLoad;
    }
  },
  components: {
    fetchBox,
    successBox,
    loadingIcon
  }
};
</script>

<style lang="scss" scoped>
$error: #ff3021;
$theme: #40c9b3;
.disable {
  color: #c6c6c6 !important;
  background: #c6c6c6 !important;
}
.section {
  padding: 0 12px 7px;
  .btn-box {
    .btn {
      display: block;
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-size: 0.9375rem;
      text-align: center;
      text-decoration: none;
      -webkit-border-radius: 0.1875rem;
      -moz-border-radius: 0.1875rem;
      border-radius: 0.1875rem;
      color: #fff;

      &:link {
        color: #fff !important;
      }
      &:visited {
        color: #fff !important;
      }
      &:hover {
        color: #fff !important;
      }
      &:active {
        /*background-color: $theme!important;*/
        color: #fff !important;
      }
    }
    .disable {
      background-color: #c6c6c6;
      color: #c6c6c6;
      &:link {
        color: #fff !important;
      }
      &:visited {
        color: #fff !important;
      }
      &:hover {
        color: #fff !important;
      }
      &:active {
        color: #fff !important;
        background-color: #c6c6c6 !important;
      }
    }
  }
  .submit-loading {
    background-size: 50px 50px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    padding: 50px 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1003;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
