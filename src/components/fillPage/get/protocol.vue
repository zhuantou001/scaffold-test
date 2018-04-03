<template>
  <div class="pro_section">
    <div class="protocol agree" id="protocol">
      <el-checkbox v-model="checked">
        <span style="font-size: 0.7rem;">
          我已阅读并同意
          <a href="javascript:;" @click="openProtocol" :style="{color: protocolColor}" id="go-protocol">{{protocolFont}}</a>
        </span>
      </el-checkbox>
    </div>
    <protocolBox :showProtocolBox="showProtocolBox" :isProtocolUrl="isProtocolUrl" :activityType="activityType" @close="closeBox"></protocolBox>
  </div>
</template>


<script>
  import protocolBox from "../common/protocolBox";
  export default {
    data() {
      return {
        checked: true
      };
    },
    props: ["index"],
    mounted() {
      let checkboxInner = document.getElementsByClassName("el-checkbox__inner");
      checkboxInner[0].classList.add('el-checkbox__inner_self');
      checkboxInner[0].classList.remove('el-checkbox__inner');
      let checkboxInner_self = document.getElementsByClassName("el-checkbox__inner_self");
      checkboxInner_self[0].style.backgroundColor = this.protocolColor;
      checkboxInner_self[0].style.borderColor = this.protocolColor;
      checkboxInner_self[0].style.borderColor = this.protocolColor;
    },
    methods: {
      openProtocol() {
        // 先验证
        const data = this.submitBeforeCheck();
        if (data) {
          document.body.scrollTop = 0;
          // 拉取自提数据
          this.$store.commit("newShowProtocolBox", true);
          // 禁止页面滚动
          this.$store.commit("newIsScroll", true);
          // 页面回到顶部
          document.getElementById("fillPage").scrollTo(0, 0);
        }
      },
      closeBox() {
        this.$store.commit("newShowProtocolBox", false);
        // 解除禁止页面滚动
        this.$store.commit("newIsScroll", false);
      },
      checkedFun () {
        let checkboxInner = document.getElementsByClassName("el-checkbox__inner_self");
        if (this.checked) {
          checkboxInner[0].style.backgroundColor = this.protocolColor;
          checkboxInner[0].style.borderColor = this.protocolColor;
        } else {
          checkboxInner[0].style.backgroundColor = "#fff";
          checkboxInner[0].style.borderColor = "#bfcbd9";
        }
        this.$store.commit("newIsCheck", this.checked);
      },
    },
    watch: {
      checked () {
        this.checkedFun();
      },
      protocolColor: function() {
        let checkboxInner = document.getElementsByClassName("el-checkbox__inner_self");
        checkboxInner[0].style.backgroundColor = this.protocolColor;
        checkboxInner[0].style.borderColor = this.protocolColor;
      }
    },
    computed: {
      protocolFont() {
        return this.$store.state.fill.protocol[0].protocolFont;
      },
      protocolColor() {
        return this.$store.state.fill.protocol[0].protocolColor;
      },
      isProtocolUrl() {
        return this.$store.state.fill.protocol[0].isProtocolUrl;
      },
      activityType() {
        return this.$store.state.fill.protocol[0].activityType;
      },
      showProtocolBox() {
        return this.$store.state.fill.showProtocolBox;
      }
    },
    components: {
      protocolBox
    }
  };
</script>

<style>
  .el-checkbox__inner_self {
    display: inline-block;
    position: relative;
    border: 1px solid;
    border-radius: 50%;
    box-sizing: border-box;
    width: 1rem;
    height: 1rem;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
  }
  .el-checkbox__inner_self::after {
    box-sizing: content-box;
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 0.5rem;
    left: 0.25rem;
    position: absolute;
    top: 0.05rem;
    -ms-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 0.25rem;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    -ms-transform-origin: center;
    transform-origin: center;
  }
  .el-checkbox__inner_self:after {
    transform: rotate(45deg) scaleY(1);
  }
</style>


<style lang="scss" scoped>
  .pro_section {
    padding: 0;
    background: none;
    margin:0;
  }
  .protocol {
    position: relative;
    margin: .5rem 0;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: .75rem;
    color: #787878;
    padding-left: 1rem;
    white-space: nowrap;
    transform-origin: left;
  a {
    display: inline-block;
    text-decoration: none;
  }
  }
</style>
