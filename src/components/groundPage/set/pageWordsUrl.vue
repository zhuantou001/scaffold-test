<template id="pageWords">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 超文本文字
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun">
        <i class="el-icon-delete"></i>
      </a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>配置超文本内容</label>
      </el-col>
      <el-col :span="18">
        <textEditor @textEditorContent="wordContentText" :aa="wordsContent"></textEditor>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>超链接</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="wordsUrl" placeholder="请输入详情图片序号" :min="1" :maxlength="2"></el-input>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import deleteComponent from '../../common/common';
import textEditor from '../../common/textEditor';
export default {
  data() {
    return {
      isSpread: true,
      obj: {
        index: this.index,
        wordsContent: '超文本内容',
        wordsUrl: '1'
      }
    };
  },
  props: ['index'],
  mounted () {
    let arr = this.$store.state.button.wordsUrlArr;
    // console.log(arr)
    arr.push(this.obj);
    this.$store.commit('newWordsUrlArr', arr);
    // console.dir(JSON.stringify(arr));
  },
  methods: {
    deleteFun() {
      this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index,'button', 'wordsUrlArr', 'newWordsUrlArr');
    },
    wordContentText(msg) {
      this.obj.wordsContent = msg;
      this.obj.wordsUrl = this.wordsUrl;
      this.describe();
    },
    describe () {
      let has = false; // 判断arr中有没有这条数据
      let arr = this.$store.state.button.wordsUrlArr;
      for (let i in arr) {
        if (arr[i].index === this.index) {
          arr.splice(i, 1, this.obj);
          has = true;
        }
      }
      if (!has) {
        arr.push(this.obj);
      }
      this.$store.commit('newWordsUrlArr', arr);
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
    setComponentsItems() {
      return this.$store.state.app.setComponentsItems;
    },
    getComponentsItems() {
      return this.$store.state.app.getComponentsItems;
    },
    wordsContent: {
      get() {
        let arr = this.$store.state.button.wordsUrlArr;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].wordsContent;
          }
        }
      },
      set(msg) {
        this.obj.wordsContent = msg;
        this.obj.wordsUrl = this.wordsUrl;
        this.describe();
      }
    },
    wordsUrl: {
      get() {
        let arr = this.$store.state.button.wordsUrlArr;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].wordsUrl;
          }
        }
      },
      set(msg) {
        this.obj.wordsUrl = msg;
        this.obj.wordsContent = this.wordsContent;
        this.describe();
      }
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
