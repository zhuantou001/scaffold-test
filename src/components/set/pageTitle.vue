<template id="pageTitle">
  <div class="assembly">
    <h3><i class="el-icon-edit"></i> 添加标题</h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>标题</label></el-col>
      <el-col :span="18"><el-input v-model="page_title" placeholder="请输入内容"></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'pageTitle',
    data () {
      return {
        page_title: ''
      };
    },
    watch: {
      page_title: function () {
        this.$store.commit('newPageTitle', this.page_title);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
