<template>
  <div>
    <div class="list-title"><p>个人信息</p></div>
    <ul class="fill-list line35">
      <li :class="{error:errorItem === 'certName'}">
        <div class="p-title">姓名</div>
        <div class="p-content">
          <span v-if="radioPerInfo === 2" id="certName" class="user-message"></span>
          <input v-else v-model.trim='certName' type="text" title="姓名" placeholder="请输入姓名"/>
        </div>
      </li>
      <li :class="{error:errorItem === 'tel'}">
        <div class="p-title">联系电话</div>
        <div class="p-content">
          <span v-if="radioPerInfo === 2" id="tel" class="user-message"></span>
          <input v-else v-model.trim='tel' type="tel" title="联系电话" placeholder="请输入联系电话" maxlength="11"/>
        </div>
      </li>
      <li :class="{error:errorItem === 'certNo'}">
        <div class="p-title">身份证号</div>
        <div class="p-content">
          <span v-if="radioPerInfo === 2" id="certNo" class="user-message"></span>
          <input v-else v-model.trim='certNo' type="text" title="身份证号" placeholder="请输入身份证号"/>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
  import '../../common/directive';
  import validate from '../../common/validate';
  export default {
    data () {
      return {
        certName: '',
        tel: '',
        certNo: ''
      };
    },
    props: ['index'],
    methods: {
    },
    watch: {
      certName: function (val) {
        this.validate(val, 'certName');
      },
      tel: function (val) {
        this.validate(val, 'tel');
      },
      certNo: function (val) {
        this.validate(val, 'certNo');
      }
    },
    computed: {
      radioPerInfo () {
        return this.$store.state.fill.personInfo[0].radioPerInfo;
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
      validate
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
  input, .text-area {
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
  .user-message{
    height: 40px;
    line-height: 40px;
  }
  i {
    position: absolute;
    display: none;
    font-style: normal;
    padding-right: 16px;
    border: 1PX solid #ff5b52;
    color:#ff5b52;
    height: 39px;
    top: 0;
    left: -15px;
    width: 100%;
    z-index: 10;
    text-align: right;
  }
  .rightI{
    position: absolute;
    width:12px;
    height:12px;
    right: 110px;
    top:14px;
    /*background: url("images/agree.png") no-repeat;*/
    background-size:12px 12px;
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
  #location{
  .grey{
    color: #a4a9b0;
  }
  }
  #delivery{
  .grey{
    color: #a4a9b0;
  }
  }
  #delivery-error{
    font-size: 11px;
    color: #ff1414;
    white-space: nowrap;
    transform-origin: left;
    transform:scale(0.83);
  }
  #apply-phone {
  .p-title {
    width: 90px;
  }
  }
  #apply-yzm{
  .p-content{
  .s-line{
    position: absolute;
    display: inline-block;
    height: 24px;
    width: 0;
    border-left: 1px solid #dadada;
    top: 8px;
    right:101px;
    z-index: 1;
  }
  .yzm{
    position: absolute;
    width:85px ;
    display:inline-block;
    line-height:20px;
    padding: 10px 0;
    text-align: center;
    color: $theme;
    font-size:13px;
    top: 0;
    right:15px;
    z-index: 10;
  i{
    display: inline;
  }
  }
  .grey{
    color: #dadada;
  }
  }
  }
  }
</style>
