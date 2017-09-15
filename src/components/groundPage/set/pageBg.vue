<template id="switchBg">
  <div class="assembly" v-show='pageBg'>
    <h3>
      <i class="el-icon-edit"></i> 设置页面背景
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-radio-group v-model="radioSwitchBg">
        <el-radio :label="0">无色</el-radio>
        <el-radio :label="1">纯色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
    </el-row>
    <div class='pageBg empty' v-show='radioSwitchBg==0'>
      
    </div>
    <div class='pageBg pageColor ' v-show='radioSwitchBg==1'>
      <el-row :gutter="20">
        <el-col :span="6"><label>设置纯色背景</label></el-col>
        <el-col :span="18"><el-input style="width:40%;" type="color" v-model="page_color"></el-input></el-col>
      </el-row>
    </div>
     <div class='pageBg pagePic' v-show='radioSwitchBg==2'>
      <el-row :gutter="20">
        <el-col :span="6"><label>上传背景图</label></el-col>
        <el-col :span="18">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
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
        index: 8, // 每个组件都有的唯一标识
        serverUrl: Config.api_url + ROUTES.bgImgUpload,
        pageBg: true,
        defaultColor: {
          radioSwitchBg: parseInt(this.$store.state.background.radioSwitchBg),
          page_color: this.$store.state.background.page_color,
          pageBg: this.$store.state.background.pageBg
        }
      };
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.successMsg('上传成功');
        console.log(res);
        this.bgImgUrl = res.bgImg;
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.failMsg('上传头图图片只能是 JPG或者PNG 格式');
        }
        if (!isLt2M) {
          this.$message.error('上传头图图片大小不能超过 2MB!');
        }
        return isPNG || isJPG && isLt2M;
      },
      deleteFun () {
        // 删除背景模块预览
        this.pageBg = false;
        this.$store.commit('newPageBg', this.pageBg);
        this.radioSwitchBg = 0;
        this.page_color = '#ffffff';
        this.deleteComponent(this.setComponentsItems, '', this.index);
      }
    },
    watch: {
      pageBg: function() {
        this.$store.commit('newPageBg', this.pageBg);
      }
    },
    computed: {
      radioSwitchBg: {
        get () {
          return parseInt(this.$store.state.background.radioSwitchBg);
        },
        set (value) {
          this.$store.commit('newSwitchBgNum', value);
        }
      },
      page_color: {
        get () {
          return this.$store.state.background.page_color;
        },
        set (value) {
          this.$store.commit('newPageColor', value);
        }
      },
      bgImgUrl: {
        get () {
          return this.$store.state.background.bgImgUrl;
        },
        set (value) {
          this.$store.commit('newImgUrl', value);
        }
      },
      bgImgName: {
        get () {
          return this.$store.state.background.bgImgName;
        },
        set (value) {
          this.$store.commit('newImgName', value);
        }
      },
      // 绝对路径
      absoluteTopImgUrl () {
        if (this.bgImgUrl) {
          return Config.image_url + this.bgImgUrl;
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
