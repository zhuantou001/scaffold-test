<template>
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加按钮模块
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮文字</label></el-col>
      <el-col :span="18"><el-input v-model="button_font" placeholder="请输入按钮文字"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮颜色</label></el-col>
      <el-col :span="18"><el-input style="width:20%;" type="color" v-model="button_color"></el-input></el-col>
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
      button () {
        let arr = this.$store.state.fill.button;
        arr.splice(0, 1, this.obj);
        this.$store.commit('newButton', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      }
    },
    computed: {
      obj () {
        var a = {};
        a.buttonColor = this.$store.state.fill.button[0].buttonColor;
        a.buttonFont = this.$store.state.fill.button[0].buttonFont;
        return a;
      },
      button_font: {
        get () {
          return this.$store.state.fill.button[0].buttonFont;
        },
        set (msg) {
          this.obj.buttonFont = msg;
          this.button();
        }
      },
      button_color: {
        get () {
          return this.$store.state.fill.button[0].buttonColor;
        },
        set (msg) {
          this.obj.buttonColor = msg;
          this.button();
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
