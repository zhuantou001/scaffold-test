<template id="pageButton">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 按钮
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun"><i class="el-icon-delete"></i></a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮内联样式</label></el-col>
      <el-col :span="18">
        <el-radio-group v-model="buttonKinds">
          <el-radio :label="0">通用王卡按钮</el-radio>
          <el-radio :label="1">冰激凌王卡按钮</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮宽度</label></el-col>
      <el-col :span="5"><el-input v-model="buttonWidth" type="number" placeholder="请输入宽度"></el-input></el-col>
      <el-col :span="7"><label>按钮和左面区域的距离</label></el-col>
      <el-col :span="5"><el-input v-model="btnMarginLeft" type="number" placeholder="请输入距离"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮和上面区域的距离</label></el-col>
      <el-col :span="5"><el-input v-model="btnMarginTop" type="number" placeholder="请输入距离"></el-input></el-col>
      <el-col :span="7"><label>按钮和下面区域的距离</label></el-col>
      <el-col :span="5"><el-input v-model="btnMarginBottom" type="number" placeholder="请输入距离"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>显示效果</label></el-col>
      <el-col :span="18">
        <el-radio-group v-model="clickButton">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">置灰可以点击</el-radio>
          <el-radio :label="2">置灰不能点击</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮文字类型</label></el-col>
      <el-col :span="18">
        <el-radio-group v-model="btnFontType">
          <el-radio :label="0">正常文字</el-radio>
          <el-radio :label="1">超链接文字</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮文字</label></el-col>
      <el-col :span="18"><el-input v-model="button_font" placeholder="请输入按钮文字"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮文字大小</label></el-col>
      <el-col :span="5"><el-input v-model="button_fontSize" placeholder="请输入按钮文字大小"></el-input></el-col>
      <el-col :span="6" style="margin-left: .15rem;"><label>按钮文字颜色</label></el-col>
      <el-col :span="5"><el-input type="color" v-model="button_frontColor"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮背景类型</label></el-col>
      <el-col :span="18">
        <el-radio-group v-model="buttonBgType">
          <el-radio :label="0">纯色</el-radio>
          <el-radio :label="1">图片</el-radio>
        </el-radio-group>
      </el-col>
      <!-- <el-col :span="18"><el-input style="width:20%;" type="color" v-model="button_color"></el-input></el-col> -->
    </el-row>
    <el-row :gutter="20" v-if='buttonBgType===0'>
      <el-col :span="6"><label>设置纯色背景</label></el-col>
      <el-col :span="18"><el-input style="width:20%;" type="color" v-model="button_color"></el-input></el-col>
    </el-row>
    <el-row :gutter="20" v-if='buttonBgType===1'>
      <el-col :span="6"><label>设置图片背景</label></el-col>
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
          <img v-if="button_bg_url" :src="absoluteImgUrls" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!-- <el-button v-else size="small" type="primary">点击上传</el-button> -->
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过50KB !
          </div>
        </el-upload>
        <!-- <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮圆角大小</label></el-col>
      <el-col :span="18"><el-input type="number" v-model="button_radius"></el-input></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮跳转方式</label></el-col>
      <el-col :span="18">
        <el-radio-group v-model="buttonLinkWay">
          <el-radio :label="0">相对路径</el-radio>
          <el-radio :label="1">绝对路径(http/https)</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><label>按钮跳转链接</label></el-col>
      <el-col :span="18"><el-input v-model="buttonFillAlias" placeholder="请输入相应填写页的链接名"></el-input></el-col>
    </el-row>
    <div class="linkArea" v-if="buttonKinds == 1">
      <el-row :gutter="20">
        <el-col :span="6"><label>文字链文字</label></el-col>
        <el-col :span="18"><el-input v-model="link_Font" placeholder="请输入文字链文字"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>文字链颜色</label></el-col>
        <el-col :span="18"><el-input style="width:20%;" type="color" v-model="link_Color"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><label>文字链跳转地址</label></el-col>
        <el-col :span="18"><el-input v-model="linkAlias" placeholder="请输入相应文字链跳转地址"></el-input></el-col>
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
      obj: {
        component_id: this.index
      },
      isSpread: true,
      serverUrl: Config.api_url + ROUTES.btnImgUpload,
      // detailImgShow: true,
      dialogImageUrl: '',
      dialogVisible: false,
      headerToken: {'x-access-token':localStorage.getItem('token')},
    };
  },
  props: ["index"],
  mounted() {
    let arr = this.$store.state.button.buttons;
    let has = true;
    for (let i = 0;i < arr.length;i++) {
      if (arr[i].component_id === this.index){
        this.obj = arr[i];
        has = false;
      }
    }
    if (has) {
      arr.push(this.obj);
    }
    this.$store.commit('newButtons', arr);
    // console.log('arr',arr);
    // alert(JSON.stringify(this.obj))
    // 修改样式
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.resultCode === '0000') {
        this.successMsg('上传成功');
        this.button_bg_url = res.data.otherImg;
      } else {
        this.failMsg('上传失败');
      }
    },
    onError () {
      this.failMsg('上传失败');
    },
    handleRemove (file, fileList) {
      let i;
      const self = this;
     // console.log('移除图片')
     // console.log(this.button_bg_url)
      if (this.button_bg_url) {
        this.$ajax({
          method: 'get',
          url: this.serverUrl + '?imgPath=' + this.button_bg_url,
        }).then((res)=>{
          if (res.data.data.ret_code === '0000') {
            self.successMsg("删除成功！");
          } else {
            self.failMsg("删除失败！");
          }
        }).catch((e)=>{
           self.failMsg("服务器错误");
        })
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
    handlePreview (file) {
      this.dialogImageUrl = this.absoluteImgUrls;
      this.dialogVisible = true;
    },
    deleteFun() {
      this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index,"button", "buttons", "newButtons");
    },
    // 展开收起
    spread() {
      if (this.isSpread) {
        this.isSpread = false;
      } else {
        this.isSpread = true;
      }
    },
    buttons() {
      // 找到对应的按钮索引位置，更新数据
      let has = false;
      let arr = this.$store.state.button.buttons;
      for (let i in arr) {
        if (arr[i].component_id === this.index) {
          arr.splice(i, 1, this.obj);
          has = true;
        }
      }
      if (!has) {
        arr.push(this.obj);
      }
      // console.log("buttons method", arr);
      this.$store.commit("newButtons", arr);
    },
    commonGet(key, value) {
      let arr = this.$store.state.button.buttons;
      // console.log(arr);
      for (let i in arr) {
        if (arr[i].component_id === this.index) {
          if (arr[i][key] !== undefined) {
            return arr[i][key];
          } else {
            return value;
          }
        }
      }
    }
  },
  watch: {

  },
  computed: {
    // 按钮设置
    button_font: {
      get() {
        // return this.$store.state.button.buttons.buttonObject.buttonFont;
        // alert(this.commonGet('buttonFont','请输入按钮文字'));
        return this.commonGet("button_name", "请输入按钮文字");
      },
      set(value) {
        this.obj.button_name = value;
        this.buttons();
      }
    },
    button_fontSize: {
      get() {
        // return this.$store.state.button.buttonObject.buttonFrontColor;
        return this.commonGet("button_font_size", 16);
      },
      set(value) {
        this.obj.button_font_size = value;
        this.buttons();
      }
    },
    button_frontColor: {
      get() {
        // return this.$store.state.button.buttonObject.buttonFrontColor;
        return this.commonGet("button_front_color", "#ffffff");
      },
      set(value) {
        this.obj.button_front_color = value;
        this.buttons();
      }
    },
    buttonBgType: {
      get() {
        return this.commonGet("button_bg_type", 0);
      },
      set(value) {
        this.obj.button_bg_type = value;
        this.buttons();
      }
    },
    button_color: {
      get() {
        return this.commonGet("button_color", "#20a0ff");
      },
      set(value) {
        this.obj.button_color = value;
        this.buttons();
      }
    },
    button_bg_url: {
      get() {
        return this.commonGet("button_bg_url", "");
      },
      set(value) {
        this.obj.button_bg_url = value;
        this.buttons();
      }
    },
    absoluteImgUrls () {
      return Config.img_prev_url + this.button_bg_url;
    },
    button_radius: {
      get() {
        return this.commonGet("button_radius", "");
      },
      set(value) {
        this.obj.button_radius = value;
        this.buttons();
      }
    },
    buttonLinkWay: {
      get() {
        return this.commonGet("button_link_way", 0);
      },
      set(value) {
        this.obj.button_link_way = value;
        this.buttons();
      }
    },
    buttonFillAlias: {
      get() {
        return this.commonGet("button_fill_alias", "");
      },
      set(value) {
        this.obj.button_fill_alias = value;
        this.buttons();
      }
    },
    clickButton: {
      get() {
        return this.commonGet("clickButton", 0);
      },
      set(value) {
        this.obj.clickButton = value;
        this.buttons();
      }
    },
    btnFontType: {
      get() {
        return this.commonGet("btn_font_type", 0);
      },
      set(value) {
        this.obj.btn_font_type = value;
        this.buttons();
      }
    },
    // // 文字链设置
    link_Font: {
      get() {
        return this.commonGet("link_name", "查询订单");
      },
      set(value) {
        this.obj.link_name = value;
        this.buttons();
      }
    },
    link_Color: {
      get() {
        return this.commonGet("link_color", "#000000");
      },
      set(value) {
        this.obj.link_color = value;
        this.buttons();
      }
    },
    linkAlias: {
      get() {
        return this.commonGet("link_alias", "");
      },
      set(value) {
        this.obj.link_alias = value;
        this.buttons();
      }
    },
    // 按钮种类
    buttonKinds: {
      get() {
        return this.commonGet("button_Kinds", 0);
      },
      set(value) {
        this.obj.button_Kinds = value;
        this.buttons();
      }
    },
    // 按钮和左面区域的距离
    btnMarginLeft: {
      get() {
        return this.commonGet("btn_margin_left", 0);
      },
      set(value) {
        this.obj.btn_margin_left = value;
        this.buttons();
      }
    },
    // 按钮和上面区域的距离
    btnMarginTop: {
      get() {
        return this.commonGet("btn_margin_top", 0);
      },
      set(value) {
        this.obj.btn_margin_top = value;
        this.buttons();
      }
    },
    // 按钮和下面区域的距离
    btnMarginBottom: {
      get() {
        return this.commonGet("btn_margin_bottom", 0);
      },
      set(value) {
        this.obj.btn_margin_bottom = value;
        this.buttons();
      }
    },
    // 按钮宽度
    buttonWidth: {
      get() {
        //console.log(this.commonGet("button_Kinds", 0) === 0)
        if (this.commonGet("button_Kinds", 0) === 0) {
          return this.commonGet("button_width", 280);
        } else {
          return this.commonGet("button_width", 190);
        }
      },
      set(value) {
        this.obj.button_width = value;
        this.buttons();
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
  .avatar-uploader {
    width: 220px;
    .el-upload {
    }
  }
  .avatar {
    width: 220px;
    min-height: 50px;
    display: block;
  }
</style>
