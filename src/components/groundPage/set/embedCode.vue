<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 嵌码
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>嵌码地址</label></el-col>
      <el-col :span="18"><el-input v-model="codeUrl" placeholder="请输入嵌码地址"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>代码</label></el-col>
      <el-col :span="18">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10}"
          placeholder="请输入内容"
          v-model="codeContent">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        isSpread: true
      };
    },
    props: ["index"],
    mounted () {
    },
    watch: {
    },
    methods: {
      deleteFun() {
        this.deleteComponent(this.setComponentsItems, '', this.index);
      },
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      }
    },
    computed: {
      obj() {
        var a = {};
        a.codeUrl = this.$store.state.topImg.embedCode.codeUrl;
        a.codeContent = this.$store.state.topImg.embedCode.codeContent;
        return a;
      },
      codeUrl: {
        get () {
          return this.$store.state.topImg.embedCode.codeUrl;
        },
        set (value) {
          this.obj.codeUrl = value;
          this.$store.commit('newEmbedCode', this.obj);
        }
      },
      codeContent: {
        get () {
          return this.$store.state.topImg.embedCode.codeContent;
        },
        set (value) {
          this.obj.codeContent = value;
          this.$store.commit('newEmbedCode', this.obj);
        }
      },
      setComponentsItems() {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems() {
        return this.$store.state.app.getComponentsItems;
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
