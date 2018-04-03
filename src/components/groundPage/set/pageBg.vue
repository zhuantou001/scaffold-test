<template id="switchBg">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 设置页面背景
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-radio-group v-model="bgRadio">
        <el-radio :label="0">无色</el-radio>
        <el-radio :label="1">纯色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
    </el-row>
    <div class='pageBg empty' v-show='bgRadio==0'>

    </div>
    <div class='pageBg pageColor' v-show='bgRadio==1'>
      <el-row :gutter="20">
        <el-col :span="6"><label>设置纯色背景</label></el-col>
        <el-col :span="18"><el-input style="width:40%;" type="color" v-model="bgColor"></el-input></el-col>
      </el-row>
    </div>
     <div class='pageBg pagePic' v-show='bgRadio==2'>
      <el-row :gutter="20">
        <el-col :span="6"><label>上传背景图</label></el-col>
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
            <img v-if="absoluteTopImgUrl" :src="absoluteTopImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {deleteComponent, successMsg, failMsg} from '../../common/common';
  import {Config, ROUTES} from '../../common/api';
  export default {
    data () {
      return {
        isSpread: true,
        index: 8, // 每个组件都有的唯一标识
        serverUrl: Config.api_url + ROUTES.bgImgUpload,
        headerToken: {'x-access-token':localStorage.getItem('token')}
      };
    },
    methods: {
      handleAvatarSuccess (res, file) {
        if (res.resultCode === '0000') {
          this.successMsg('上传成功');
          console.log(res);
          this.bgImg = res.data.bgImg;
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
      deleteFun () {
        // 删除背景模块预览
        const arrReset = {bgRadio: 0, bgColor: '#ffffff', bgImg: ''};
        this.$store.commit('newPageBg', arrReset);
        this.deleteComponent(this.setComponentsItems, '', this.index);
      },
      // 展开收起
      spread () {
        if (this.isSpread) {
          this.isSpread = false;
        } else {
          this.isSpread = true;
        }
      },
      pageBg () {
        this.$store.commit('newPageBg', this.obj);
      },
    },
    watch: {

    },
    computed: {
      obj () {
        var a = {};
        a.bgRadio = this.$store.state.background.pageBg.bgRadio;
        a.bgColor = this.$store.state.background.pageBg.bgColor;
        a.bgImg = this.$store.state.background.pageBg.bgImg;
        return a;
      },
      bgRadio: {
        get () {
          return this.$store.state.background.pageBg.bgRadio;
        },
        set (msg) {
          this.obj.bgRadio = msg;
          this.pageBg();
        }
      },
      bgColor: {
        get () {
          return this.$store.state.background.pageBg.bgColor;
        },
        set (msg) {
          this.obj.bgColor = msg;
          this.pageBg();
        }
      },
      bgImg: {
        get () {
          return this.$store.state.background.pageBg.bgImg;
        },
        set (msg) {
          this.obj.bgImg = msg;
          this.pageBg();
        }
      },
      // 绝对路径
      absoluteTopImgUrl () {
        if (this.bgImg) {
          return Config.img_prev_url + this.bgImg;
        } else {
          return '';
        }
      },
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      }
    },
    component: {
      deleteComponent,
      successMsg,
      failMsg
    }
  };
  </script>

<style>
.hide{
  display:none;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 150px !important;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 150px;
    display: block;
  }
</style>
