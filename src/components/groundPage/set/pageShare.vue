<template id="pageButton">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 分享
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>分享类型</label></el-col>
      <el-col :span="18">
        <el-checkbox-group v-model="share_type">
          <el-checkbox :label="0">微信分享</el-checkbox>
          <el-checkbox :label="1">手厅分享</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>分享标题</label></el-col>
      <el-col :span="18"><el-input v-model="share_title" placeholder="请输入分享标题"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>分享内容</label></el-col>
      <el-col :span="18"><el-input v-model="share_desc" placeholder="请输入分享内容"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>设置分享图片</label></el-col>
      <el-col :span="18">
        <el-upload
          class="avatar-uploader"
          :action="serverUrl"
          :headers="headerToken"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :on-error="onError">
          <img v-if="share_url" :src="absoluteImgUrls" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">图片名称不能带有中文字符！只能上传jpg/png文件，且不超过50KB !
          </div>
        </el-upload>
      </el-col>
    </el-row>
    </div>
  </div>
</template>


<script>
import {scaffoldData, deleteComponent, successMsg, failMsg} from '../../common/common';
import {Config, ROUTES} from '../../common/api';
export default {
  name: "pageButton",
  data() {
    return {
      index: 10,
      isSpread: true,
      serverUrl: Config.api_url + ROUTES.btnImgUpload,
      // detailImgShow: true,
      dialogImageUrl: '',
      dialogVisible: false,
      headerToken: {'x-access-token':localStorage.getItem('token')},
    };
  },
  mounted() {
  
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.resultCode === '0000') {
        this.successMsg('上传成功');
        this.share_url = res.data.otherImg;
      } else {
        this.failMsg('上传失败');
      }
    },
    onError () {
      this.failMsg('上传失败');
    },
    handleRemove (file, fileList) {
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
    handlePreview (file) {
      this.dialogImageUrl = this.absoluteImgUrls;
      this.dialogVisible = true;
    },
    deleteFun() {
      this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
    },
    // 展开收起
    spread() {
      if (this.isSpread) {
        this.isSpread = false;
      } else {
        this.isSpread = true;
      }
    },
  },
  watch: {

  },
  computed: {
    absoluteImgUrls () {
      return Config.image_url + this.share_url;
    },
    // 按钮设置
    share_type: {
      get() {
        // console.log(this.$store.state.share.share_type)
        return this.$store.state.share.share_type;
      },
      set(value) {
        this.$store.commit('newShareType', value);
      }
    },
    share_title: {
      get() {
        return this.$store.state.share.share_title;
      },
      set(value) {
        this.$store.commit('newShareTitle', value);
      }
    },
    share_desc: {
      get() {
        return this.$store.state.share.share_desc;
      },
      set(value) {
        this.$store.commit('newShareDesc', value);
      }
    },
    share_url: {
      get() {
        return this.$store.state.share.share_url;
      },
      set(value) {
        this.$store.commit('newShareUrl', value);
      }
    },
    setComponentsItems() {
      return this.$store.state.app.setComponentsItems;
    },
    getComponentsItems() {
      return this.$store.state.app.getComponentsItems;
    }
  },
  component: {
    deleteComponent
  }
};
</script>

<style lang="scss" scoped>
</style>
