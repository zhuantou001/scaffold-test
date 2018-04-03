<template>
  <div>
    <div class="list-title"><p>{{moduleTitle}}<span class="list-desc" v-html="moduleDesc"></span></p></div>
    <ul class="fill-list">
      <li id="firstMonth" :class="{error:errorItem === 'firstMonth'}" @click='openFirstBox'>
        <div class="p-title">首月资费</div>
        <div class="p-content p-select">{{firstContent}}</div>
      </li>
    </ul>
    <firstMonthBox :showFirstBox="showFirstBox" @close="showFirstBox=false"></firstMonthBox>
  </div>
</template>


<script>
  import firstMonthBox from '../common/firstMonthBox';
  export default {
    data () {
      return {
        showFirstBox: false
      };
    },
    props: ['index'],
    methods: {
      openFirstBox () {
        this.showFirstBox = true;
      }
    },
    computed: {
      moduleTitle () {
        return this.$store.state.fill.firstMonth.moduleTitle;
      },
      moduleDesc () {
        return this.$store.state.fill.firstMonth.moduleDesc;
      },
      firstContent () {
        if (this.$store.state.fillInfo.firstMonthChooseData.length > 0) {
          return this.$store.state.fillInfo.firstMonthChooseData[0].context;
        } else {
          return '';
        }
      },
      radioPerInfo () {
        return this.$store.state.fill.personInfo[0].radioPerInfo;
      },
      perName () {
        return this.$store.state.fill.personInfo[0].perName;
      },
      perCode () {
        return this.$store.state.fill.personInfo[0].perCode;
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
      firstMonthBox
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
     padding-left: 10px;
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
