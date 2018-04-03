<template>
  <div class="assembly" style="overflow: visible;">
    <h3>
      <i class="el-icon-setting"></i> 选择需要的组件<span>(绿色可多次添加, 蓝色只能添加一次)</span>
      <!-- <div class="sortDiv">
        <slot name="sortButton"></slot>
      </div> -->
    </h3>
    <!--<el-button style="background-color: #40c9b3;border-color:#40c9b3;" type="primary" @click="addComponents('setListTitle','getListTitle','many')" icon="setting">添加列表标题</el-button>-->
    <el-badge :value="setDescribeNum" style="right:8px;">
      <el-button style="background-color: #40c9b3;border-color:#40c9b3;" type="primary" @click="addComponents('setDescribe','getDescribe','many')" icon="setting">描述</el-button>
    </el-badge>
    <el-button type="primary" id="info1" @click="addComponents('setPersonInfo','getPersonInfo','info1')" icon="setting">个人信息</el-button>
    <el-button type="primary" id="chooseTel1" @click="addComponents('setChooseTel','getChooseTel','chooseTel1')" icon="setting">选择手机号</el-button>
    <!--<el-button type="primary" id="firstMonth1" @click="addComponents('setFirstMonth','getFirstMonth','firstMonth1')" icon="setting">首月资费</el-button>-->
    <el-button type="primary" id="deliveryAddress1" @click="addComponents('setDeliveryAddress','getDeliveryAddress','deliveryAddress1')" icon="setting">收货地址</el-button>
    <el-button type="primary" id="kingBroad1" @click="addComponents('setKingBroad','getKingBroad','kingBroad1')" icon="setting">王卡宽带通用</el-button>
    <el-button type="primary" id="protocol1" @click="addComponents('setProtocol','getProtocol','protocol1')" icon="setting">协议</el-button>
    <el-button type="primary" id="button1" @click="addComponents('setButton','getButton','button1')" icon="setting">按钮</el-button>
  </div>
</template>

<script>
  import randomId from '../common/common';
  export default {
    data () {
      return {
      };
    },
    methods: {
      // index传值many, 可以多次添加, 传一个其他字符串, 只能添加一次
      addComponents: function (setcomponent, getcomponent, index) {
        if (index === 'many') {
          index = this.randomId();
        }
        /* 添加到设置页面 */
        if (setcomponent) {
          if (this.setFillComponentsItems.length) {
            let i;
            for (i in this.setFillComponentsItems) {
              // alert(index + '   ' + this.setComponentsItems[i].index);
              if (index === this.setFillComponentsItems[i].index) {
                return false;
              }
            }
            this.setFillComponentsItems.push({
              component: setcomponent,
              index: index
            });
          } else {
            this.setFillComponentsItems.push({
              component: setcomponent,
              index: index
            });
          }
          let dom = document.getElementById(index);
          if (dom) {
            dom.classList.add('is-disabled');
          }
          // 描述数量
          this.setDescribeNum = this.arrayInNum(this.setFillComponentsItems, 'setDescribe');
          console.log(JSON.stringify(this.setFillComponentsItems));
//          this.setDescribeNum = this.$store.state.fill.describes.length;
//          console.log(JSON.stringify(this.$store.state.fill.describes) + this.setDescribeNum);
        }
        /* 添加到预览模板页面 */
        if (getcomponent) {
          if (this.getFillComponentsItems.length) {
            let i;
            for (i in this.getFillComponentsItems) {
              if (index === this.getFillComponentsItems[i].index) {
                return false;
              }
            }
            this.getFillComponentsItems.push({
              component: getcomponent,
              index: index
            });
          } else {
            this.getFillComponentsItems.push({
              component: getcomponent,
              index: index
            });
          }
//           console.log(JSON.stringify(this.getFillComponentsItems));
        }
      }
    },
    components: {
      randomId
    },
    watch: {
    },
    computed: {
      setFillComponentsItems: {
        get () {
          return this.$store.state.fill.setFillComponentsItems;
        },
        set (value) {
          this.$store.commit('newSetFillComponentsItems', value);
        }
      },
      getFillComponentsItems: {
        get () {
          return this.$store.state.fill.getFillComponentsItems;
        },
        set (value) {
          this.$store.commit('newGetFillComponentsItems', value);
        }
      },
      setDescribeNum: {
        get () {
          return this.$store.state.fill.setDescribeNum;
        },
        set (value) {
          this.$store.commit('newSetDescribeNum', value);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  h3{
    position: relative;
  }
  h3>span{
    font-size: 16px;
    font-weight: normal;
    color:#0b97c4;
  }
  button{
    padding:10px;
  }
  .el-button+.el-button{
    margin:0 0 10px 0;
  }
  .sort-button{
    position:absolute;
    right:10px;
    bottom:-23px;
    &:focus{
       color: #1f2d3d;
       border: 1px solid #c4c4c4;
    }
    &:hover{
       color: #1f2d3d;
       border: 1px solid #c4c4c4;
    }
  }
  .sortDiv{
    position:absolute;
    width:54px;
    height:50px;
    right:-20px;
    top:-45px;
    background: url(../../assets/greeting.png) no-repeat;
    background-size: cover;
  }
  .is-fixed {
    top: 0;
    right: 15px !important;
  }
</style>
