<template>
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加同意协议模块
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>协议标题</label></el-col>
      <el-col :span="18"><el-input v-model="protocol_font" placeholder="请输入按钮文字"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>协议颜色</label></el-col>
      <el-col :span="18"><el-input style="width:20%;" type="color" v-model="protocol_color"></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  import deleteComponent from '../../common/common';
  export default {
    data () {
      return {
      };
    },
    props: ['index'],
    mounted () {
    },
    watch: {
    },
    methods: {
      protocol () {
        let arr = this.$store.state.fill.protocol;
        arr.splice(0, 1, this.obj);
        this.$store.commit('newProtocol', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      }
    },
    computed: {
      obj () {
        var a = {};
        a.protocolColor = this.$store.state.fill.protocol[0].protocolColor;
        a.protocolFont = this.$store.state.fill.protocol[0].protocolFont;
        return a;
      },
      protocol_font: {
        get () {
          return this.$store.state.fill.protocol[0].protocolFont;
        },
        set (msg) {
          this.obj.protocolFont = msg;
          this.protocol();
        }
      },
      protocol_color: {
        get () {
          return this.$store.state.fill.protocol[0].protocolColor;
        },
        set (msg) {
          this.obj.protocolColor = msg;
          this.protocol();
        }
      },
      setFillComponentsItems () {
        return this.$store.state.fill.setFillComponentsItems;
      },
      getFillComponentsItems () {
        return this.$store.state.fill.getFillComponentsItems;
      }
    },
    component: {
      deleteComponent
    }
  };
</script>

<style lang="scss" scoped>

</style>
