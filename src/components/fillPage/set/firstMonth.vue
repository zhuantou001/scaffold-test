<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 添加首月资费模块
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>输入模块标题</label></el-col>
      <el-col :span="18"><el-input v-model="moduleTitle" placeholder="请输入内容"></el-input></el-col>
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
        this.$store.commit('newFirstMonth', this.obj);
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
        a.moduleTitle = this.$store.state.fill.firstMonth.moduleTitle;
        a.moduleDesc = this.$store.state.fill.firstMonth.moduleDesc;
        return a;
      },
      moduleTitle: {
        get () {
          return this.$store.state.fill.firstMonth.moduleTitle;
        },
        set (msg) {
          this.obj.moduleTitle = msg;
          this.$store.commit('newFirstMonth', this.obj);
        }
      },
      moduleDesc: {
        get () {
          return this.$store.state.fill.firstMonth.moduleDesc;
        },
        set (msg) {
          this.obj.moduleDesc = msg;
          this.$store.commit('newFirstMonth', this.obj);
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
