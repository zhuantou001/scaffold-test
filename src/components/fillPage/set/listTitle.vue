<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 添加 list title ({{index}})
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>标题</label></el-col>
      <el-col :span="18"><el-input v-model="list_title" placeholder="请输入标题"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>备注</label></el-col>
      <el-col :span="18"><el-input v-model="list_remark" placeholder="请输入备注"></el-input></el-col>
    </el-row>
  </div>
</template>


<script>
  import deleteComponent from '../../common/common';
  export default {
    data () {
      return {
        isSpread: true,
        list: [],
        obj: {index: this.index}
      };
    },
    props: ['index'],
    mounted () {
    },
    watch: {
    },
    methods: {
      list_titles () {
        let has = false; // 判断this.list中有没有这条数据
        let i = 0;
        for (i in this.list) {
          if (this.list[i].index === this.index) {
            this.list.splice((i), 1, this.obj);
            // console.log('循环内setListTitle:' + JSON.stringify(this.list));
            has = true;
          }
        }
        if (!has) {
          this.list.push(this.obj);
        }
        console.log('setListTitle:' + JSON.stringify(this.list));
        this.$store.commit('newListTitles', this.list);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index, 'listTitles', 'newListTitles');
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
      list_title: {
        get () {
          this.list = this.$store.state.fill.listTitles;
          // alert(JSON.stringify(this.list));
          let i = 0;
          for (i in this.list) {
            if (this.list[i].index === this.index) {
              return this.list[i].listTitle;
            }
          }
        },
        set (msg) {
          this.obj.listTitle = msg;
          this.list_titles();
        }
      },
      list_remark: {
        get () {
          this.list = this.$store.state.fill.listTitles;
          // alert(JSON.stringify(this.list));
          let i = 0;
          for (i in this.list) {
            if (this.list[i].index === this.index) {
              return this.list[i].listRemark;
            }
          }
        },
        set (msg) {
          this.obj.listRemark = msg;
          this.list_titles();
        }
      },
      setFillComponentsItems () {
        return this.$store.state.fill.setFillComponentsItems;
      },
      getFillComponentsItems () {
        return this.$store.state.fill.getFillComponentsItems;
      }
    },
    component: {
      deleteComponent
    }
  };
</script>

<style lang="scss" scoped>

</style>
