<template>
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加首月资费模块
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
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
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      }
    },
    computed: {
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
