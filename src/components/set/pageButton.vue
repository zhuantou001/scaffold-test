<template id="pageButton">
  <div class="assembly">
    <h3><i class="el-icon-edit"></i> 添加按钮</h3>
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
  export default {
    name: 'pageButton',
    data () {
      return {
        button_font: '',
        button_color: '#4ca9d4',
        button_object: {buttonFont: '按钮文字', buttonColor: '#4ca9d4'}
      };
    },
    watch: {
      button_font: function () {
        this.button_object.buttonFont = this.button_font;
        this.$store.commit('newPagebuttonObject', this.button_object);
      },
      button_color: function () {
        this.button_object.buttonColor = this.button_color;
        this.$store.commit('newPagebuttonObject', this.button_object);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
