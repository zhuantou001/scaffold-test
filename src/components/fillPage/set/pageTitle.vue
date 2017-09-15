<template id="pageTitle">
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加标题</h3>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>标题</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="page_title" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>自定义链接名</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="page_url" placeholder="例如: tencent"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>页面描述</label>
      </el-col>
      <el-col :span="18">
        <el-input type='textarea' :rows='3' v-model="page_desc" placeholder="请输入页面描述..."></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>页面主色调</label></el-col>
      <el-col :span="18"><el-input style="width:20%;" type="color" v-model="major_color"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>设置成功弹框内容</label>
        <a class='view' href='javascript:;' @click='viewAlert' style='color:#20a0ff;display: block; padding-left: 25px;'>(查看演示)</a>
      </el-col>
      <el-col :span="18">
        <textEditor @textEditorContent_succ="getTextEditorDesc" :aa="succ_describe"></textEditor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import textEditor from '../common/editor';
export default {
  name: '',
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    pageNature() {
      let arr = [];
      arr.push(this.obj);
      this.$store.commit('newPageNature', arr);
    },
    getTextEditorDesc(msg) {
      this.$store.commit('newSuccContent', msg);
    },
    viewAlert() {  // 查看演示，显示弹窗
      this.$store.commit('newSuccFlag', true);
      this.$store.commit('newShowMask', true);
    }
  },
  watch: {
  },
  computed: {
    obj() {
      var a = {};
      a.pageTitle = this.$store.state.fill.pageNature[0].pageTitle;
      a.pageUrl = this.$store.state.fill.pageNature[0].pageUrl;
      a.pageDesc = this.$store.state.fill.pageNature[0].pageDesc;
      a.majorColor = this.$store.state.fill.pageNature[0].majorColor;
      return a;
    },
    page_title: {
      get() {
        return this.$store.state.fill.pageNature[0].pageTitle;
      },
      set(value) {
        this.obj.pageTitle = value;
        this.pageNature();
      }
    },
    page_url: {
      get() {
        return this.$store.state.fill.pageNature[0].pageUrl;
      },
      set(value) {
        this.obj.pageUrl = value;
        this.pageNature();
      }
    },
    page_desc: {
      get() {
        return this.$store.state.fill.pageNature[0].pageDesc;
      },
      set(value) {
        this.obj.pageDesc = value;
        this.pageNature();
      }
    },
    major_color: {
      get () {
        return this.$store.state.fill.pageNature[0].majorColor;
      },
      set (msg) {
        this.obj.majorColor = msg;
        this.pageNature();
      }
    },
    succ_describe: {
      get() {
        return this.$store.state.fill.succContent[0].succDes;
      },
      set(msg) {
        this.$store.commit('newSuccContent', msg);
      }
    }
  },
  components: {
    textEditor
  }
};
</script>

<style lang="scss" scoped>

</style>
