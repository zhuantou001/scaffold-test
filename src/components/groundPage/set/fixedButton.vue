<template>
  <div class="assembly" :class="{packUp: isSpread}">
  <!--<div class="assembly">-->
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 固定底部按钮
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <!-- 添加按钮模块 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button type="primary" icon="plus" @click="addMenu()">
          菜单
          <span v-show="menuNum != 0" style="color:#f00;position: relative;left:5px;">({{menuNum}})</span>
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="plus" @click="addButton()">
          按钮
          <span v-show="buttonNum != 0" style="color:#f00;position: relative;left:5px;">({{buttonNum}})</span>
        </el-button>
      </el-col>
      <el-col :span="11">
        <el-radio-group v-model="application" style="position: relative;top:10px;">
          <el-radio :label="0">各终端页面通用</el-radio>
          <el-radio :label="1">仅限某终端使用</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="5" v-show="application === 1">
        <el-input v-model="userAgent" placeholder="请输入终端类型"></el-input>
      </el-col>
    </el-row>
    <!-- 添加按钮模块 end -->
    <!-- 菜单配置项 -->
    <div class="fixedMenuTab menu-group" v-show="menuNum != 0">
      <div class="fixedMenuTabTitle">
        <span :class="{active:item.key === 1}" v-for="item in menuArr" @click="chooseMenu(item.key)">
          {{item.title}}
          <i class="el-icon-circle-close closeIcon" @click.stop="deleteItem(item.key, 'menu')"></i>
        </span>
      </div>
      <div class="fixedMenuTabContent" :class="{active:item.key === 1}" v-for="item in menuArr">
        <el-row :gutter="20">
          <el-col :span="5"><label>上传菜单图标{{item.key}}</label></el-col>
          <el-col :span="19">
            <el-upload
              style="display: inline-block"
              :id = "item.id"
              :data={id:item.id}
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
            <span style="font-size: 12px; color:#f00;position: relative;top:-8px;left:10px;">建议上传50K以内正方形的图片</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5"><label>菜单文字</label></el-col>
          <el-col :span="8"><el-input v-model="item.menuFont" placeholder="请输入按钮文字" @change="inputChange('menuFont',item.key,item.menuFont,'menu')"></el-input></el-col>
          <el-col :span="5"><label>菜单背景色</label></el-col>
          <el-col :span="6"><el-input type="color" v-model="item.menuColor" @change="inputChange('menuColor',item.key,item.menuColor,'menu')"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5"><label>菜单文字大小</label></el-col>
          <el-col :span="8"> <el-input type="number" v-model="item.menuFontSize" :min="10" :max="30" @change="inputChange('menuFontSize',item.key,item.menuFontSize,'menu')"></el-input></el-col>
          <el-col :span="5"><label>菜单文字颜色</label></el-col>
          <el-col :span="6"><el-input type="color" v-model="item.menuFontColor" @change="inputChange('menuFontColor',item.key,item.menuFontColor,'menu')"></el-input></el-col>
        </el-row>
        <div class="subMenuTab">
          <span class="subMenuTabTitle" :class="{subActive: subItem.subkey === 1}" v-for="subItem in item.subMenu" :key="subItem.subkey" @click="chooseSubMenu(item.key, subItem.subkey)">
            {{subItem.title}}
            <i class="el-icon-circle-close closeIcon" @click.stop="deleteSubItem(item.key, subItem.subkey, 'menu')"></i>
          </span>
          <el-button class="addSubMenu" type="primary" icon="plus" @click="addSubMenu(item.key)">
            添加子菜单
            <span v-show="item.subMenuNum != 0" style="color:#f00;position: relative;left:5px;">({{item.subMenuNum}})</span>
          </el-button>
        </div>
        <div class="subMenuTabContent" :class="{subActive: subItem.subkey === 1}" v-for="subItem in item.subMenu" :key="subItem.subkey">
          <el-row :gutter="20">
            <el-col :span="5"><label>子菜单文字</label></el-col>
            <el-col :span="8"><el-input v-model="subItem.subMenuFont" placeholder="请输入按钮文字" @change="inputSubChange('subMenuFont',item.key,subItem.subkey,subItem.subMenuFont,'menu')"></el-input></el-col>
            <el-col :span="5"><label>子菜单文字颜色</label></el-col>
            <el-col :span="6"><el-input type="color" v-model="subItem.subMenuFontColor" @change="inputSubChange('subMenuFontColor',item.key,subItem.subkey,subItem.subMenuFontColor,'menu')"></el-input></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5"><label>子菜单文字大小</label></el-col>
            <el-col :span="8"> <el-input type="number" v-model="subItem.subMenuFontSize" :min="10" :max="30" @change="inputSubChange('subMenuFontSize',item.key,subItem.subkey,subItem.subMenuFontSize,'menu')"></el-input></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5"><label>子菜单点击事件</label></el-col>
            <el-col :span="19">
              <el-radio-group v-model="subItem.clickEffect" @change.native="inputSubChange('clickEffect',item.key,subItem.subkey,subItem.clickEffect,'menu')">
                <el-radio :label="0">二维码</el-radio>
                <el-radio :label="1">分享</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <div v-show="subItem.clickEffect === 0">
            <el-row :gutter="20">
              <el-col :span="5"><label>弹框标题</label></el-col>
              <el-col :span="8"><el-input v-model="subItem.QRCode.title" placeholder="请输入按钮文字" @change="inputSubBoxChange('title',item.key,subItem.subkey,subItem.QRCode.title,'menu','QRCode')"></el-input></el-col>
              <el-col :span="5"><label>弹框标题颜色</label></el-col>
              <el-col :span="6"><el-input type="color" v-model="subItem.QRCode.color" @change="inputSubBoxChange('color',item.key,subItem.subkey,subItem.QRCode.color,'menu','QRCode')"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5"><label>弹框标题大小</label></el-col>
              <el-col :span="8"> <el-input type="number" v-model="subItem.QRCode.fontSize" @change="inputSubBoxChange('fontSize',item.key,subItem.subkey,subItem.QRCode.fontSize,'menu','QRCode')"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5"><label>附加参数Key</label></el-col>
              <el-col :span="7"><el-input v-model="subItem.QRCode.paramKey" placeholder="请输入参数Key" @change="inputSubBoxChange('paramKey',item.key,subItem.subkey,subItem.QRCode.paramKey,'menu','QRCode')"></el-input></el-col>
              <el-col :span="5"><label>附加参数Value</label></el-col>
              <el-col :span="7"><el-input v-model="subItem.QRCode.paramValue" placeholder="请输入参数Value" @change="inputSubBoxChange('paramValue',item.key,subItem.subkey,subItem.QRCode.paramValue,'menu','QRCode')"></el-input></el-col>
            </el-row>
            <!--<el-row :gutter="20">-->
              <!--<el-col :span="5"><label>生成二维码内容</label></el-col>-->
              <!--<el-col :span="19"><el-input v-model="subItem.QRCode.text" placeholder="" @change="inputSubBoxChange('text',item.key,subItem.subkey,subItem.QRCode.text,'menu','QRCode')"></el-input></el-col>-->
            <!--</el-row>-->
            <el-row :gutter="20">
              <el-col :span="5"><label>上传二维码图标</label></el-col>
              <el-col :span="19">
                <el-upload
                  style="display: inline-block"
                  :id = "subItem.id"
                  :data={id:subItem.id,key:item.key,subkey:subItem.subkey}
                  class="avatar-uploader"
                  :action="serverUrl"
                  :headers="headerToken"
                  :show-file-list="false"
                  :multiple="false"
                  :auto-upload="true"
                  :on-success="handleAvatarSuccessQRCode"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="subItem.QRCode.absoluteImgUrl" :src="subItem.QRCode.absoluteImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="font-size: 12px; color:#f00;position: relative;top:-8px;left:10px;">建议上传50K以内正方形的图片</span>
              </el-col>
            </el-row>
          </div>
          <div v-show="subItem.clickEffect === 1">
            <el-row :gutter="20">
              <el-col :span="5"><label>分享标题</label></el-col>
              <el-col :span="19"><el-input v-model="subItem.share.title" placeholder="请输入分享标题" @change="inputSubBoxChange('title',item.key,subItem.subkey,subItem.share.title,'menu','share')"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5"><label>分享描述</label></el-col>
              <el-col :span="19"><el-input v-model="subItem.share.content" placeholder="请输入分享描述" @change="inputSubBoxChange('content',item.key,subItem.subkey,subItem.share.content,'menu','share')"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5"><label>上传分享图标</label></el-col>
              <el-col :span="19">
                <el-upload
                  style="display: inline-block"
                  :id = "subItem.id"
                  :data={id:subItem.id,key:item.key,subkey:subItem.subkey}
                  class="avatar-uploader"
                  :action="serverUrl"
                  :headers="headerToken"
                  :show-file-list="false"
                  :multiple="false"
                  :auto-upload="true"
                  :on-success="handleAvatarSuccessShare"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="subItem.share.absoluteImgUrl" :src="subItem.share.absoluteImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="font-size: 12px; color:#f00;position: relative;top:-8px;left:10px;">建议上传50K以内正方形的图片</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5"><label>分享参数Key</label></el-col>
              <el-col :span="7"><el-input v-model="subItem.share.paramKey" placeholder="请输入分享参数Key" @change="inputSubBoxChange('paramKey',item.key,subItem.subkey,subItem.share.paramKey,'menu','share')"></el-input></el-col>
              <el-col :span="5"><label>分享参数Value</label></el-col>
              <el-col :span="7"><el-input v-model="subItem.share.paramValue" placeholder="请输入分享参数Value" @change="inputSubBoxChange('paramValue',item.key,subItem.subkey,subItem.share.paramValue,'menu','share')"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5"><label>readonly</label></el-col>
              <el-col :span="19">
                <el-radio-group v-model="subItem.share.readonly" @change.native="inputSubBoxChange('readonly',item.key,subItem.subkey,subItem.share.readonly,'menu','share')">
                  <el-radio :label="0">0</el-radio>
                  <el-radio :label="1">1</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 菜单配置项 end -->
    <!-- 按钮配置项 -->
    <div class="fixedButtonTab button-group" v-show="buttonNum != 0">
      <div class="fixedButtonTabTitle">
        <span :class="{active:item.key === 1}" v-for="item in buttonArr" @click="chooseButton(item.key)">
          {{item.title}}
          <i class="el-icon-circle-close closeIcon" @click.stop="deleteItem(item.key, 'button')"></i>
        </span>
      </div>
      <div class="fixedButtonTabContent" :class="{active:item.key === 1}" v-for="item in buttonArr">
        <el-row :gutter="20">
          <el-col :span="5"><label>按钮文字</label></el-col>
          <el-col :span="8"><el-input v-model="item.buttonFont" placeholder="请输入按钮文字" @change="inputChange('buttonFont',item.key,item.buttonFont,'button')"></el-input></el-col>
          <el-col :span="5"><label>按钮背景色</label></el-col>
          <el-col :span="6"><el-input type="color" v-model="item.buttonColor" @change="inputChange('buttonColor',item.key,item.buttonColor,'button')"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5"><label>按钮文字大小</label></el-col>
          <el-col :span="8"> <el-input type="number" v-model="item.buttonFontSize" :min="10" :max="30" @change="inputChange('buttonFontSize',item.key,item.buttonFontSize,'button')"></el-input></el-col>
          <el-col :span="5"><label>按钮文字颜色</label></el-col>
          <el-col :span="6"><el-input type="color" v-model="item.buttonFontColor" @change="inputChange('buttonFontColor',item.key,item.buttonFontColor,'button')"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5"><label>按钮跳转方式</label></el-col>
          <el-col :span="19">
            <el-radio-group v-model="item.buttonLinkWay" @change.native="inputChange('buttonLinkWay',item.key,item.buttonLinkWay,'button')">
              <el-radio :label="0">相对路径</el-radio>
              <el-radio :label="1">绝对路径(http/https)</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5"><label>按钮跳转链接</label></el-col>
          <el-col :span="19"><el-input v-model="item.buttonFillAlias" @change="inputChange('buttonFillAlias',item.key,item.buttonFillAlias,'button')" placeholder="请输入相应填写页的链接名"></el-input></el-col>
        </el-row>
      </div>
    </div>
    <!-- 按钮配置项 end -->
  </div>
</template>


<script>
  import {Config, ROUTES} from '../../common/api';
  export default {
    data () {
      return {
        isSpread: true,
        index: 15,
        buttonNum: 0,
        menuNum: 0,
        serverUrl: Config.api_url + ROUTES.optionImgUpload,
        headerToken: {'x-access-token':localStorage.getItem('token')},
      };
    },
    mounted () {
      this.init();
    },
    watch: {
    },
    methods: {
      handleAvatarSuccess (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
//          console.log('上传成功的图片: ' + JSON.stringify(res.data));
          const self = this;
          this.$nextTick(function(){
            let array = self.FixedButton.menu;
            if (array.length > 0) {
              for (let j = 0; j < array.length; j++) {
                if (array[j]) {
//                  console.log('vuex里的id与后台里的id是否相同: ' + array[j].id + '--' + res.data.fields.id);
                  if (array[j].id === res.data.fields.id) {
                    array[j].image = res.data.optionImg;
                    self.obj.menu = array;
                    self.$store.commit('newFixedButton', self.obj);
                    return false;
                  }
                }
              }
            }
          });
        }
      },
      handleAvatarSuccessShare (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
//          console.log('上传成功的图片: ' + JSON.stringify(res.data));
          const self = this;
          this.$nextTick(function(){
            let shareObj = self.FixedButton.menu[res.data.fields.key-1].subMenu[res.data.fields.subkey-1].share;
            shareObj.image = res.data.optionImg;
            shareObj.absoluteImgUrl = Config.img_prev_url + res.data.optionImg;
            self.obj.menu[res.data.fields.key-1].subMenu[res.data.fields.subkey-1].share = shareObj;
            self.$store.commit('newFixedButton', self.obj);
          });
        }
      },
      handleAvatarSuccessQRCode (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
          console.log('上传成功的图片: ' + JSON.stringify(res.data));
          const self = this;
          this.$nextTick(function(){
            let QRCodeObj = self.FixedButton.menu[res.data.fields.key-1].subMenu[res.data.fields.subkey-1].QRCode;
            QRCodeObj.image = res.data.optionImg;
            QRCodeObj.absoluteImgUrl = Config.img_prev_url + res.data.optionImg;
            self.obj.menu[res.data.fields.key-1].subMenu[res.data.fields.subkey-1].QRCode = QRCodeObj;
            self.$store.commit('newFixedButton', self.obj);
          });
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
          this.failMsg('上传图标只能是 JPG或者PNG 格式');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传图标大小不能超过 50kb!');
          return false;
        }
        return (isPNG || isJPG) && isLt2M;
      },
      init () {
//        console.log('初始化一进来:' + JSON.stringify(this.FixedButton));
        this.buttonArr = this.setButtonArr();
      },
      addMenu () {
        let array = this.FixedButton.menu;
        let objMenu = {};
        objMenu.id = 'menu' + (this.menuNum + 1);
        objMenu.menuFont = '菜单' + (this.menuNum + 1);
        objMenu.menuColor = '#ffffff';
        objMenu.menuFontSize = 14;
        objMenu.menuFontColor = '#666666';
        objMenu.image = '';
        objMenu.subMenu = [];
        objMenu.subMenuNum = objMenu.subMenu.length;
        array.push(objMenu);
//        console.log('添加菜单之后:' + JSON.stringify(array));
        this.obj.menu = array;
        this.menuNum = array.length;
        this.$store.commit('newFixedButton', this.obj);
      },
      addButton () {
        let array = this.FixedButton.button;
        let objButton = {};
        objButton.id = 'button' + (this.buttonNum + 1);
        objButton.buttonFont = '按钮' + (this.buttonNum + 1);
        objButton.buttonColor = '#4ca9d4';
        objButton.buttonFontSize = 14;
        objButton.buttonFontColor = '#ffffff';
        objButton.buttonLinkWay = 0;
        objButton.buttonFillAlias = '';
        array.push(objButton);
//        console.log('添加按钮之后:' + JSON.stringify(array));
        this.obj.button = array;
        this.buttonNum = array.length;
        this.$store.commit('newFixedButton', this.obj);
      },
      addSubMenu (key) {
        let array = this.FixedButton.menu;
        let subMenu = [];
        if (array[key-1].subMenu) {
          subMenu = array[key-1].subMenu;
        }
        let objSubMenu = {};
        objSubMenu.id = 'subMenu' + key + (subMenu.length + 1);
        objSubMenu.subMenuFont = '子菜单' + key + (subMenu.length + 1);
        objSubMenu.subMenuFontSize = 12;
        objSubMenu.subMenuFontColor = '#666666';
        objSubMenu.clickEffect = 0;
        objSubMenu.QRCode = {
          id:'box' + (subMenu.length + 1),
          title: '弹框标题',
          color: '#666666',
          fontSize: 14,
          text: '',
          image: '',
          paramKey: '',
          paramValue: ''
        };
        objSubMenu.share = {
          id: 'share' + (subMenu.length + 1),
          title: '分享标题',
          content: '分享描述',
          image: '',
          paramKey: '',
          paramValue: '',
          readonly: 0
        };
        subMenu.push(objSubMenu);
        array[key-1].subMenu = subMenu;
        array[key-1].subMenuNum = array[key-1].subMenu.length;
        this.obj.menu = array;
//        console.log('添加子菜单: ' + JSON.stringify(this.obj));
        this.$store.commit('newFixedButton', this.obj);
      },
      setButtonArr () {
        let items = [];
        const array = this.FixedButton.button;
        this.buttonNum = array.length;
//        console.log(' array:' + JSON.stringify(array));
//        console.log(array.length);
        if (array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            let object = {};
            object.key = i + 1;
            object.title = '设置按钮' + (i + 1);
            if (array[i].id) {
              object.id = array[i].id;
            } else {
              object.id = 'button' + (i + 1);
            }
            if (array[i].buttonFont) {
              object.buttonFont = array[i].buttonFont;
            } else {
              object.buttonFont = '按钮' + (i + 1);
            }
            if (array[i].buttonColor) {
              object.buttonColor = array[i].buttonColor;
            } else {
              object.buttonColor = '#4ca9d4';
            }
            if (array[i].buttonFontSize) {
              object.buttonFontSize = array[i].buttonFontSize;
            } else {
              object.buttonFontSize = 14;
            }
            if (array[i].buttonFontColor) {
              object.buttonFontColor = array[i].buttonFontColor;
            } else {
              object.buttonFontColor = '#ffffff';
            }
            if (array[i].buttonLinkWay) {
              object.buttonLinkWay = array[i].buttonLinkWay;
            } else {
              object.buttonLinkWay = 0;
            }
            if (array[i].buttonFillAlias) {
              object.buttonFillAlias = array[i].buttonFillAlias;
            } else {
              object.buttonFillAlias = '';
            }
            items.push(object);
          }
//          console.log('最终页面渲染时的组件: ' + JSON.stringify(items));
          return items;
        }
      },
      setMenuArr () {
        let items = [];
        const array = this.FixedButton.menu;
        this.menuNum = array.length;
//        console.log('menu array:' + JSON.stringify(array));
//        console.log(array.length);
        if (array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            let object = {};
            object.key = i + 1;
            object.title = '设置菜单' + (i + 1);
            if (array[i].id) {
              object.id = array[i].id;
            } else {
              object.id = 'menu' + (i + 1);
            }
            if (array[i].menuFont) {
              object.menuFont = array[i].menuFont;
            } else {
              object.menuFont = '菜单' + (i + 1);
            }
            if (array[i].menuColor) {
              object.menuColor = array[i].menuColor;
            } else {
              object.menuColor = '#ffffff';
            }
            if (array[i].menuFontSize) {
              object.menuFontSize = array[i].menuFontSize;
            } else {
              object.menuFontSize = 14;
            }
            if (array[i].menuFontColor) {
              object.menuFontColor = array[i].menuFontColor;
            } else {
              object.menuFontColor = '#666666';
            }
            if (array[i].image) {
              object.absoluteImgUrl =  Config.img_prev_url + array[i].image;
            } else {
              object.absoluteImgUrl = '';
            }
            if (array[i].subMenu) {
              object.subMenu = array[i].subMenu;
              for (let j = 0; j < object.subMenu.length; j++) {
                object.subMenu[j].title = '子菜单' + (j + 1);
                object.subMenu[j].subkey = j + 1;
              }
            } else {
              object.subMenu = [];
            }
            if (array[i].subMenuNum) {
              object.subMenuNum = array[i].subMenu.length;
            } else {
              object.subMenuNum = 0;
            }
            items.push(object);
          }
//          console.log('最终页面渲染时的组件: ' + JSON.stringify(items));
          return items;
        }
      },
      deleteItem (key, category) {
        let array = this.FixedButton[category];
        array.splice(key-1,1);
        this.obj[category] = array;
        this[category + 'Num'] = array.length;
        this.$store.commit('newFixedButton', this.obj);
      },
      deleteSubItem (key, subkey, category) {
        let array = this.FixedButton[category][key-1].subMenu;
        array.splice(subkey-1,1);
        this.obj[category][key-1].subMenu = array;
        this.obj[category][key-1].subMenuNum = array.length;
        this.$store.commit('newFixedButton', this.obj);
      },
      chooseButton (key) {
        const domTitle = document.getElementsByClassName('fixedButtonTabTitle')[0].getElementsByTagName('span');
        const domContent = document.getElementsByClassName('fixedButtonTabContent');
        for (let i = 0; i < domTitle.length; i++) {
          if (domTitle[i].className.indexOf('active') != -1) {
            domTitle[i].classList.remove('active');
          }
        }
        for (let i = 0; i < domContent.length; i++) {
          if (domContent[i].className.indexOf('active') != -1) {
            domContent[i].classList.remove('active');
          }
        }
        domTitle[key-1].classList.add('active');
        domContent[key-1].classList.add('active');
      },
      chooseMenu (key) {
        const domTitle = document.getElementsByClassName('fixedMenuTabTitle')[0].getElementsByTagName('span');
        const domContent = document.getElementsByClassName('fixedMenuTabContent');
        for (let i = 0; i < domTitle.length; i++) {
          if (domTitle[i].className.indexOf('active') != -1) {
            domTitle[i].classList.remove('active');
          }
        }
        for (let i = 0; i < domContent.length; i++) {
          if (domContent[i].className.indexOf('active') != -1) {
            domContent[i].classList.remove('active');
          }
        }
        domTitle[key-1].classList.add('active');
        domContent[key-1].classList.add('active');
      },
      chooseSubMenu (key, subkey) {
        const domTitle = document.getElementsByClassName('fixedMenuTabContent')[key-1].getElementsByClassName('subMenuTabTitle');
        const domContent = document.getElementsByClassName('fixedMenuTabContent')[key-1].getElementsByClassName('subMenuTabContent');
        for (let i = 0; i < domTitle.length; i++) {
          if (domTitle[i].className.indexOf('subActive') != -1) {
            domTitle[i].classList.remove('subActive');
          }
        }
        for (let i = 0; i < domContent.length; i++) {
          if (domContent[i].className.indexOf('subActive') != -1) {
            domContent[i].classList.remove('subActive');
          }
        }
        domTitle[subkey-1].classList.add('subActive');
        domContent[subkey-1].classList.add('subActive');
      },
      inputChange (name, key, value, category) {
//        console.log(name +'/'+ key  +'/'+  value);
        let array = this.FixedButton[category];
        array[(key-1)][name] = value;
        this.obj[category] = array;
        this.$store.commit('newFixedButton', this.obj);
      },
      inputSubChange (name, key, subkey, value, category) {
        let array = this.FixedButton[category][(key-1)].subMenu;
        array[(subkey-1)][name] = value;
        this.obj[category][(key-1)].subMenu = array;
        this.$store.commit('newFixedButton', this.obj);
      },
      inputSubBoxChange (name, key, subkey, value, category, boxCategory) {
        let objBox = this.FixedButton[category][(key-1)].subMenu[subkey-1][boxCategory];
        objBox[name] = value;
        this.obj[category][(key-1)].subMenu[subkey-1][boxCategory] = objBox;
        this.$store.commit('newFixedButton', this.obj);
      },
      deleteFun () {
        this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
      },
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      },
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      },
      obj () {
        var a = {};
        a.button = this.$store.state.button.fixedButton.button;
        a.menu = this.$store.state.button.fixedButton.menu;
        a.application = this.$store.state.button.fixedButton.application;
        a.userAgent = this.$store.state.button.fixedButton.userAgent;
        return a;
      },
      FixedButton () {
        return this.$store.state.button.fixedButton;
      },
      application: {
        set (value) {
          this.obj.application = value;
          this.$store.commit('newFixedButton', this.obj);
        },
        get () {
          return this.$store.state.button.fixedButton.application;
        }
      },
      userAgent: {
        set (value) {
          this.obj.userAgent = value;
          this.$store.commit('newFixedButton', this.obj);
        },
        get () {
          return this.$store.state.button.fixedButton.userAgent;
        }
      },
      menuArr () {
        return this.setMenuArr();
      },
      buttonArr () {
        return this.setButtonArr();
      }
    }
  };
</script>

<style lang="scss" scoped>

  .closeIcon{
    color:#FF4949;
    cursor:pointer;
    position: absolute;
    right:5px;
    top:5px;
    opacity: 0;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .group{
    border:1px solid #ccc;
    background: #eef1f6;
    min-height:40px;
    margin-bottom:15px;
  }
  .fixedButtonTab,.fixedMenuTab{
    position: relative;
  .fixedButtonTabTitle, .fixedMenuTabTitle{
    position: relative;
    border-bottom:1px solid #20a0ff;
    margin-top:20px;
    padding:0 20px;
  span{
    cursor:pointer;
    margin:0 3px;
    font-size:14px;
    position: relative;
    background: #fff;
    bottom:-1px;
    display: inline-block;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding:5px 25px;
    color:#666;
    border:1px solid #ccc;
    border-bottom:none;
  &.active{
     color:#20a0ff;
     border:1px solid #20a0ff;
     border-bottom:1px solid #eef1f6;
     background: #eef1f6;
   }
   &:hover {
      .closeIcon {
        opacity: 0.8;
      }
    }
  }
  &>i{
    position: relative;
    font-style: normal;
    font-size: 14px;
    float:right;
    top:6px;
    color:#20a0ff;
    cursor:pointer;
    }
  }
  .fixedButtonTabContent, .fixedMenuTabContent {
    background: #eef1f6;
    padding:20px;
    display: none;
    &.active{
       display: block;
     }
  }
  }
  .avatar-uploader-icon{
    width: 40px;
    height: 40px;
    line-height: 40px !important;
  }
  .avatar {
    width: 40px;
    height: 40px;
    line-height: 40px !important;
    display: block;
  }
  .subMenuTab{
    border-bottom:1px solid #1D8CE0;
    .subMenuTabTitle {
      cursor:pointer;
      position: relative;
      display: inline-block;
      border:1px solid #ccc;
      line-height: 32px;
      font-size: 14px;
      margin-right: 5px;
      padding:0 25px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom:none;
      background:#eef1f6;
      &.subActive{
         border:1px solid #1D8CE0;
        border-bottom:#eef1f6;
         bottom:-1px;
       }
      &:hover {
        .closeIcon {
          opacity: 0.8;
        }
      }
    }
    .addSubMenu {
      padding: 7px 10px;
      font-size: 13px;
    }
  }
  .subMenuTabContent {
    display: none;
    border:1px solid #1D8CE0;
    border-top:none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding:20px;
    &.subActive{
       display: block;
     }
     label{
       font-size: 14px;
       position: relative;
       top:8px;
     }
  }

</style>
