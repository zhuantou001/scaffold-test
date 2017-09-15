<template id="topImg">
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 上传头图
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>上传头图</label></el-col>
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
    <!--<form id="testForm">-->
      <!--<input type="file" id="test">-->
      <!--<div style="width:100px; height:50px;border:1px solid #f00;" @click="testBtn">测试</div>-->
    <!--</form>-->
  </div>
</template>

<script>
  import {deleteComponent, successMsg, failMsg} from '../../common/common';
  import {Config, ROUTES} from '../../common/api';
  export default {
    name: 'topImg',
    data () {
      return {
        index: 1,
        serverUrl: Config.api_url + ROUTES.headImgUpload,
        topImgShow: true,
        currFile: '' // 获取元素input[file]的file,用于图片压缩readAsDataURL
      };
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.successMsg('上传成功');
        console.log(res);
        this.topImgUrl = res.headImg;
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
        this.topImgShow = false;
        this.$store.commit('newTopImgShow', this.topImgShow);
        this.deleteComponent(this.setComponentsItems, '', this.index);
      }
    },
    watch: {
      topImgShow: function () {
        this.$store.commit('newTopImgShow', this.topImgShow);
      }
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      // 相对路径
      topImgUrl: {
        get () {
          return this.$store.state.topImg.topImgUrl;
        },
        set (value) {
          this.$store.commit('newTopImgUrl', value);
        }
      },
      // 绝对路径
      absoluteTopImgUrl () {
        if (this.topImgUrl) {
          return Config.image_url + this.topImgUrl;
        } else {
          return '';
        }
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
