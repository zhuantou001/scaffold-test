<template id="pageWords">
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加超文本文字
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
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
      <el-col :span="18"><el-input v-model="words_url" placeholder="请输入详情图片序号" :min="1" :maxlength="2"></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  import deleteComponent from '../../common/common';
  export default {
    name: 'pageWords',
    data () {
      return {
        index: 5,
        words_content: this.$store.state.button.descLinkObject.wordsContent,
        words_color: this.$store.state.button.descLinkObject.wordsColor,
        words_para: this.$store.state.button.descLinkObject.wordsPara,
        words_url: this.$store.state.button.descLinkObject.wordsUrl,
        words_url_object: {wordsContent: this.$store.state.button.descLinkObject.wordsContent, wordsColor: this.$store.state.button.descLinkObject.wordsColor, wordsPara: this.$store.state.button.descLinkObject.wordsPara, wordsUrl: this.$store.state.button.descLinkObject.wordsUrl},
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
    methods: {
      deleteFun () {
        this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
      }
    },
    watch: {
      words_content: function () {
        this.words_url_object.wordsContent = this.words_content;
        this.$store.commit('newWordsUrlObject', this.words_url_object);
      },
      words_color: function () {
        this.words_url_object.wordsColor = this.words_color;
        this.$store.commit('newWordsUrlObject', this.words_url_object);
      },
      words_para: function () {
        this.words_url_object.wordsPara = this.words_para;
        this.$store.commit('newWordsUrlObject', this.words_url_object);
      },
      words_url: function () {
        this.words_url_object.wordsUrl = this.words_url;
        this.$store.commit('newWordsUrlObject', this.words_url_object);
      }
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      }
    },
    component: {
      deleteComponent
    }
  };
</script>

<style lang="scss" scoped>

</style>
