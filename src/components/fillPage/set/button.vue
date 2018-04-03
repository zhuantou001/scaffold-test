<template>
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 按钮模块
      <span class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></span>
      <a class="del-component" @click.stop="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮文字</label></el-col>
      <el-col :span="18"><el-input v-model="button_font" placeholder="请输入按钮文字"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮圆角</label></el-col>
      <el-col :span="18"><el-input v-model="button_radius" type='number'></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮颜色</label></el-col>
      <el-col :span="10" style="padding-top:8px;">
        <el-radio v-model="isMajorColor" label="1">使用主色调</el-radio>
        <el-radio v-model="isMajorColor" label="2">不使用主色调</el-radio>
      </el-col>
      <el-col :span="4" v-show="showColor"><el-input style="width:100%;" type="color" v-model="button_color"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>设置成功弹框</label>
      </el-col>
      <el-col :span="18">
        <a class='view' href='javascript:;' @click='settingOpen' style='color:#20a0ff;'>{{settingOpenFont}}</a>
      </el-col>
    </el-row>
    <div v-show="settingPop">
      <el-row :gutter="20">
        <el-col :span="6"><label>上传成功图片</label></el-col>
        <el-col :span="18">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :headers="headerToken"
            :show-file-list="false"
            :multiple="false"
            :auto-upload="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="absoluteImgUrl" :src="absoluteImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>标题</label>
        </el-col>
        <el-col :span="18">
          <el-input v-model="title" placeholder="请输入按钮文字"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>是否调自提接口</label>
        </el-col>
        <el-col :span="18">
          <el-radio-group v-model="isLogistics">
            <el-radio :label="1">调用</el-radio>
            <el-radio :label="2">不调用</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="isLogistics===1">
        <el-col :span="6">
          <label>营业厅自提</label>
          <a class='view' href='javascript:;' @click='viewAlert(true)' style='color:#20a0ff;display: block; padding-left: 25px;'>(查看演示)</a>
          <p style="color:#f00;font-size: 12px;">(需要显示号码的地方用 number 来代替)</p>
        </el-col>
        <el-col :span="18">
          <textEditor @textEditorContent_succ="getTextEditorHasContent" :aa="hasContent"></textEditor>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label v-if="isLogistics===1">物流配送</label>
          <label v-else>物流配送<p>(或营业厅自提)</p>
          </label>
          <a class='view' href='javascript:;' @click='viewAlert(false)' style='color:#20a0ff;display: block; padding-left: 25px;'>(查看演示)</a>
          <p style="color:#f00;font-size: 12px;">(需要显示号码的地方用 number 来代替)</p>
        </el-col>
        <el-col :span="18">
          <textEditor @textEditorContent_succ="getTextEditorNoContent" :aa="noContent"></textEditor>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>是否有定时器</label>
        </el-col>
        <el-col :span="18">
          <el-radio v-model="isTimer" label="1">无定时器</el-radio>
          <el-radio v-model="isTimer" label="2">有定时器</el-radio>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>是否有按钮</label>
        </el-col>
        <el-col :span="18">
          <el-radio v-model="isPopButton" label="1">无按钮</el-radio>
          <el-radio v-model="isPopButton" label="2">有按钮</el-radio>
        </el-col>
      </el-row>
      <div v-show="popButtonShow">
        <el-row :gutter="20">
        <el-col :span="6">
          <label>按钮文案</label>
        </el-col>
        <el-col :span="18">
          <el-input v-model="popButton" placeholder="请输入按钮文字"></el-input>
        </el-col>
      </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>按钮圆角</label></el-col>
          <el-col :span="18"><el-input v-model="popButtonRadius" type='number'></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <label>按钮跳转</label>
          </el-col>
          <el-col :span="18">
            <el-radio v-model="isJump" label="1">跳落地页</el-radio>
            <el-radio v-model="isJump" label="2">跳链接</el-radio>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="jumpUrlShow">
          <el-col :span="6">
            <label>请输入跳转链接</label>
          </el-col>
          <el-col :span="18">
            <el-input v-model="jumpUrl" placeholder="请输入按钮文字"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import deleteComponent from '../../common/common';
  import textEditor from '../common/editor';
  import {Config, ROUTES} from '../../common/api';
  export default {
    data () {
      return {
        isSpread: true,
        showColor: true,
        settingPop: false,
        settingOpenFont: '点击显示',
        serverUrl: Config.api_url + ROUTES.successUpload,
        headerToken: {'x-access-token':localStorage.getItem('token')}
      };
    },
    props: ['index'],
    mounted () {
      this.initColor();
    },
    watch: {
      isMajorColor () {
        this.initColor();
      },
      majorColor () {
        this.initColor();
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
          console.log(res);
          this.imgUrl = res.data.alertImg;
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
          this.failMsg('上传头图图片大小不能超过 50kb!');
          return false;
          // this.$message.error('上传头图图片大小不能超过 100kb!');
        }
        return (isPNG || isJPG) && isLt2M;
      },
      viewAlert(is) {  // 查看演示，显示成功弹窗
        if (is) {
          this.$store.commit('newIsFetch', true);
        } else {
          this.$store.commit('newIsFetch', false);
        }
        this.$store.commit('newShowMsgBox', true);
        this.$store.commit('newShowSuccess', true);
      },
      getTextEditorNoContent(msg) {
        this.successObj.noContent = msg;
        this.$store.commit('newSuccContent', this.successObj);
      },
      getTextEditorHasContent(msg) {
        this.successObj.hasContent = msg;
        this.$store.commit('newSuccContent', this.successObj);
      },
      initColor () {
        if (this.isMajorColor === '1') {
          this.showColor = false;
          this.obj.buttonColor = this.majorColor;
          this.button();
        } else if (this.isMajorColor === '2'){
          this.showColor = true;
          this.obj.buttonColor = '#4ca9d4';
          this.button();
        }
      },
      button () {
        let arr = this.$store.state.fill.button;
        arr.splice(0, 1, this.obj);
        this.$store.commit('newButton', arr);
      },
      deleteFun () {
        this.deleteFillComponent(this.setFillComponentsItems, this.getFillComponentsItems, this.index);
      },
      // 展开收起
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      },
      settingOpen () {
        if (this.settingPop === false) {
          this.settingPop = true;
          this.settingOpenFont = '点击隐藏';
        } else if (this.settingPop === true) {
          this.settingPop = false;
          this.settingOpenFont = '点击显示';
        }
      }
    },
    computed: {
      obj () {
        var a = {};
        a.buttonColor = this.$store.state.fill.button[0].buttonColor;
        a.buttonFont = this.$store.state.fill.button[0].buttonFont;
        a.buttonRadius = this.$store.state.fill.button[0].buttonRadius;
        a.isMajorColor = this.$store.state.fill.button[0].isMajorColor;
        return a;
      },
      button_font: {
        get () {
          return this.$store.state.fill.button[0].buttonFont;
        },
        set (msg) {
          this.obj.buttonFont = msg;
          this.button();
        }
      },
      button_radius: {
        get () {
          return this.$store.state.fill.button[0].buttonRadius;
        },
        set (msg) {
          this.obj.buttonRadius = msg;
          this.button();
        }
      },
      button_color: {
        get () {
          return this.$store.state.fill.button[0].buttonColor;
        },
        set (msg) {
          this.obj.buttonColor = msg;
          this.button();
        }
      },
      isMajorColor: {
        get () {
          return this.$store.state.fill.button[0].isMajorColor;
        },
        set (msg) {
          this.obj.isMajorColor = msg;
          this.button();
        }
      },
      successObj () {
        var a = {};
//        a.successFlag = this.$store.state.fill.succContent.successFlag;
        a.title = this.$store.state.fill.succContent.title;
        a.isLogistics = this.$store.state.fill.succContent.isLogistics;
        a.image = this.$store.state.fill.succContent.image;
        a.hasContent = this.$store.state.fill.succContent.hasContent;
        a.noContent = this.$store.state.fill.succContent.noContent;
        a.isPopButton = this.$store.state.fill.succContent.isPopButton;
        a.isTimer = this.$store.state.fill.succContent.isTimer;
        a.popButton = this.$store.state.fill.succContent.popButton;
        a.popButtonRadius = this.$store.state.fill.succContent.popButtonRadius;
        a.isJump = this.$store.state.fill.succContent.isJump;
        a.jumpUrl = this.$store.state.fill.succContent.jumpUrl;
        return a;
      },
      title: {
        get() {
          return this.$store.state.fill.succContent.title;
        },
        set(msg) {
          this.successObj.title = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      isLogistics: {
        get() {
          return this.$store.state.fill.succContent.isLogistics;
        },
        set(msg) {
          this.successObj.isLogistics = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      hasContent: {
        get() {
          return this.$store.state.fill.succContent.hasContent;
        },
        set(msg) {
          this.successObj.hasContent = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      noContent: {
        get() {
          return this.$store.state.fill.succContent.noContent;
        },
        set(msg) {
          this.successObj.noContent = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      isPopButton: {
        get() {
          return this.$store.state.fill.succContent.isPopButton;
        },
        set(msg) {
          this.successObj.isPopButton = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      popButtonShow () {
        if (this.isPopButton === '1') {
          return false;
        } else if (this.isPopButton === '2') {
          return true;
        }
      },
      isTimer: {
        get() {
          return this.$store.state.fill.succContent.isTimer;
        },
        set(msg) {
          this.successObj.isTimer = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      popButton: {
        get() {
          return this.$store.state.fill.succContent.popButton;
        },
        set(msg) {
          this.successObj.popButton = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      popButtonRadius: {
        get() {
          return this.$store.state.fill.succContent.popButtonRadius;
        },
        set(msg) {
          this.successObj.popButtonRadius = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      isJump: {
        get() {
          return this.$store.state.fill.succContent.isJump;
        },
        set(msg) {
          this.successObj.isJump = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      jumpUrl: {
        get() {
          return this.$store.state.fill.succContent.jumpUrl;
        },
        set(msg) {
          this.successObj.jumpUrl = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      jumpUrlShow () {
        if (this.isJump === '1') {
          return false;
        } else if (this.isJump === '2') {
          return true;
        }
      },
      // 相对路径
      imgUrl: {
        get () {
          return this.$store.state.fill.succContent.image;
        },
        set (msg) {
          this.successObj.image = msg;
          this.$store.commit('newSuccContent', this.successObj);
        }
      },
      // 绝对路径
      absoluteImgUrl () {
        if (this.imgUrl) {
          return Config.img_prev_url + this.imgUrl;
        } else {
          return '';
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
