<template id="pageWords">
  <div class="assembly">
    <h3><i class="el-icon-edit"></i> 添加文字</h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>文字内容</label></el-col>
      <el-col :span="18"><el-input v-model="words_content" placeholder="请输入文字内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>文字段落</label></el-col>
      <el-col :span="18">
        <el-select v-model="words_para" value="center" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>文字颜色</label></el-col>
      <el-col :span="18"><el-input style="width:20%;" type="color" v-model="words_color"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>超链接</label></el-col>
      <el-col :span="18"><el-input v-model="words_url" placeholder="文字超链接"></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'pageWords',
    data () {
      return {
        words_content: '',
        words_color: '#4ca9d4',
        words_para: 'center',
        words_url: '',
        words_object: {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center', wordsUrl: ''},
        options: [{
          value: 'center',
          label: '居中'
        }, {
          value: 'left',
          label: '左对齐'
        }, {
          value: 'right',
          label: '右对齐'
        }]
      };
    },
    watch: {
      words_content: function () {
        this.words_object.wordsContent = this.words_content;
        this.$store.commit('newWordsObject', this.words_object);
      },
      words_color: function () {
        this.words_object.wordsColor = this.words_color;
        this.$store.commit('newWordsObject', this.words_object);
      },
      words_para: function () {
        this.words_object.wordsPara = this.words_para;
        this.$store.commit('newWordsObject', this.words_object);
      },
      words_url: function () {
        this.words_object.wordsUrl = this.words_url;
        this.$store.commit('newWordsObject', this.words_object);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
