<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 选项卡
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-radio-group v-model="radioSwitch">
        <el-radio :label="1">一个选项卡</el-radio>
        <el-radio :label="2">两个选项卡</el-radio>
        <el-radio :label="3">三个选项卡</el-radio>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>默认选中第几个选项</label></el-col>
      <el-col :span="5">
        <el-select v-model="tabDefSwitch" placeholder="请选择">
          <el-option v-for="item in tabItems" :key="item.key" :label="item.key" :value="item.key"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div>
      <el-row :gutter="20">
        <el-col :span="6"><label>SIM文字选中颜色A</label></el-col>
        <el-col :span="5"><el-input style="width:80%;" type="color" v-model="words_colorLA"></el-input></el-col>
        <el-col :span="6"><label>SIM选中颜色B<span style="font-size:12px;color:#f00;">(设置已选中SIM卡里面的颜色)</span></label></el-col>
        <el-col :span="5">
          <el-input style="width:80%;" type="color" v-model="words_colorLB"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>SIM文字未选颜色A</label></el-col>
        <el-col :span="5"><el-input style="width:80%;" type="color" v-model="words_colorRA"></el-input></el-col>
        <el-col :span="6"><label>SIM未选颜色B<span style="font-size:12px;color:#f00;">(设置未选中SIM卡里面的颜色)</span></label></el-col>
        <el-col :span="5">
          <el-input style="width:80%;" type="color" v-model="words_colorRB"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>选项卡边框颜色</label></el-col>
        <el-col :span="5"><el-input style="width:80%;" type="color" v-model="setBorderColor"></el-input></el-col>
        <el-col :span="6"><label>选项卡背景颜色<span style="font-size:12px;color:#f00;"></span></label></el-col>
        <el-col :span="5">
          <el-input style="width:80%;" type="color" v-model="setBackgroundColor"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>选项卡选中背景颜色</label></el-col>
        <el-col :span="5"><el-input style="width:80%;" type="color" v-model="setCheckBgColor"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>选项卡上下位移</label></el-col>
        <el-col :span="18">
          <el-input-number v-model="setPosition" :min="-500" :max="500"></el-input-number>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>产品参数key值</label></el-col>
        <el-col :span="18"><el-input v-model="productKey" placeholder="请输入产品参数key值"></el-input></el-col>
      </el-row>
    </div>
    <div class="tab">
      <div class="tabTitle">
        <span :class="{'active':item.isShow, 'normal':!item.isShow}" v-for="item in tabItems" @click="chooseTab(item.key)">设置第{{item.key}}个选项卡</span>
      </div>
      <!--{{tabItems}}-->
      <div class="tabContent" id="item.key" v-for="item in tabItems" :class="{'show':item.isShow, 'hide':!item.isShow}">
        <el-row :gutter="20">
          <el-col :span="6"><label>{{item.title}}</label></el-col>
          <el-col :span="18"><el-input :class="item.id" v-model.lazy="item.titleData" @change="titleDataChange(item.key)" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>{{item.productText}}</label></el-col>
          <el-col :span="18"><el-input :class="item.id" v-model.lazy="item.productTextData" @change="productDataChange(item.key)" placeholder="请输入product_id"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>{{item.content}}</label></el-col>
          <el-col :span="18">
            <textEditor @textEditorContent="item.contentData" :aa="item.contentDataFont"></textEditor>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>{{item.scaleCon}}</label></el-col>
          <el-col :span="18"><el-input :class="item.id" v-model.lazy="item.scaleData" @change="scaleChange(item.key)" placeholder="请输入缩放比例，例如0.85"></el-input></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import textEditor from '../../common/textEditor';
  import deleteComponent from '../../common/common';

  export default {
    data () {
      return {
        isSpread: true,
        index: 2, // 每个组件都有的唯一标识
        defaultColor: {
          simColLA: this.$store.state.button.simObject.simColLA,
          simColLB: this.$store.state.button.simObject.simColLB,
          simColRA: this.$store.state.button.simObject.simColRA,
          simColRB: this.$store.state.button.simObject.simColRB
        },
        isShow1: true,
        isShow2: false,
        isShow3: false
      };
    },
    methods: {
      chooseTab (key) {
        if (key === 1) {
          this.isShow1 = true;
          this.isShow2 = false;
          this.isShow3 = false;
        } else if (key === 2) {
          this.isShow1 = false;
          this.isShow2 = true;
          this.isShow3 = false;
        } else if (key === 3) {
          this.isShow1 = false;
          this.isShow2 = false;
          this.isShow3 = true;
        }
      },
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
      },
      productDataChange (key) {
        this['switch_productId0' + key] = document.getElementsByClassName('tabInput' + key)[1].getElementsByTagName('input')[0].value;
      },
      scaleChange (key) {
        this['switch_scale0' + key] = document.getElementsByClassName('tabInput' + key)[2].getElementsByTagName('input')[0].value;
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
    watch: {
      radioSwitch () {
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.tabDefSwitch = 1;
      }
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
      tabDefSwitch: {
        get () {
          return this.$store.state.options.tabDefSwitch;
        },
        set (value) {
          this.$store.commit('newTabDefSwitch', value);
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
      switch_productId01: {
        get () {
          return this.$store.state.options.options.switch_productId01;
        },
        set (value) {
          this.switch_object.switch_productId01 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_productId02: {
        get () {
          return this.$store.state.options.options.switch_productId02;
        },
        set (value) {
          this.switch_object.switch_productId02 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_productId03: {
        get () {
          return this.$store.state.options.options.switch_productId03;
        },
        set (value) {
          this.switch_object.switch_productId03 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_scale01: {
        get () {
          return this.$store.state.options.options.switch_scale01;
        },
        set (value) {
          this.switch_object.switch_scale01 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_scale02: {
        get () {
          return this.$store.state.options.options.switch_scale02;
        },
        set (value) {
          this.switch_object.switch_scale02 = value;
          this.$store.commit('newSwitchObject', this.switch_object);
        }
      },
      switch_scale03: {
        get () {
          return this.$store.state.options.options.switch_scale03;
        },
        set (value) {
          this.switch_object.switch_scale03 = value;
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
        object.switch_title01 = this.switch_title01;
        object.switch_title02 = this.switch_title02;
        object.switch_title03 = this.switch_title03;
        object.switch_content01 = this.switch_content01;
        object.switch_content02 = this.switch_content02;
        object.switch_content03 = this.switch_content03;
        object.switch_productId01 = this.switch_productId01;
        object.switch_productId02 = this.switch_productId02;
        object.switch_productId03 = this.switch_productId03;
        object.switch_scale01 = this.switch_scale01;
        object.switch_scale02 = this.switch_scale02;
        object.switch_scale03 = this.switch_scale03;
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
          object.scaleCon = '缩放比例' + (i + 1);
          object.titleData = this['switch_title0' + (i + 1)];
          object.contentData = this['getTextEditor0' + (i + 1)];
          object.contentDataFont = this['switch_content0' + (i + 1)];
          object.productText = '产品ID product_id' + (i + 1);
          object.productTextData = this['switch_productId0' + (i + 1)];
          object.scaleData = this['switch_scale0' + (i + 1)];
          object.isShow =  this['isShow' + (i + 1)];
          items.push(object);
        }
        return items;
      },
      setBorderColor: {
        get () {
          return this.$store.state.options.setBorderColor;
        },
        set (value) {
          this.$store.commit('newSetBorderColor', value);
        }
      },
      setBackgroundColor: {
        get () {
          return this.$store.state.options.setBackgroundColor;
        },
        set (value) {
          this.$store.commit('newSetBackgroundColor', value);
        }
      },
      setCheckBgColor: {
        get () {
          return this.$store.state.options.setCheckBgColor;
        },
        set (value) {
          this.$store.commit('newSetCheckBgColor', value);
        }
      },
      setPosition: {
        get () {
          return this.$store.state.options.setPosition;
        },
        set (value) {
          this.$store.commit('newSetPosition', value);
        }
      },
      productKey: {
        get () {
          return this.$store.state.options.productKey;
        },
        set (value) {
          this.$store.commit('newProductKey', value);
        }
      }
    },
    components: {
      textEditor,
      deleteComponent
    }
  };
</script>

<style lang="scss" scoped>
.hide{
  display:none;
}
.show{
  display:block;
}
  .tab{
    position: relative;
    .tabTitle{
      border-bottom:1px solid #20a0ff;
      margin:20px auto;
      padding:0 20px;
      span{
        margin:0 3px;
        font-size:14px;
        position: relative;
        background: #fff;
        bottom:-1px;
        display: inline-block;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding:5px 20px;
        &.active{
          color:#20a0ff;
           border:1px solid #20a0ff;
           border-bottom:1px solid #fff;
         }
         &.normal{
          color:#666;
            border:1px solid #ccc;
            border-bottom:none;
          }
      }
    }
  }

</style>
