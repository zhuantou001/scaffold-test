<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 选择手机号模块
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>模块标题显示</label></el-col>
      <el-radio-group v-model="moduleTitleShow" :span="18">
        <el-radio :label="1">显示</el-radio>
        <el-radio :label="2">不显示</el-radio>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>号码预占接口</label></el-col>
      <el-radio-group v-model="occupyFlag" :span="18">
        <el-radio :label="1">调用</el-radio>
        <el-radio :label="2">不调用</el-radio>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>号码备选框</label></el-col>
      <el-radio-group v-model="optFlag" :span="18">
        <el-radio :label="1">显示</el-radio>
        <el-radio :label="2">不显示</el-radio>
      </el-radio-group>
    </el-row>
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
        this.$store.commit('newChooseTel', this.obj);
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
        a.moduleTitle = this.$store.state.fill.chooseTel.moduleTitle;
        a.moduleTitleShow = this.$store.state.fill.chooseTel.moduleTitleShow;
        a.occupyFlag = this.$store.state.fill.chooseTel.occupyFlag;
        a.optFlag = this.$store.state.fill.chooseTel.optFlag;
        a.moduleDesc = this.$store.state.fill.chooseTel.moduleDesc;
        return a;
      },
      moduleTitle: {
        get () {
          return this.$store.state.fill.chooseTel.moduleTitle;
        },
        set (msg) {
          this.obj.moduleTitle = msg;
          this.$store.commit('newChooseTel', this.obj);
        }
      },
      moduleTitleShow: {
        get () {
          return this.$store.state.fill.chooseTel.moduleTitleShow;
        },
        set (msg) {
          this.obj.moduleTitleShow = msg;
          this.$store.commit('newChooseTel', this.obj);
        }
      },
      occupyFlag: {
        get () {
          return this.$store.state.fill.chooseTel.occupyFlag;
        },
        set (msg) {
          this.obj.occupyFlag = msg;
          this.$store.commit('newChooseTel', this.obj);
        }
      },
      optFlag: {
        get () {
          return this.$store.state.fill.chooseTel.optFlag;
        },
        set (msg) {
          this.obj.optFlag = msg;
          this.$store.commit('newChooseTel', this.obj);
        }
      },
      moduleDesc: {
        get () {
          return this.$store.state.fill.chooseTel.moduleDesc;
        },
        set (msg) {
          this.obj.moduleDesc = msg;
          this.$store.commit('newChooseTel', this.obj);
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
