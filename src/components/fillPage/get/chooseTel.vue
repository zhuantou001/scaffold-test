<template>
  <div>
    <div class="list-title" v-show="showTitle"><p>{{moduleTitle}}<span class="list-desc" v-html="moduleDesc"></span></p></div>
    <!--<div class="list-title no-border-top">-->
      <!--<p>选择手机号</p>-->
    <!--</div>-->
    <ul class="fill-list">
      <li id="location" @click="openChooseCity" :class="{error:errorItem === 'chooseTelAdd'}">
        <div class="p-title">号码归属</div>
         <div :class="[{ grey: isActive }, pContent, pSelect]">{{resultCon}}</div>
      </li>
      <li id="number" @click='chooseTel' :class="{error:errorItem === 'chooseTel'}">
        <div class="p-title">选择号码</div>
        <div class="p-content p-select">{{showNumResult.number}}</div>
        <p class="numberTips" :style="{color:majorColor}" v-show="showNumResult.numberTipsFlag">您已选择靓号，协议期为入网当月及后续的<i>{{showNumResult.month}}</i>个月。</p>
      </li>
    </ul>
    <chooseCity :showBox="showBox" @close="closeBox" @chooseResult="result"></chooseCity>
    <chooseNum ref="cl" :showNumBox="showNumBox" @close="closeBox" @chooseNumResult="numResult"></chooseNum>
  </div>
</template>


<script>
import chooseCity from '../common/chooseArea';
import chooseNum from '../common/chooseNum';
export default {
  data() {
    return {
      isActive: true,
      showBox: false,
      resultCon: '请选择号码归属地',
      pContent: 'p-content',
      pSelect: 'p-select',
      showNumBox: false,
      showNumResult: {}
    };
  },
  props: ['index'],
  watch: {
    resultCon () {
      this.clearNumResult();
    }
  },
  methods: {
    openChooseCity() {
      this.showBox = true;
      this.hideError('chooseTelAdd');
      // 禁止页面滚动
      this.$store.commit('newIsScroll', true);
      // 页面回到顶部
      document.getElementById('fillPage').scrollTo(0,0);
    },
    result() {
      this.resultCon = this.curChooseArea[0].curProvinceName + ' ' + this.curChooseArea[0].curCityName;
      this.isActive = false;
      // 当号码归属地改变时, 清空收货地址选择
      let chooseArea = [{
        "curProvinceCode": '',
        "curProvinceName": '',
        "curCityCode": '',
        "curCityName": '',
        "curDistrictCode": '',
        "curDistrictName": '',
      }];
      this.$store.commit('newChooseDisArea', chooseArea);
      // 存入提交的数据
      this.$store.commit('newEssProvince', this.curChooseArea[0].curProvinceCode);
      this.$store.commit('newEssCity', this.curChooseArea[0].curCityCode);
    },
    chooseTel () {
      if (this.$store.state.fillInfoSubmit.essCity) {
        this.showNumBox = true;
        this.$refs.cl.setNumber();
        this.hideError('chooseTel');
        // 禁止页面滚动
        this.$store.commit('newIsScroll', true);
        // 页面回到顶部
        document.getElementById('fillPage').scrollTo(0,0);
      } else {
        this.showError('chooseTelAdd', '请先选择号码归属地');
      }
    },
    numResult (msg) {
      this.showNumResult.number = msg.number;
      this.showNumResult.month = msg.month;
      this.showNumResult.numberTipsFlag = msg.numberTipsFlag;
      // 存入提交的数据
      this.$store.commit('newNumber', msg.number);
    },
    clearNumResult () {
      this.showNumResult = {};
      this.$store.commit('newNumber', '');
    },
    closeBox () {
      this.showBox = false;
      this.showNumBox = false;
      // 解除禁止页面滚动
      this.$store.commit('newIsScroll', false);
    }
  },
  computed: {
    moduleTitle () {
      return this.$store.state.fill.chooseTel.moduleTitle;
    },
    moduleDesc () {
      return this.$store.state.fill.chooseTel.moduleDesc;
    },
    moduleTitleShow () {
      return this.$store.state.fill.chooseTel.moduleTitleShow;
    },
    showTitle () {
      if (this.moduleTitleShow === 1) {
        return true;
      } else if (this.moduleTitleShow === 2) {
        return false;
      }
    },
    curChooseArea () {
      return this.$store.state.fill.chooseArea;
    },
    errorItem () {
      if (this.$store.state.fill.isError.length > 0) {
        return this.$store.state.fill.isError[0].errorItem;
      } else {
        return '';
      }
    },
    majorColor () {
      return this.$store.state.fill.pageNature[0].majorColor;
    }
  },
  components: {
    chooseNum,
    chooseCity
  }

};
</script>

<style>
  .list-desc>p{display: inline-block;}
</style>
<style lang="scss" scoped>
$error: #ff3021;
$theme: #40c9b3;
.list-title {
  font-weight: bold;
  color: #6e6e6e;
  font-size: .75rem;
  line-height: 2.5rem;
  height: 2.5rem;
  padding: 0 1.125rem;
  margin: 0;
  border-bottom: 1px solid #f1f1f1;
  border-top: 1px solid #f1f1f1;
  p {
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    width:100%;
    span {
      color: #bababa;
      i {
        font-style: normal;
        color: #ff5252;
      }
    }
  }
}

.fill-list {
  padding-left: 1.125rem;
  line-height: 2.5rem;
  background-color: #fff;
  font-size: .875rem;
  li {
    border-bottom: 1PX solid #f8f8f8;
    position: relative;
    &:last-child {
      border-bottom: 0;
    }
    &.error {
      .p-content {
        input,
        .text-area {
          position: relative;
          z-index: 10;
          background-color: transparent;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
         left: -1.125rem;
        right: 0;
        height: 100%;
        border: 1PX solid $error;
        z-index: 1;
        box-sizing: border-box;
      }
    }
    &.delivery .p-content {
      height: auto;
    }
    .p-title {
      width: 3.75rem;
      float: left;
    }
    .p-content {
      padding-left: 5.625rem;
      padding-right: 1.125rem;
      position: relative;
      height: 2.5rem;
      input {
        display: block;
        width: 100%;
        height: 2.5rem;
        font-size: .875rem;
        line-height: 1.25rem;
        padding: .625rem 0;
        border: 0;
        outline: none;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      .user-message {
        height: 40px;
        line-height: 40px;
      }
      i {
        position: absolute;
        display: none;
        font-style: normal;
        padding-right: 16px;
        border: 1PX solid #ff5b52;
        color: #ff5b52;
        height: 39px;
        top: 0;
        left: -15px;
        width: 100%;
        z-index: 10;
        text-align: right;
      }
      .rightI {
        position: absolute;
        width: 12px;
        height: 12px;
        right: 110px;
        top: 14px;
        /*background: url("images/agree.png") no-repeat;*/
        background-size: 12px 12px;
      }
      &.p-select {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 20px;
        padding-left: 35px;
        &::after {
          content: '';
          display: block;
          position: absolute;
           right: .9375rem;
           top: .9375rem;
           width: .625rem;
           height: .625rem;
          border-top: 1PX solid #b4b4b4;
          border-right: 1PX solid #b4b4b4;
          transform: rotate(45deg);
        }
      }
      &.p-text-area {
        padding: 10px 20px 10px 0;
        line-height: 20px;
        min-height: 20px;
        position: relative;
      }
    }
    .p-content-error i {
      display: block;
    }
  }
  #location {
    .grey {
      color: #a4a9b0;
    }
  }
  #delivery {
    .grey {
      color: #a4a9b0;
    }
  }
  #delivery-error {
    font-size: 11px;
    color: #ff1414;
    white-space: nowrap;
    transform-origin: left;
    transform: scale(0.83);
  }
  #apply-phone {
    .p-title {
      width: 90px;
    }
  }
  #apply-yzm {
    .p-content {
      .s-line {
        position: absolute;
        display: inline-block;
        height: 24px;
        width: 0;
        border-left: 1px solid #dadada;
        top: 8px;
        right: 101px;
        z-index: 1;
      }
      .yzm {
        position: absolute;
        width: 85px;
        display: inline-block;
        line-height: 20px;
        padding: 10px 0;
        text-align: center;
        color: $theme;
        font-size: 14px;
        top: 0;
        right: 15px;
        z-index: 10;
        i {
          display: inline;
        }
      }
      .grey {
        color: #dadada;
      }
    }
  }
}

.numberTips {
  color: #e7161a;
  font-size: 0.625rem;
  line-height: 1.25rem;
  white-space: nowrap;
  i {
    font-style: normal;
  }
}
</style>
