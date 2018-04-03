<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 描述模块({{index}})
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>描述</label></el-col>
      <el-col :span="18"><textEditor @textEditorContent="getTextEditorDesc" :aa="describe"></textEditor></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>缩放比例</label></el-col>
      <el-col :span="18"><el-input type="number" v-model="scale" placeholder="如想缩放,请输入缩放比例,如0.85"></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  import deleteComponent from '../../common/common';
  import textEditor from '../../common/textEditor';
  export default {
    data () {
      return {
        isSpread: true,
        obj: {index: this.index}
      };
    },
    props: ['index'],
    mounted () {
      let arr = this.$store.state.fill.describes;
      arr.push(this.obj);
      this.$store.commit('newDescribes', arr);
      // console.dir(JSON.stringify(arr));
    },
    watch: {
    },
    methods: {
      getTextEditorDesc (msg) {
        this.obj.describe = msg;
        this.describes();
      },
      describes () {
        let has = false; // 判断arr中有没有这条数据
        let arr = this.$store.state.fill.describes;
        for (let i in arr) {
          if (arr[i].index === this.index) {
//            this.obj.describe = arr[i].describe;
//            this.obj.scale = arr[i].scale;
            arr.splice((i), 1, this.obj);
            has = true;
          }
        }
        if (!has) {
          arr.push(this.obj);
        }
        console.log(arr);
        this.$store.commit('newDescribes', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index, 'describes', 'newDescribes');
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
    computed: {
      describe: {
        get () {
          let arr = this.$store.state.fill.describes;
          for (let i in arr) {
            if (arr[i].index === this.index) {
              return arr[i].describe;
            }
          }
        },
        set (msg) {
          this.obj.describe = msg;
          this.obj.scale = this.scale;
          this.describes();
        }
      },
      scale: {
        get () {
          let arr = this.$store.state.fill.describes;
          for (let i in arr) {
            if (arr[i].index === this.index) {
              return arr[i].scale;
            }
          }
        },
        set (msg) {
          this.obj.describe = this.describe;
          this.obj.scale = msg;
          this.describes();
        }
      },
      setFillComponentsItems () {
        return this.$store.state.fill.setFillComponentsItems;
      },
      getFillComponentsItems () {
        return this.$store.state.fill.getFillComponentsItems;
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
