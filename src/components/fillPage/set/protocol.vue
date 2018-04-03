<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 添加同意协议模块
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>协议标题</label></el-col>
      <el-col :span="18"><el-input v-model="protocol_font" placeholder="请输入协议标题"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>协议颜色</label></el-col>
      <el-col :span="10">
        <el-radio v-model="isMajorColor" label="1">使用主色调</el-radio>
        <el-radio v-model="isMajorColor" label="2">不使用主色调</el-radio>
      </el-col>
      <el-col :span="4" v-show="showColor"><el-input style="width:100%;" type="color" v-model="protocol_color"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>协议内容导入方式</label></el-col>
      <el-col :span="18">
        <el-radio v-model="isProtocolUrl" label="1">使用接口配置</el-radio>
        <el-radio v-model="isProtocolUrl" label="2">手动输入</el-radio>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="showProtocolUrl">
      <el-col :span="6"><label>协议接口</label></el-col>
      <el-col :span="18"><el-input v-model="protocol_url" placeholder="请输入协议接口"></el-input></el-col>
    </el-row>
    <el-row :gutter="20" v-else>
      <el-col :span="6"><label>协议内容</label></el-col>
      <el-col :span="18"><textEditor @textEditorContent="getTextEditorProtocol" :aa="protocolContent"></textEditor></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>协议类型</label></el-col>
      <el-col :span="18"><el-input v-model="activity_type" placeholder="请输入协议类型"></el-input></el-col>
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
        showColor: true,
        showProtocolUrl: true
      };
    },
    props: ['index'],
    mounted () {
      this.initColor();
      this.initUrl();
    },
    watch: {
      isMajorColor () {
        this.initColor();
      },
      isProtocolUrl () {
        this.initUrl();
      },
      majorColor () {
        this.initColor();
      }
    },
    methods: {
      initColor () {
        if (this.isMajorColor === '1') {
          this.showColor = false;
          this.obj.protocolColor = this.majorColor;
          this.protocol();
        } else if (this.isMajorColor === '2'){
          this.showColor = true;
          this.obj.protocolColor = '#4ca9d4';
          this.protocol();
        }
      },
      initUrl () {
        if (this.isProtocolUrl === '1') {
          this.showProtocolUrl = true;
        } else if (this.isProtocolUrl === '2'){
          this.showProtocolUrl = false;
        }
      },
      protocol () {
        let arr = this.$store.state.fill.protocol;
        arr.splice(0, 1, this.obj);
        this.$store.commit('newProtocol', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      },
      getTextEditorProtocol (msg) {
        this.obj.protocolContent = msg;
        this.protocol();
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
      obj () {
        var a = {};
        a.protocolColor = this.$store.state.fill.protocol[0].protocolColor;
        a.protocolFont = this.$store.state.fill.protocol[0].protocolFont;
        a.isMajorColor = this.$store.state.fill.protocol[0].isMajorColor;
        a.isProtocolUrl = this.$store.state.fill.protocol[0].isProtocolUrl;
        a.protocolUrl = this.$store.state.fill.protocol[0].protocolUrl;
        a.protocolContent = this.$store.state.fill.protocol[0].protocolContent;
        a.activityType = this.$store.state.fill.protocol[0].activityType;
        return a;
      },
      protocol_font: {
        get () {
          return this.$store.state.fill.protocol[0].protocolFont;
        },
        set (msg) {
          this.obj.protocolFont = msg;
          this.protocol();
        }
      },
      protocol_color: {
        get () {
          return this.$store.state.fill.protocol[0].protocolColor;
        },
        set (msg) {
          this.obj.protocolColor = msg;
          this.protocol();
        }
      },
      isMajorColor: {
        get () {
          return this.$store.state.fill.protocol[0].isMajorColor;
        },
        set (msg) {
          this.obj.isMajorColor = msg;
          this.protocol();
        }
      },
      protocolContent: {
        get () {
          return this.$store.state.fill.protocol[0].protocolContent;
        },
        set (msg) {
          this.obj.protocolContent = msg;
          this.protocol();
        }
      },
      isProtocolUrl: {
        get () {
          return this.$store.state.fill.protocol[0].isProtocolUrl;
        },
        set (msg) {
          this.obj.isProtocolUrl = msg;
          this.protocol();
        }
      },
      protocol_url: {
        get () {
          return this.$store.state.fill.protocol[0].protocolUrl;
        },
        set (msg) {
          this.obj.protocolUrl = msg;
          this.protocol();
        }
      },
      activity_type: {
        get () {
          return this.$store.state.fill.protocol[0].activityType;
        },
        set (msg) {
          this.obj.activityType = msg;
          this.protocol();
        }
      },
      setFillComponentsItems () {
        return this.$store.state.fill.setFillComponentsItems;
      },
      getFillComponentsItems () {
        return this.$store.state.fill.getFillComponentsItems;
      },
      majorColor () {
        return this.$store.state.fill.pageNature[0].majorColor;
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
