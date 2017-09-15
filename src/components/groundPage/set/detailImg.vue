<template id="detailImg">
  <div class="assembly">
    <h3>
      <i class="el-icon-edit"></i> 详情图
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>上传详情图</label></el-col>
      <el-col :span="18">
        <el-upload
          class="upload-demo"
          :action="serverUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="absoluteDetailImgUrls"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="onError"
          list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {deleteComponent, successMsg, failMsg} from '../../common/common';
  import {Config, ROUTES} from '../../common/api';
  export default {
    name: 'detailImg',
    data () {
      return {
        index: 6,
        serverUrl: Config.api_url + ROUTES.detailImgUpload,
        detailImgShow: true,
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    mounted () {
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.successMsg('上传成功');
        let fileData = {};
        fileData.name = res.imgName;
        fileData.image_url = res.detailImg;
        this.detailImgFileList.push(fileData);
        console.log(this.detailImgFileList);
      },
      onError () {
        this.failMsg('上传失败');
      },
      handleRemove (file, fileList) {
        let i;
        for (i in this.detailImgFileList) {
          // alert(i + ' ' + file.name + ' ' + this.detailImgFileList[i].name);
          if (file.name === this.detailImgFileList[i].name) {
            this.detailImgFileList.splice(i, 1);
            this.$store.commit('newDetailImgFileList', this.detailImgFileList);
            break;
          }
        }
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
      handlePreview (file) {
        let i;
        for (i in this.absoluteDetailImgUrls) {
          if (file.name === this.absoluteDetailImgUrls[i].name) {
            this.dialogImageUrl = this.absoluteDetailImgUrls[i].url;
            this.dialogVisible = true;
            break;
          }
        }
      },
      deleteFun () {
        // 删除预览详情图
        this.detailImgShow = false;
        this.$store.commit('newDetailImgShow', this.detailImgShow);
        // 删除设置详情图
        this.deleteComponent(this.setComponentsItems, '', this.index);
      }
    },
    watch: {
      detailImgShow: function () {
        this.$store.commit('newDetailImgShow', this.detailImgShow);
      }
    },
    computed: {
      setComponentsItems () {
        return this.$store.state.app.setComponentsItems;
      },
      // 详情图链接数组
      detailImgFileList: {
        get () {
          return this.$store.state.detailImg.detailImgFileList;
        },
        set (value) {
          this.$store.commit('newDetailImgFileList', value);
        }
      },
      // 绝对路径数组
      absoluteDetailImgUrls () {
        let arr = [];
        for (let i = 0; i < this.detailImgFileList.length; i++) {
          let obj = {};
          obj.url = Config.image_url + this.detailImgFileList[i].image_url;
          obj.name = this.detailImgFileList[i].name;
          arr.push(obj);
        }
        return arr;
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

</style>
