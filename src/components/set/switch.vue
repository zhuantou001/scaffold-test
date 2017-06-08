<template id="switch">
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加选项卡(两个选项卡)
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>选项卡title01</label></el-col>
      <el-col :span="18"><el-input v-model="switch_title01" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>选项卡title02</label></el-col>
      <el-col :span="18"><el-input v-model="switch_title02" placeholder="请输入内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>选项卡content01</label></el-col>
      <el-col :span="18">
        <textEditor></textEditor>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>选项卡content02</label></el-col>
      <el-col :span="18">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="switch_content02">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import textEditor from '../common/textEditor';
  import deleteComponent from '../common/common';

  export default {
    name: 'switch',
    data () {
      return {
        index: 2,
        switch_title01: '',
        switch_title02: '',
        switch_content01: '',
        switch_content02: '',
        switch_object: {
          switch_title01: '选项卡标题01',
          switch_title02: '选项卡标题02',
          switch_content01: '选项卡内容01',
          switch_content02: '选项卡内容02'
        }
      };
    },
    methods: {
      deleteFun () {
        this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
      }
    },
    watch: {
      switch_title01: function () {
        this.switch_object.switch_title01 = this.switch_title01;
        this.$store.commit('newSwitchObject', this.switch_object);
      },
      switch_title02: function () {
        this.switch_object.switch_title02 = this.switch_title02;
        this.$store.commit('newSwitchObject', this.switch_object);
      },
      switch_content01: function () {
        this.switch_object.switch_content01 = this.switch_content01;
        this.$store.commit('newSwitchObject', this.switch_object);
      },
      switch_content02: function () {
        this.switch_object.switch_content02 = this.switch_content02;
        this.$store.commit('newSwitchObject', this.switch_object);
      }
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.getComponentsItems;
      }
    },
    components: {
      textEditor,
      deleteComponent
    }
  };
</script>

<style>

</style>
