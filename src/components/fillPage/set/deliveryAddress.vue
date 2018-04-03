<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 收货地址模块
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>模块标题显示</label></el-col>
      <el-radio-group v-model="moduleTitleShow">
        <el-radio :label="1">显示</el-radio>
        <el-radio :label="2">不显示</el-radio>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>输入模块标题</label></el-col>
      <el-col :span="18"><el-input v-model="moduleTitle" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>输入列表标题</label></el-col>
      <el-col :span="18"><el-input v-model="listTitle" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>输入模块描述</label></el-col>
      <el-col :span="18"><textEditor @textEditorContent="getTextEditorDesc" :aa="moduleDesc"></textEditor></el-col>
    </el-row>
  </div>
</template>

<script>
  import deleteComponent from '../../common/common';
  import textEditor from '../../common/textEditor';
  export default {
    data () {
      return {
        isSpread: true
      };
    },
    props: ['index'],
    mounted () {
    },
    watch: {
    },
    methods: {
      getTextEditorDesc (msg) {
        this.obj.moduleDesc = msg;
        this.$store.commit('newDeliveryAddress', this.obj);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      },
      // 展开收起
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      }
    },
    computed: {
      obj () {
        var a = {};
        a.moduleTitle = this.$store.state.fill.deliveryAddress.moduleTitle;
        a.moduleDesc = this.$store.state.fill.deliveryAddress.moduleDesc;
        a.moduleTitleShow = this.$store.state.fill.deliveryAddress.moduleTitleShow;
        a.listTitle = this.$store.state.fill.deliveryAddress.listTitle;
        return a;
      },
      moduleTitle: {
        get () {
          return this.$store.state.fill.deliveryAddress.moduleTitle;
        },
        set (msg) {
          this.obj.moduleTitle = msg;
          this.$store.commit('newDeliveryAddress', this.obj);
        }
      },
      moduleDesc: {
        get () {
          return this.$store.state.fill.deliveryAddress.moduleDesc;
        },
        set (msg) {
          this.obj.moduleDesc = msg;
          this.$store.commit('newDeliveryAddress', this.obj);
        }
      },
      moduleTitleShow: {
        get () {
          return this.$store.state.fill.deliveryAddress.moduleTitleShow;
        },
        set (msg) {
          this.obj.moduleTitleShow = msg;
          this.$store.commit('newDeliveryAddress', this.obj);
        }
      },
      listTitle: {
        get () {
          return this.$store.state.fill.deliveryAddress.listTitle;
        },
        set (msg) {
          this.obj.listTitle = msg;
          this.$store.commit('newDeliveryAddress', this.obj);
        }
      },
      setFillComponentsItems () {
        return this.$store.state.fill.setFillComponentsItems;
      },
      getFillComponentsItems () {
        return this.$store.state.fill.getFillComponentsItems;
      }
    },
    components: {
      deleteComponent,
      textEditor
    }
  };
</script>

<style lang="scss" scoped>

</style>
