<template id="topImg">
  <div class="assembly">
    <h3><i class="el-icon-edit"></i> 上传头图</h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>上传头图</label></el-col>
      <el-col :span="18">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change="ObtainImgUrl"
          :before-upload="beforeAvatarUpload">
          <img v-if="topImageUrl" :src="topImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'topImg',
    data () {
      return {
        topImageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.topImageUrl = URL.createObjectURL(file.raw);
      },
      ObtainImgUrl (file, fileList) {
        if (file.status === 'ready') {
          this.topImageUrl = URL.createObjectURL(file.raw);
          console.log(JSON.stringify(file));
        }
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    watch: {
      topImageUrl: function () {
        this.$store.commit('newTopImageUrl', this.topImageUrl);
      }
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
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 150px;
    display: block;
  }
</style>
