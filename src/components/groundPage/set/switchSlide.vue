<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <!--<div class="assembly">-->
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 选项卡--图片版<span style="font-size: 14px;color:#f00;"> (可添加1到3张图片)</span>
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
    <el-row :gutter="20" v-show="radioSwitch===2">
      <el-col :span="6"><label>选项卡展示风格</label></el-col>
      <el-col :span="14">
        <el-radio-group v-model="switchShowStyleTwo">
          <el-radio :label="1">第一种</el-radio>
          <el-radio :label="2">第二种</el-radio>
          <el-radio :label="3">第三种</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-show="radioSwitch===3">
      <el-col :span="6"><label>选项卡展示风格</label></el-col>
      <el-col :span="14">
        <el-radio-group v-model="switchShowStyle">
          <el-radio :label="1">第一种</el-radio>
          <el-radio :label="2">第二种</el-radio>
          <el-radio :label="3">第三种</el-radio>
          <el-radio :label="4">第四种</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>默认选中第几个选项</label></el-col>
      <el-col :span="5">
        <el-select v-model="defSwitch" placeholder="请选择">
          <el-option
            v-for="item in tabItems"
            :key="item.key"
            :label="item.key"
            :value="item.key">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6"><label>是否需要背景</label></el-col>
      <el-col :span="5">
        <el-radio-group v-model="radioBackground">
          <el-radio :label="1">无</el-radio>
          <el-radio :label="2">有</el-radio>
        </el-radio-group>
      </el-col>
      <div v-show="radioBackground === 2">
        <el-col :span="6"><label>选项卡背景颜色</label></el-col>
        <el-col :span="5"><el-input type="color" v-model="tabBackgroundColor"></el-input></el-col>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>是否需要已选文字</label></el-col>
      <el-col :span="5">
        <el-select v-model="isCheckedFont" placeholder="请选择">
          <el-option
            v-for="item in isCheckedFontOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"><label>已选文字设置</label></el-col>
      <el-col :span="5"><el-input v-model="checkedFont" placeholder="已选"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>已选文字背景颜色</label></el-col>
      <el-col :span="5"><el-input type="color" v-model="checkedBackgroundColor"></el-input></el-col>
      <el-col :span="6"><label>已选文字字体颜色</label></el-col>
      <el-col :span="5"><el-input type="color" v-model="checkedFontColor"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>选项卡上下位移</label></el-col>
      <el-col :span="18">
        <el-input-number v-model="productPosition" :min="-500" :max="500"></el-input-number>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>产品参数key值</label></el-col>
      <el-col :span="18"><el-input v-model="productKey" placeholder="请输入产品参数key值"></el-input></el-col>
    </el-row>
      <div class="tab">
        <div class="tabTitle">
          <span :class="{'active':item.isShow, 'normal':!item.isShow}" v-for="item in tabItems" @click="chooseTab(item.key)">设置第{{item.key}}个选项卡</span>
        </div>
        <div class="tabContent" :id="item.key" v-for="item in tabItems" :class="{'show':item.isShow, 'hide':!item.isShow}">
          <el-row :gutter="20">
            <el-col :span="6"><label>上传产品图片{{item.key}}</label></el-col>
            <el-col :span="18">
              <el-upload
                :id = "item.key"
                :data={id:item.key}
                class="avatar-uploader"
                :action="serverUrl"
                :headers="headerToken"
                :show-file-list="false"
                :multiple="false"
                :auto-upload="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="item.absoluteImgUrl" :src="item.absoluteImgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><label>请输入产品id{{item.key}}</label></el-col>
            <el-col :span="18"><el-input :class="item.productClass" v-model.lazy="item.productId"  @change="productIdChange(item.key)"  placeholder="请输入productId"></el-input></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><label>请输入产品name{{item.key}}</label></el-col>
            <el-col :span="18"><el-input :class="item.productClass" v-model.lazy="item.productName"  @change="productNameChange(item.key)"  placeholder="请输入productName"></el-input></el-col>
          </el-row>
          <el-row :gutter="20" v-show="(radioSwitch === 2 && switchShowStyleTwo === 3) || (radioSwitch === 3 && switchShowStyle === 4)">
            <el-col :span="6"><label>请输入产品详情{{item.key}}</label></el-col>
            <el-col :span="18">
              <textEditor @textEditorContent="getTextEditor" :textKey="item.key" :aa="item.productContent"></textEditor>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><label>添加附加产品</label></el-col>
            <el-col :span="6"><el-button type="primary" icon="plus" @click="addProductParam(item.key)">添加一组</el-button></el-col>
          </el-row>
          <el-row :gutter="20" v-for="paramItem in item.addParam" :key="paramItem.pId">
            <el-col :span="4"><label>附加产品key</label></el-col>
            <el-col :span="5"><el-input v-model.lazy="paramItem.pKey" @change="addProductChange(item.key, 'pKey',paramItem.pId,paramItem.pKey)" placeholder="请输入key"></el-input> </el-col>
            <el-col :span="6"><label>附加产品编码value</label></el-col>
            <el-col :span="5"><el-input v-model.lazy="paramItem.pValue" @change="addProductChange(item.key, 'pValue',paramItem.pId,paramItem.pValue)" placeholder="请输入value"></el-input> </el-col>
            <el-col :span="4"><el-button type="danger" icon="minus" @click="removeProductParam(item.key, paramItem.pId)">删除</el-button></el-col>
          </el-row>
        </div>
       </div>
    </div>
</template>

<script>
  import deleteComponent from '../../common/common';
  import textEditor from '../../common/textEditorS';
  import {Config, ROUTES} from '../../common/api';

  export default {
    name: 'switch',
    data () {
      return {
        isSpread: true,
        index: 9, // 每个组件都有的唯一标识
        isShow1: true,
        isShow2: false,
        isShow3: false,
        isCheckedFontOptions: [{
          value: 1,
          label: '是'
        }, {
          value: 2,
          label: '否'
        }],
        serverUrl: Config.api_url + ROUTES.optionImgUpload,
        headerToken: {'x-access-token':localStorage.getItem('token')},

      };
    },
    mounted () {
    },
    methods: {
      handleAvatarSuccess (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
          this.handleImage(res.data);
        }
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // 测试环境 限制50kb
        const isLt2M = file.size / 1024 < 50;
        // 正式环境  100kb
        // const isLt2M = file.size / 1024 < 100;
        if (!isJPG && !isPNG) {
          this.failMsg('上传头图图片只能是 JPG或者PNG 格式');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头图图片大小不能超过 50kb!');
          return false;
          // this.$message.error('上传头图图片大小不能超过 100kb!');
        }
        return (isPNG || isJPG) && isLt2M;
      },
      handleImage (data) {
        const self = this;
        this.$nextTick(function(){
          let array = [];
          if (self.switchSlide.switchImg) {
            array = self.switchSlide.switchImg;
//            console.log('self.switchImg: ' + JSON.stringify(self.switchImg));
//            console.log('self.switchImg: ' + self.switchSlide.radioSwitch.length);
          }
          if (array.length > 0) {
            for (let j = 0; j < parseInt(self.radioSwitch); j++) {
              if (array[j]) {
//                console.log('vuex里的id与后台里的id是否相同: ' + array[j].id + '--' + parseInt(data.fields.id));
                if (array[j].id === parseInt(data.fields.id)) {
                  array[j].image = data.optionImg;
                  self.obj.switchImg = array;
                  self.$store.commit('newSwitchSlide', self.obj);
                  return false;
                }
              }
            }
          }
          // 当以上都不满足时, 走以下程序
          let objImg = {};
          objImg.id = parseInt(data.fields.id);
          objImg.image = data.optionImg;
          array.push(objImg);
          self.obj.switchImg = array;
          self.$store.commit('newSwitchSlide', self.obj);
        });
      },
      getTextEditor (msg,key) {
//        console.log(key +':' + msg);
        let array = [];
        if (this.switchSlide.switchImg) {
          array = this.switchSlide.switchImg;
          array[key-1].productContent = msg;
        }
//        console.log('写入详细Content: ' + JSON.stringify(array));
        this.obj.switchImg = array;
        this.$store.commit('newSwitchSlide', this.obj);
      },
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
      productIdChange (key) {
        let array = [];
        const productData = document.getElementsByClassName('productClass0' + key)[0].getElementsByTagName('input')[0].value;
        if (this.switchSlide.switchImg) {
          array = this.switchSlide.switchImg;
//          console.log('写入id: ' + JSON.stringify(array));
          array[(key-1)].productId = productData;
        }
        this.obj.switchImg = array;
        this.$store.commit('newSwitchSlide', this.obj);
      },
      productNameChange (key) {
        let array = [];
        const productData = document.getElementsByClassName('productClass0' + key)[1].getElementsByTagName('input')[0].value;
        if (this.switchSlide.switchImg) {
          array = this.switchSlide.switchImg;
          array[(key-1)].productName = productData;
        }
        this.obj.switchImg = array;
        this.$store.commit('newSwitchSlide', this.obj);
      },
      deleteFun () {
        this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
      },
      // 展开收起
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      },
      initSwitch () {
        // 添加到vuex
        let switchImgArray = [];
        for (let i = 0; i < this.radioSwitch; i++) {
          let object = {};
          object.id = (i + 1);
          if (this.switchSlide.switchImg[i]) {
            if (this.switchSlide.switchImg[i].productId) {
              object.productId = this.switchSlide.switchImg[i].productId;
            } else {
              object.productId = (i + 1);
            }
            if (this.switchSlide.switchImg[i].productName) {
              object.productName = this.switchSlide.switchImg[i].productName;
            } else {
              object.productName = (i + 1);
            }

            if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
              if (this.switchSlide.switchImg[i].productContent) {
                object.productContent = this.switchSlide.switchImg[i].productContent;
              } else {
                object.productContent = '请输入内容';
              }
            }
            if (this.switchSlide.switchImg[i].image) {
              object.image =  this.switchSlide.switchImg[i].image;
            } else {
              object.image = '';
            }
            if (this.switchSlide.switchImg[i].addParam) {
              object.addParam = this.switchSlide.switchImg[i].addParam;
            }
          } else {
            object.productId = (i + 1);
            object.productName = (i + 1);
            if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
              object.productContent = '请输入内容';
            }
            object.image = '';
          }
          switchImgArray.push(object);
        }

        this.obj.switchImg = switchImgArray;
        this.$store.commit('newSwitchSlide', this.obj);
      },
      addProductChange (key, keyName, id, value) {
        let array = [];
        if (this.switchSlide.switchImg) {
          array = this.switchSlide.switchImg;
          if (array[key-1].addParam.length) {
            for (let i = 0; i < array[key-1].addParam.length; i++) {
              if (array[key-1].addParam[i].pId === id) {
                array[key-1].addParam[i][keyName] = value;
              }
            }
          }
          this.obj.switchImg = array;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      addProductParam (key) {
        let array = [];
        if (this.switchSlide.switchImg) {
          array = this.switchSlide.switchImg;
//          console.log('添加: ' + key);
//          console.log('之前: ' + JSON.stringify(this.$store.state.options.switchSlide.switchImg));
          if (array[key-1]) {
            if (!array[key-1].addParam) {
              array[key-1].addParam = [];
            }
            if (array[key-1].addParam.length > 3) {
              alert('附加产品参数不能超过4个');
              return false;
            }
            let pId = '0' + key + this.randomId();
//            console.log(pId);
            let pObj = {pId: pId, pKey: '', pValue: ''};
            array[key-1].addParam.push(pObj);
          }
          this.obj.switchImg = array;
          this.$store.commit('newSwitchSlide', this.obj);
//          console.log('之后: ' + JSON.stringify(this.$store.state.options.switchSlide.switchImg));
        }
      },
      removeProductParam (key, id) {
//        console.log('删除: ' + id + '第' + key + '张卡');
        let array = [];
        if (this.switchSlide.switchImg) {
          array = this.switchSlide.switchImg;
          if (array[key-1].addParam.length) {
//            console.log('删除之前: ' + JSON.stringify(array[key-1].addParam));
            for (let i = 0; i < array[key-1].addParam.length; i++) {
              if (array[key-1].addParam[i].pId === id) {
                array[key-1].addParam.splice(i,1);
//                console.log('删除之后: ' + JSON.stringify(array[key-1].addParam));
              }
            }
          }
          this.obj.switchImg = array;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
    },
    watch: {
      radioSwitch () {
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        this.defSwitch = 1;
//        this.initSwitch();
      }
    },
    computed: {
      obj () {
        var a = {};
        a.radioSwitch = this.$store.state.options.switchSlide.radioSwitch;
        a.switchShowStyle = this.$store.state.options.switchSlide.switchShowStyle;
        a.switchShowStyleTwo = this.$store.state.options.switchSlide.switchShowStyleTwo;
        a.defSwitch = this.$store.state.options.switchSlide.defSwitch;
        a.radioBackground = this.$store.state.options.switchSlide.radioBackground;
        a.tabBackgroundColor = this.$store.state.options.switchSlide.tabBackgroundColor;
        a.isCheckedFont = this.$store.state.options.switchSlide.isCheckedFont;
        a.checkedFont = this.$store.state.options.switchSlide.checkedFont;
        a.checkedBackgroundColor = this.$store.state.options.switchSlide.checkedBackgroundColor;
        a.checkedFontColor = this.$store.state.options.switchSlide.checkedFontColor;
        a.productPosition = this.$store.state.options.switchSlide.productPosition;
        a.switchImg = this.$store.state.options.switchSlide.switchImg;
        return a;
      },
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      },
      radioSwitch: {
        get () {
          return this.$store.state.options.switchSlide.radioSwitch;
        },
        set (value) {
          this.obj.radioSwitch = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      switchShowStyle: {
        get () {
          return this.$store.state.options.switchSlide.switchShowStyle;
        },
        set (value) {
          this.obj.switchShowStyle = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      switchShowStyleTwo: {
        get () {
          return this.$store.state.options.switchSlide.switchShowStyleTwo;
        },
        set (value) {
          this.obj.switchShowStyleTwo = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      defSwitch: {
        get () {
          return this.$store.state.options.switchSlide.defSwitch;
        },
        set (value) {
          this.obj.defSwitch = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      radioBackground: {
        get () {
          return this.$store.state.options.switchSlide.radioBackground;
        },
        set (value) {
          this.obj.radioBackground = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      tabBackgroundColor: {
        get () {
          return this.$store.state.options.switchSlide.tabBackgroundColor;
        },
        set (value) {
          this.obj.tabBackgroundColor = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      isCheckedFont: {
        get () {
          return this.$store.state.options.switchSlide.isCheckedFont;
        },
        set (value) {
          this.obj.isCheckedFont = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      checkedFont: {
        get () {
          return this.$store.state.options.switchSlide.checkedFont;
        },
        set (value) {
          this.obj.checkedFont = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      checkedBackgroundColor: {
        get () {
          return this.$store.state.options.switchSlide.checkedBackgroundColor;
        },
        set (value) {
          this.obj.checkedBackgroundColor = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      checkedFontColor: {
        get () {
          return this.$store.state.options.switchSlide.checkedFontColor;
        },
        set (value) {
          this.obj.checkedFontColor = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      productPosition: {
        get () {
          return this.$store.state.options.switchSlide.productPosition;
        },
        set (value) {
          this.obj.productPosition = value;
          this.$store.commit('newSwitchSlide', this.obj);
        }
      },
      switchSlide () {
        return this.$store.state.options.switchSlide;
      },
      switchImg () {
        return this.$store.state.options.switchSlide.switchImg;
      },
      tabItems () {
        let items = [];
        for (let i = 0; i < this.radioSwitch; i++) {
          let object = {};
          object.key = i + 1;
          object.id = 'tabInput' + (i + 1);
          object.isShow =  this['isShow' + (i + 1)];
          if (this.switchSlide.switchImg[i]) {
            if (this.switchSlide.switchImg[i].productId) {
              object.productId = this.switchSlide.switchImg[i].productId;
            } else {
              object.productId = (i + 1);
            }
            if (this.switchSlide.switchImg[i].productName) {
              object.productName = this.switchSlide.switchImg[i].productName;
            } else {
              object.productName = (i + 1);
            }
            if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
              if (this.switchSlide.switchImg[i].productContent) {
                object.productContent = this.switchSlide.switchImg[i].productContent;
              } else {
                object.productContent = '请输入内容';
                console.log('lala:' + JSON.stringify(this.$store.state.options.switchSlide.switchImg));
              }
            }
            if (this.switchSlide.switchImg[i].addParam) {
              object.addParam = this.switchSlide.switchImg[i].addParam;
            } else {
              object.addParam = [];
            }
            object.productClass = 'productClass0' + (i + 1);
            if (object.key === this.switchSlide.switchImg[i].id) {
              if (this.switchSlide.switchImg[i].image) {
                object.absoluteImgUrl =  Config.img_prev_url + this.switchSlide.switchImg[i].image;
              } else {
                object.absoluteImgUrl = '';
              }
            }
          } else {
            object.productClass = 'productClass0' + (i + 1);
            object.productId = (i + 1);
            object.productName = (i + 1);
            if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
              object.productContent = '请输入内容';
            }
            object.absoluteImgUrl = '';
          }
          items.push(object);
        }
        this.initSwitch(); //设置vuex的值
//        console.log('最终页面渲染时的组件: ' + JSON.stringify(items));
        return items;
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
      deleteComponent,
      textEditor
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
