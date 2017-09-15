<template>
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加描述模块({{index}})
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>描述</label></el-col>
      <!--<el-col :span="18"><el-input v-model="describe" placeholder="请输入描述"></el-input></el-col>-->
      <el-col :span="18"><textEditor @textEditorContent="getTextEditorDesc" :aa="describe"></textEditor></el-col>
    </el-row>
  </div>
</template>


<script>
  import deleteComponent from '../../common/common';
  import textEditor from '../../common/textEditor';
  export default {
    data () {
      return {
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
            arr.splice((i), 1, this.obj);
            has = true;
          }
        }
        if (!has) {
          arr.push(this.obj);
        }
        this.$store.commit('newDescribes', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index, 'describe', 'newDescribes');
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
