<template id="pageTitle">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 设置页面参数(必填)
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
    </h3>
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
        <label>初始化接口</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="init_url" placeholder="请输入初始化接口"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>提交接口</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="submit_url" placeholder="请输入提交接口"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>提交字段</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="submit_field" placeholder="请输入提交接口"></el-input>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isSpread: true
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
    // 展开收起
    spread () {
      if (this.isSpread) {
        this.isSpread = false;
      } else {
        this.isSpread = true;
      }
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
      a.initUrl = this.$store.state.fill.pageNature[0].initUrl;
      a.submitUrl = this.$store.state.fill.pageNature[0].submitUrl;
      a.submitField = this.$store.state.fill.pageNature[0].submitField;
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
    init_url: {
      get () {
        return this.$store.state.fill.pageNature[0].initUrl;
      },
      set (msg) {
        this.obj.initUrl = msg;
        this.pageNature();
      }
    },
    submit_url: {
      get () {
        return this.$store.state.fill.pageNature[0].submitUrl;
      },
      set (msg) {
        this.obj.submitUrl = msg;
        this.pageNature();
      }
    },
    submit_field: {
      get () {
        return this.$store.state.fill.pageNature[0].submitField;
      },
      set (msg) {
        this.obj.submitField = msg;
        this.pageNature();
      }
    }
  },
  components: {
  }
};
</script>

<style lang="scss" scoped>

</style>
