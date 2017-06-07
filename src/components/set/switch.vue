<template id="switch">
  <div class="assembly">
    <h3><i class="el-icon-edit"></i> 添加选项卡(两个选项卡)</h3>
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

  export default {
    name: 'switch',
    data () {
      return {
        switch_title01: '',
        switch_title02: '',
        switch_content01: '',
        switch_content02: ''
      };
    },
    methods: {
    },
    watch: {
      switch_title01: function () {
        this.$store.commit('newSwitchTitle01', this.switch_title01);
      },
      switch_title02: function () {
        this.$store.commit('newSwitchTitle02', this.switch_title02);
      },
      switch_content01: function () {
        this.$store.commit('newSwitchContent01', this.switch_content01);
      },
      switch_content02: function () {
        this.$store.commit('newSwitchContent02', this.switch_content02);
      }
    },
    components: {
      textEditor
    }
  };
</script>

<style>

</style>
