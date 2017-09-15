<template id="switch">
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 添加选项卡
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-radio-group v-model="radioSwitch">
        <el-radio :label="1">一个选项卡</el-radio>
        <el-radio :label="2">两个选项卡</el-radio>
        <el-radio :label="3">三个选项卡</el-radio>
      </el-radio-group>
    </el-row>
    <div>
      <el-row :gutter="20">
        <el-col :span="6"><label>SIM文字选中颜色A</label></el-col>
        <el-col :span="18"><el-input style="width:40%;" type="color" v-model="words_colorLA"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>SIM选中颜色B</label></el-col>
        <el-col :span="18"><el-input style="width:40%;" type="color" v-model="words_colorLB"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>SIM文字未选颜色A</label></el-col>
        <el-col :span="18"><el-input style="width:40%;" type="color" v-model="words_colorRA"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>SIM未选颜色B</label></el-col>
        <el-col :span="18"><el-input style="width:40%;" type="color" v-model="words_colorRB"></el-input></el-col>
      </el-row>
    </div>
    <div v-for="item in tabItems">
      <el-row :gutter="20">
        <el-col :span="6"><label>{{item.title}}</label></el-col>
        <el-col :span="18"><el-input :class="item.id" v-model.lazy="item.titleData" @change="titleDataChange(item.key)" placeholder="请输入内容"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>{{item.content}}</label></el-col>
        <el-col :span="18">
          <textEditor @textEditorContent="item.contentData" :aa="item.contentDataFont"></textEditor>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import textEditor from '../../common/textEditor';
  import deleteComponent from '../../common/common';

  export default {
    name: 'switch',
    data () {
      return {
        index: 2, // 每个组件都有的唯一标识
        defaultColor: {
          simColLA: this.$store.state.button.simObject.simColLA,
          simColLB: this.$store.state.button.simObject.simColLB,
          simColRA: this.$store.state.button.simObject.simColRA,
          simColRB: this.$store.state.button.simObject.simColRB
        }
      };
    },
    methods: {
      deleteFun () {
        this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
      },
      getTextEditor01 (msg) {
        this.switch_content01 = msg;
      },
      getTextEditor02 (msg) {
        this.switch_content02 = msg;
      },
      getTextEditor03 (msg) {
        this.switch_content03 = msg;
      },
      titleDataChange (key) {
        this['switch_title0' + key] = document.getElementsByClassName('tabInput' + key)[0].getElementsByTagName('input')[0].value;
      }
    },
    watch: {
    },
    computed: {
      radioSwitch: {
        get () {
          return this.$store.state.options.switch_num;
        },
        set (value) {
          this.$store.commit('newSwitchNum', value);
        }
      },
      switch_title01: {
        get () {
          return this.$store.state.options.options.switch_title01;
        },
        set (value) {
          this.switch_object.switch_title01 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_title02: {
        get () {
          return this.$store.state.options.options.switch_title02;
        },
        set (value) {
          this.switch_object.switch_title02 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_title03: {
        get () {
          return this.$store.state.options.options.switch_title03;
        },
        set (value) {
          this.switch_object.switch_title03 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_content01: {
        get () {
          return this.$store.state.options.options.switch_content01;
        },
        set (value) {
          this.switch_object.switch_content01 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_content02: {
        get () {
          return this.$store.state.options.options.switch_content02;
        },
        set (value) {
          this.switch_object.switch_content02 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_content03: {
        get () {
          return this.$store.state.options.options.switch_content03;
        },
        set (value) {
          this.switch_object.switch_content03 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      words_colorLA: {
        get () {
          return this.$store.state.button.simObject.simColLA;
        },
        set (value) {
          this.defaultColor.simColLA = value;
          this.$store.commit('newSimObject', this.defaultColor);
        }
      },
      words_colorLB: {
        get () {
          return this.$store.state.button.simObject.simColLB;
        },
        set (value) {
          this.defaultColor.simColLB = value;
          this.$store.commit('newSimObject', this.defaultColor);
        }
      },
      words_colorRA: {
        get () {
          return this.$store.state.button.simObject.simColRA;
        },
        set (value) {
          this.defaultColor.simColRA = value;
          this.$store.commit('newSimObject', this.defaultColor);
        }
      },
      words_colorRB: {
        get () {
          return this.$store.state.button.simObject.simColRB;
        },
        set (value) {
          this.defaultColor.simColRB = value;
          this.$store.commit('newSimObject', this.defaultColor);
        }
      },
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      },
      switch_object () {
        let object = {};
//        for (let i = 0; i < this.radioSwitch; i++) {
//          object['switch_title0' + (i + 1)] = this['switch_title0' + (i + 1)];
//          object['switch_content0' + (i + 1)] = this['switch_content0' + (i + 1)];
//        }
        object.switch_title01 = this.switch_title01;
        object.switch_title02 = this.switch_title02;
        object.switch_title03 = this.switch_title03;
        object.switch_content01 = this.switch_content01;
        object.switch_content02 = this.switch_content02;
        object.switch_content03 = this.switch_content03;
        return object;
      },
      tabItems () {
        let items = [];
        for (let i = 0; i < this.radioSwitch; i++) {
          let object = {};
          object.key = i + 1;
          object.id = 'tabInput' + (i + 1);
          object.title = '选项卡title' + (i + 1);
          object.content = '选项卡content' + (i + 1);
          object.titleData = this['switch_title0' + (i + 1)];
          object.contentData = this['getTextEditor0' + (i + 1)];
          object.contentDataFont = this['switch_content0' + (i + 1)];
          items.push(object);
        }
        return items;
      }
    },
    components: {
      textEditor,
      deleteComponent
    }
  };
</script>

<style>
.hide{
  display:none;
}
</style>
