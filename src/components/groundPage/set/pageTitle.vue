<template id="pageTitle">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 标题
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>标题</label></el-col>
      <el-col :span="18"><el-input v-model="page_title" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>自定义跳转别名</label></el-col>
      <el-col :span="18"><el-input v-model="page_url" placeholder="一个由字母、下划线、横杠、数字组成的字符串"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>页面描述</label></el-col>
      <el-col :span="18"><el-input type='textarea' :rows='3' v-model="page_desc_content" placeholder="请输入页面描述..."></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'listTitle',
    data () {
      return {
        isSpread: true
      };
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      }
    },
    computed: {
      page_title: {
        get () {
          return this.$store.state.topImg.pageTitle;
        },
        set (value) {
          this.$store.commit('newPageTitle', value);
        }
      },
      page_url: {
        get () {
          return this.$store.state.topImg.pageUrl;
        },
        set (value) {
          this.$store.commit('newPageUrl', value);
        }
      },
      page_desc_content: {
        get () {
          return this.$store.state.topImg.pageDescContent;
        },
        set (value) {
          this.$store.commit('newPageDescContent', value);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
