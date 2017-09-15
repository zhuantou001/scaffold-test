<template>
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加个人信息模块
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-radio-group v-model="radioPerInfo">
        <el-radio :label="1">用户自己编辑</el-radio>
        <el-radio :label="2">系统录入, 用户不可编辑</el-radio>
      </el-radio-group>
    </el-row>
    <!--<el-row :gutter="20">-->
      <!--<el-col :span="6"><label>姓名</label></el-col>-->
      <!--<el-col :span="18"><el-input v-model="per_name" placeholder="请输入姓名"></el-input></el-col>-->
    <!--</el-row>-->
    <!--<el-row :gutter="20">-->
      <!--<el-col :span="6"><label>身份证号</label></el-col>-->
      <!--<el-col :span="18"><el-input v-model="per_code" placeholder="请输入身份证号"></el-input></el-col>-->
    <!--</el-row>-->
  </div>
</template>


<script>
  import deleteComponent from '../../common/common';
  export default {
    data () {
      return {
        obj: {}
      };
    },
    props: ['index'],
    mounted () {
    },
    watch: {
    },
    methods: {
      personInfo () {
        let arr = [];
        arr.push(this.obj);
        this.$store.commit('newPersonInfo', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      }
    },
    computed: {
      radioPerInfo: {
        get () {
          return this.$store.state.fill.personInfo[0].radioPerInfo;
        },
        set (msg) {
          this.obj.radioPerInfo = msg;
          this.personInfo();
        }
      },
      per_name: {
        get () {
          return this.$store.state.fill.personInfo[0].perName;
        },
        set (msg) {
          this.obj.perName = msg;
          this.personInfo();
        }
      },
      per_code: {
        get () {
          return this.$store.state.fill.personInfo[0].perCode;
        },
        set (msg) {
          this.obj.perCode = msg;
          this.personInfo();
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
