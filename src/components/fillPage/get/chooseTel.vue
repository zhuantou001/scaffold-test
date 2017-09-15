<template>
  <div>
    <div class="list-title no-border-top">
      <p>选择手机号</p>
    </div>
    <ul class="fill-list">
      <li id="location" @click="openChooseCity" :class="{error:errorItem === 'chooseTelAdd'}">
        <div class="p-title">号码归属地</div>
         <div :class="[{ grey: isActive }, pContent, pSelect]">{{resultCon}}</div>
      </li>
      <li id="number" :class="{error:errorItem === 'chooseTel'}">
        <div class="p-title">选择手机号</div>
        <div class="p-content p-select" @click='chooseTel'></div>
      </li>
    </ul>
    <p class="numberTips">您已选择靓号，协议期为入网当月及后续的
      <i>12</i>个月。</p>
    <chooseCity :showBox="showBox" @close="showBox=false" @chooseResult="result"></chooseCity>
    <getChooseNum :showNumBox="showNumBox" @close="showNumBox=false"></getChooseNum>
  </div>
</template>


<script>
import chooseCity from '../common/chooseArea';
import getChooseNum from '../common/chooseNum';
export default {
  data() {
    return {
      isActive: true,
      showBox: false,
      resultCon: '请选择号码归属地',
      pContent: 'p-content',
      pSelect: 'p-select',
      showNumBox: false
    };
  },
  props: ['index'],
  methods: {
    openChooseCity() {
      this.showBox = true;
      this.hideError('chooseTelAdd');
    },
    result() {
      this.resultCon = this.curProvinceName + ' ' + this.curCityName;
      this.isActive = false;
    },
    chooseTel() {
      this.showNumBox = true;
    }
  },

  computed: {
    curProvinceCode() {
      return this.$store.state.fill.chooseArea[0].curProvinceCode;
    },
    curProvinceName() {
      return this.$store.state.fill.chooseArea[0].curProvinceName;
    },
    curCityCode() {
      return this.$store.state.fill.chooseArea[0].curCityCode;
    },
    curCityName() {
      return this.$store.state.fill.chooseArea[0].curCityName;
    },
    errorItem () {
      if (this.$store.state.fill.isError.length > 0) {
        return this.$store.state.fill.isError[0].errorItem;
      } else {
        return '';
      }
    }
  },
  components: {
    getChooseNum,
    chooseCity
  }

};
</script>

<style lang="scss" scoped>
$error: #ff3021;
$theme: #40c9b3;
.list-title {
  font-size: 12px;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  background: #f7f7f7;
  color: #888;
  border-top: 2PX solid #f1f1f1;
  border-bottom: 2PX solid #f1f1f1;
  p {
    transform: scale(0.917);
    transform-origin: left;
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
  padding-left: 15px;
  line-height: 40px;
  background-color: #fff;
  font-size: 13px;
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
        left: -15px;
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
      width: 80px;
      float: left;
    }
    .p-content {
      padding-left: 90px;
      padding-right: 15px;
      position: relative;
      height: 40px;
      input {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 20px;
        padding: 10px 0;
        border: 0;
        outline: none;
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
        padding-left: 10px;
        &::after {
          content: '';
          display: block;
          position: absolute;
          right: 15px;
          top: 15px;
          width: 10px;
          height: 10px;
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
        font-size: 13px;
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
  color: $theme;
  display: none;
  font-size: 10px;
  line-height: 20px;
  transform: scale(1);
  transform-origin: left;
  white-space: nowrap;
  padding-left: 17.6px;
  margin-bottom: 8px;
  i {
    font-style: normal;
  }
}
</style>
