<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 添加个人信息模块
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>输入框设置</label></el-col>
      <el-radio-group v-model="radioPerInfo">
        <el-radio :label="1">用户自己编辑</el-radio>
        <el-radio :label="2">系统录入, 用户不可编辑</el-radio>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>模块标题显示</label></el-col>
      <el-radio-group v-model="moduleTitleShow">
        <el-radio :label="1">显示</el-radio>
        <el-radio :label="2">不显示</el-radio>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>是否显示身份证列表</label></el-col>
      <el-radio-group v-model="isCardLi">
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
        this.$store.commit('newPersonInfo', this.obj);
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
        a.radioPerInfo = this.$store.state.fill.personInfo.radioPerInfo;
        a.moduleTitle = this.$store.state.fill.personInfo.moduleTitle;
        a.moduleTitleShow = this.$store.state.fill.personInfo.moduleTitleShow;
        a.moduleDesc = this.$store.state.fill.personInfo.moduleDesc;
        a.isCardLi = this.$store.state.fill.personInfo.isCardLi;
        return a;
      },
      radioPerInfo: {
        get () {
          return this.$store.state.fill.personInfo.radioPerInfo;
        },
        set (msg) {
          this.obj.radioPerInfo = msg;
          this.$store.commit('newPersonInfo', this.obj);
        }
      },
      moduleTitle: {
        get () {
          return this.$store.state.fill.personInfo.moduleTitle;
        },
        set (msg) {
          this.obj.moduleTitle = msg;
          this.$store.commit('newPersonInfo', this.obj);
        }
      },
      moduleTitleShow: {
        get () {
          return this.$store.state.fill.personInfo.moduleTitleShow;
        },
        set (msg) {
          this.obj.moduleTitleShow = msg;
          this.$store.commit('newPersonInfo', this.obj);
        }
      },
      moduleDesc: {
        get () {
          return this.$store.state.fill.personInfo.moduleDesc;
        },
        set (msg) {
          this.obj.moduleDesc = msg;
          this.$store.commit('newPersonInfo', this.obj);
        }
      },
      isCardLi: {
        get () {
          return this.$store.state.fill.personInfo.isCardLi;
        },
        set (msg) {
          this.obj.isCardLi = msg;
          this.$store.commit('newPersonInfo', this.obj);
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
