<template id="addButton">
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
    name: 'addButton',
    data () {
      return {
        button_font: '',
        button_color: '#4ca9d4'
      };
    },
    watch: {
      button_font: function () {
        this.$store.commit('newAddbuttonFont', this.button_font);
      },
      button_color: function () {
        let buttonStyle = {
          buttonColor: this.button_color
        };
        // alert(JSON.stringify(buttonStyle));
        this.$store.commit('newAddbuttonColor', buttonStyle);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
