<template id="pageWords">
  <!-- <div class="assembly"> -->
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 文字
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun">
        <i class="el-icon-delete"></i>
      </a>
    </h3>
        <el-row :gutter="20">
          <el-col :span='6'><label>配置文字内容</label></el-col>
          <el-col :span='18'>
           <textEditor @textEditorContent="wordDescript" :aa="configWords"></textEditor>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>缩放比例</label></el-col>
          <el-col :span="18"><el-input type="number" v-model="wordScale" placeholder="如想缩放,请输入缩放比例,如0.85"></el-input></el-col>
        </el-row>
  </div>
</template>


<script>
import deleteComponent from '../../common/common';
import textEditor from '../../common/textEditor';

export default {
  name: 'pageWords',
  data() {
    return {
      isSpread: true,
      obj: {
        index: this.index,
        wordsContent: '文本内容'
      }
    };
  },
  props: ['index'],
  mounted () {
    let arr = this.$store.state.button.wordsArr;
    arr.push(this.obj);
    this.$store.commit('newWordsArr', arr);
    // console.dir(JSON.stringify(arr));
  },
  methods: {
    deleteFun() {
      this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index,'button', 'wordsArr', 'newWordsArr');
    },
    wordDescript(msg) {
      this.obj.wordsContent = msg;
      this.describe();
    },
    describe () {
      let has = false; // 判断arr中有没有这条数据
      let arr = this.$store.state.button.wordsArr;
      for (let i in arr) {
        if (arr[i].index === this.index) {
          arr.splice(i, 1, this.obj);
          has = true;
        }
      }
      if (!has) {
        arr.push(this.obj);
      }
      this.$store.commit('newWordsArr', arr);
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
      // return this.$store.state.top.topsetComponentsItems;
      return this.$store.state.app.setComponentsItems;
    },
    getComponentsItems() {
      return this.$store.state.app.getComponentsItems;
    },
    configWords: {
      get() {
        // console.log(this.$store.state.button.wordsContentObj[0].wordsContent)
        //return this.$store.state.button.wordsContentObj[0].wordsContent;
        let arr = this.$store.state.button.wordsArr;
        //console.log(arr)
        for (let i in arr) {
          //console.log(this.$store.state.button.wordsContentObj[i].wordsContent)
          //return this.$store.state.button.wordsContentObj[i].wordsContent;
          if (arr[i].index === this.index) {
            // console.log(arr[i].index)
            // console.log(this.index)
            //console.log(arr[i].wordsContent)
            return arr[i].wordsContent;
          }
        }
      },
      set(msg) {
        this.obj.wordScale = this.wordScale;
        this.obj.wordsContent = msg;
        this.describe();
      }
    },
    wordScale: {
      get() {
        let arr = this.$store.state.button.wordsArr;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].wordScale;
          }
        }
      },
      set(msg) {
        this.obj.wordsContent = this.configWords;
        this.obj.wordScale = msg;
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
