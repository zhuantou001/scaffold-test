<template>
  <div class="assembly">
    <h3><i class="el-icon-setting"></i> 选择需要的组件<span>(绿色可多次添加, 蓝色只能添加一次, 拖动可调整顺序)</span></h3>
    <el-button style="background-color: #aaa;border-color:#aaa;" type="primary" icon="setting">添加页面标题</el-button>
    <!--<el-button style="background-color: #40c9b3;border-color:#40c9b3;" type="primary" @click="addComponents('setListTitle','getListTitle','many')" icon="setting">添加列表标题</el-button>-->
    <el-button style="background-color: #40c9b3;border-color:#40c9b3;" type="primary" @click="addComponents('setDescribe','getDescribe','many')" icon="setting">添加描述</el-button>
    <el-button type="primary" @click="addComponents('setPersonInfo','getPersonInfo','info1')" icon="setting">添加个人信息</el-button>
    <el-button type="primary" @click="addComponents('setChooseTel','getChooseTel','chooseTel1')" icon="setting">添加选择手机号</el-button>
    <el-button type="primary" @click="addComponents('setFirstMonth','getFirstMonth','firstMonth1')" icon="setting">添加首月资费</el-button>
    <el-button type="primary" @click="addComponents('setDeliveryAddress','getDeliveryAddress','deliveryAddress1')" icon="setting">添加收货地址</el-button>
    <el-button type="primary" @click="addComponents('setProtocol','getProtocol','protocol1')" icon="setting">添加协议</el-button>
    <el-button type="primary" @click="addComponents('setButton','getButton','button1')" icon="setting">添加按钮</el-button>
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
          // alert(JSON.stringify(this.setFillComponentsItems));
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
          // alert(JSON.stringify(this.getFillComponentsItems));
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  h3>span{
    font-size: 16px;
    font-weight: normal;
    color:#0b97c4;
  }
  button{
    margin:10px 0;
  }
</style>
