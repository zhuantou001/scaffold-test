<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <!--<div class="assembly">-->
      <h3 @click="spread">
        <i class="el-icon-edit"></i> 选项卡--多图版 <span style="font-size: 14px;color:#f00;"> (可添加3到10张图片)</span>
        <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
        <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
      </h3>
      <el-row :gutter="20">
        <el-col :span="6"><label>显示图片数量</label></el-col>
        <el-col :span="18">
          <el-input-number v-model="switchNum" :min="3" :max="10"></el-input-number>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>默认选中第几个选项</label></el-col>
        <el-col :span="5">
          <el-select v-model="defSwitch" placeholder="请选择">
            <el-option v-for="item in tabItems" :key="item.key" :label="item.key" :value="item.key"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>设置图片下小块颜色</label></el-col>
        <el-col :span="5"><el-input type="color" v-model="setDotColor"></el-input></el-col>
        <el-col :span="6"><label>选项卡上下位移</label></el-col>
        <el-col :span="7">
          <el-input-number v-model="productPosition" :min="-500" :max="500"></el-input-number>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>产品参数key值</label></el-col>
        <el-col :span="18"><el-input v-model="productKey" placeholder="请输入产品参数key值"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="setImage" placeholder="请选择">
            <el-option v-for="item in tabItems" :key="item.key" :label="item.title" :value="item.key"></el-option>
          </el-select>
        </el-col>
        <el-col :span="18" v-for="item in tabItems" v-show="item.isShow" :key="item.key">
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
      <div v-for="item in tabItems" v-show="item.isShow" :key="item.key">
        <el-row :gutter="20">
          <el-col :span="6"><label>请输入产品id{{item.key}}</label></el-col>
          <el-col :span="18"><el-input  v-model.lazy="item.productId" @change="inputChange('productId',item.key,item.productId)" placeholder="请输入productId"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>请输入产品name{{item.key}}</label></el-col>
          <el-col :span="18"><el-input v-model.lazy="item.productName" @change="inputChange('productName',item.key,item.productName)" placeholder="请输入productName"></el-input></el-col>
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
</template>

<script>
  import deleteComponent from '../../common/common';
  import {Config, ROUTES} from '../../common/api';

  export default {
    name: 'switch',
    data () {
      return {
        isSpread: true,
        index: 12, // 每个组件都有的唯一标识
        serverUrl: Config.api_url + ROUTES.optionImgUpload,
        headerToken: {'x-access-token':localStorage.getItem('token')},
        setImage: 1
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
          if (self.switchImage.switchImg) {
            array = self.switchImage.switchImg;
//            console.log('self.switchImg: ' + JSON.stringify(self.switchImg));
//            console.log('self.switchImg: ' + self.switchImage.switchNum.length);
          }
          if (array.length > 0) {
            for (let j = 0; j < parseInt(self.switchNum); j++) {
              if (array[j]) {
//                console.log('vuex里的id与后台里的id是否相同: ' + array[j].id + '--' + parseInt(data.fields.id));
                if (array[j].id === parseInt(data.fields.id)) {
                  array[j].image = data.optionImg;
                  self.obj.switchImg = array;
                  self.$store.commit('newSwitchImage', self.obj);
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
          self.$store.commit('newSwitchImage', self.obj);
        });
      },
      inputChange (name, key, value) {
        let array = [];
        if (this.switchImage.switchImg) {
          array = this.switchImage.switchImg;
          array[(key-1)][name] = value;
        }
        this.obj.switchImg = array;
        this.$store.commit('newSwitchImage', this.obj);
      },
      initSwitch () {
        // 添加到vuex
        let switchImgArray = [];
        for (let i = 0; i < this.switchNum; i++) {
          let object = {};
          object.id = (i + 1);
          if (this.switchImage.switchImg[i]) {
            if (this.switchImage.switchImg[i].productId) {
              object.productId = this.switchImage.switchImg[i].productId;
            } else {
              object.productId = (i + 1);
            }
            if (this.switchImage.switchImg[i].productName) {
              object.productName = this.switchImage.switchImg[i].productName;
            } else {
              object.productName = (i + 1);
            }
            if (this.switchImage.switchImg[i].addParam) {
              object.addParam = this.switchImage.switchImg[i].addParam;
            }
            if (this.switchImage.switchImg[i].image) {
              object.image =  this.switchImage.switchImg[i].image;
            } else {
              object.image = '';
            }
          } else {
            object.productId = (i + 1);
            object.productName = (i + 1);
            object.isProductAdd = 1;
            object.productAddKey = (i + 1);
            object.productAddValue = (i + 1);
            object.image = '';
          }
          switchImgArray.push(object);
        }

        this.obj.switchImg = switchImgArray;
//        console.log('set:' + JSON.stringify(this.obj));
        this.$store.commit('newSwitchImage', this.obj);
      },
      addProductChange (key, keyName, id, value) {
        let array = [];
        if (this.switchImage.switchImg) {
          array = this.switchImage.switchImg;
          if (array[key-1].addParam.length) {
            for (let i = 0; i < array[key-1].addParam.length; i++) {
              if (array[key-1].addParam[i].pId === id) {
                array[key-1].addParam[i][keyName] = value;
              }
            }
          }
          this.obj.switchImg = array;
          this.$store.commit('newSwitchImage', this.obj);
        }
      },
      addProductParam (key) {
        let array = [];
        if (this.switchImage.switchImg) {
          array = this.switchImage.switchImg;
//          console.log('添加: ' + key);
//          console.log('之前: ' + JSON.stringify(this.$store.state.options.switchImage.switchImg));
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
          this.$store.commit('newSwitchImage', this.obj);
//          console.log('之后: ' + JSON.stringify(this.$store.state.options.switchImage.switchImg));
        }
      },
      removeProductParam (key, id) {
//        console.log('删除: ' + id + '第' + key + '张卡');
        let array = [];
        if (this.switchImage.switchImg) {
          array = this.switchImage.switchImg;
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
          this.$store.commit('newSwitchImage', this.obj);
        }
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
    },
    watch: {
      switchNum () {
        if (this.switchNum < this.setImage) {
          this.setImage = 1;
        }
        if (this.switchNum < this.defSwitch) {
          this.defSwitch = 1;
        }
      }
    },
    computed: {
      obj () {
        var a = {};
        a.switchNum = this.$store.state.options.switchImage.switchNum;
        a.defSwitch = this.$store.state.options.switchImage.defSwitch;
        a.setDotColor = this.$store.state.options.switchImage.setDotColor;
        a.productPosition = this.$store.state.options.switchImage.productPosition;
        a.switchImg = this.$store.state.options.switchImage.switchImg;
        return a;
      },
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      },
      switchNum: {
        get () {
          return this.$store.state.options.switchImage.switchNum;
        },
        set (value) {
          this.obj.switchNum = value;
          this.$store.commit('newSwitchImage', this.obj);
        }
      },
      defSwitch: {
        get () {
          return this.$store.state.options.switchImage.defSwitch;
        },
        set (value) {
          this.obj.defSwitch = value;
          this.$store.commit('newSwitchImage', this.obj);
        }
      },
      setDotColor: {
        get () {
          return this.$store.state.options.switchImage.setDotColor;
        },
        set (value) {
          this.obj.setDotColor = value;
          this.$store.commit('newSwitchImage', this.obj);
        }
      },
      productPosition: {
        get () {
          return this.$store.state.options.switchImage.productPosition;
        },
        set (value) {
          this.obj.productPosition = value;
          this.$store.commit('newSwitchImage', this.obj);
        }
      },
      switchImage () {
        return this.$store.state.options.switchImage;
      },
      tabItems () {
        let items = [];
        for (let i = 0; i < this.switchNum; i++) {
          let object = {};
          object.key = i + 1;
          object.id = 'tabInput' + (i + 1);
          if (this.setImage === (i + 1)) {
            object.isShow = true;
          } else {
            object.isShow = false;
          }
          object.title =  '设置第' + (i + 1) + '张图片';
          if (this.switchImage.switchImg[i]) {
            if (this.switchImage.switchImg[i].productId) {
              object.productId = this.switchImage.switchImg[i].productId;
            } else {
              object.productId = (i + 1);
            }
            if (this.switchImage.switchImg[i].productName) {
              object.productName = this.switchImage.switchImg[i].productName;
            } else {
              object.productName = (i + 1);
            }
            if (this.switchImage.switchImg[i].addParam) {
              object.addParam = this.switchImage.switchImg[i].addParam;
            } else {
              object.addParam = [];
            }
            object.productClass = 'productClass0' + (i + 1);
            if (object.key === this.switchImage.switchImg[i].id) {
              if (this.switchImage.switchImg[i].image) {
                object.absoluteImgUrl =  Config.img_prev_url + this.switchImage.switchImg[i].image;
              } else {
                object.absoluteImgUrl = '';
              }
            }
          } else {
            object.productClass = 'productClass0' + (i + 1);
            object.productId = (i + 1);
            object.productName = (i + 1);
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
  border:1px solid #ccc;
  display:flex;
  .tabTitle{
    width:150px;
    height:300px;
    overflow-y:scroll;
    overflow-x:hidden;
    &::-webkit-scrollbar{
       width: 2px;
     }
    &::-webkit-scrollbar-track
     {
       border-radius: 10px;
     }
    &::-webkit-scrollbar-thumb
     {
       border-radius: 10px;
       background-color: #aaa;
     }
    &>li{
      line-height: 42px;
      border-bottom:1px solid #ccc;
      border-right:1px solid #ccc;
      padding:0 10px;
      font-size: 14px;
      cursor:pointer;
      &:hover{
         background: #eee;
       }
        &.active{
         background: #c3eaff;
       }
      }
  }
 .tabContent{
   flex:1;
   height:300px;
 }
}
</style>
