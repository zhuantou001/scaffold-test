<template id="detailImg">
  <div class="assembly">
    <h3><i class="el-icon-edit"></i> 详情图</h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>上传详情图</label></el-col>
      <el-col :span="18">
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="detailImgFileList"
          :on-change="ObtainImgUrl"
          list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'detailImg',
    data () {
      return {
        detailImgFileList: []
      };
    },
    methods: {
      handleRemove (file, fileList) {
        // alert(JSON.stringify(file));
        console.log(file, fileList);
        let i;
        for (i in this.detailImgFileList) {
          // alert(i + ' ' + file.name + ' ' + this.detailImgFileList[i].name);
          if (file.name === this.detailImgFileList[i].name) {
            this.detailImgFileList.splice(i, 1);
            break;
          }
        }
      },
      handlePreview (file) {
        console.log(file);
      },
      ObtainImgUrl (file, fileList) {
        console.log(JSON.stringify(file));
        let fileData = {};
        fileData.name = file.name;
        fileData.url = file.url;
        this.detailImgFileList.push(fileData);
        console.log(JSON.stringify(fileList));
      }
    },
    watch: {
      detailImgFileList: function () {
        this.$store.commit('newDetailImgFileList', this.detailImgFileList);
      }
    }
  };

</script>

<style>

</style>
