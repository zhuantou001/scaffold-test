<template>
  <div class="assembly">
    <el-row :gutter="20">
      <el-col :span="3" class="fontCenter"><label>标题</label></el-col>
      <el-col :span="6" style="margin-left: -25px;"><el-input v-model="page_title" placeholder="请输入标题"></el-input></el-col>
      <el-col :span="4" class="fontCenter" style="margin-left: 25px;"><label>跳转别名</label></el-col>
      <el-col :span="6" style="margin-left: -25px;"><el-input :disabled="isDisable" v-model="page_url" placeholder="字母、下划线、横杠、数字组成的字符串"></el-input></el-col>
      <el-col :span="5"><span style="font-size: 12px;color:#f00;">慎重!!!<br/>创建之后不能修改!!</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4" class="fontCenter"><label>屏幕类型</label></el-col>
      <el-col :span="20" style="margin-left: -25px;">
        <el-radio-group v-model="screenType" @change="onRadioChange">
          <el-radio-button label="vertical">竖屏</el-radio-button>
          <el-radio-button label="horizontal">横屏</el-radio-button>
        </el-radio-group>
        <span class="tip">(请您先保存操作再切换横竖屏!)</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="isEffectH">
      <el-col :span="5" style="font-size: 16px;color: #20a0ff;font-weight: bold;"><label>横屏是否生效</label></el-col>
      <el-col :span="19">
        <el-radio-group v-model="effectH">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <hr class="line"/>
    <h3>
      <i class="el-icon-setting"></i> 选择需要的组件<span>(绿色可多次添加, 蓝色只能添加一次)</span>
      <!-- <slot name="sortButton"></slot> -->
    </h3>
    <el-button type="primary" style="margin-right:8px;" id="groundPageButton1" @click="addComponents('setTopImg',1,'getTopImg')" icon="picture">头图</el-button>
    <el-button type="primary" id="groundPageButton2" @click="addComponents('setSwitch',2,'getSwitch');" icon="document">选项卡</el-button>
    <el-button type="primary" id="groundPageButton9" @click="addComponents('setSwitchSlide',9,'getSwitchSlide');" icon="document">选项卡图片版</el-button>
    <el-button type="primary" id="groundPageButton12" @click="addComponents('setSwitchImage',12,'getSwitchImage');" icon="document">选项卡多图版</el-button>
    <el-badge :value="setButtonNum" class="item">
      <el-button type="primary" style="background-color: #40c9b3;border-color:#40c9b3;"  @click="addComponents('setPageButton','many','getPageButton')" icon="menu">按钮</el-button>
    </el-badge>
    <el-badge :value="setWordsNum" class="item">
      <el-button style="background-color: #40c9b3;border-color: #40c9b3;" type="primary" id="groundPageButton4" @click="addComponents('setPageWords','many','getPageWords')" icon="edit">文字</el-button>
    </el-badge>
    <el-badge :value="setWordsUrlNum" class="item">
      <el-button style="background-color: #40c9b3;border-color:#40c9b3;" type="primary" id="groundPageButton5" @click="addComponents('setPageWordsUrl','many','getPageWordsUrl')" icon="edit">超文本文字</el-button>
    </el-badge>
    <el-button type="primary" style="margin-right:8px;" id="groundPageButton6" @click="addComponents('setDetailImg',6,'getDetailImg')" icon="picture">详情图</el-button>
    <el-badge :value="setMapNum" class="item">
      <el-button type="primary" style="background-color: #40c9b3;border-color:#40c9b3;"  @click="addComponents('setHeatMap','many','')" icon="menu">热力图</el-button>
    </el-badge>
    <el-button type="primary" style="margin-right:8px;" id="groundPageButton7" @click="addComponents('setApplyDownload',7,'getApplyDownload')" icon="menu">应用下载</el-button>
    <el-button type="primary" id="groundPageButton8" @click="addComponents('setPageBg',8,'')" icon="setting">页面背景</el-button>
    <el-button type="primary" id="groundPageButton10" @click="addComponents('setPageShare',10,'getPageShare')" icon="share">分享</el-button>
    <el-button type="primary" id="groundPageButton11" style="margin-right:8px;" @click="addComponents('setEmbedCode',11)" icon="document">嵌码</el-button>
    <loading :show="loading"></loading>
    <el-button type="primary" id="groundPageButton13" style="margin-right:8px;" @click="addComponents('setFloatWindow',13,'getFloatWindow')" icon="setting">浮窗</el-button>
    <el-button type="primary" id="groundPageButton15" style="margin-right:8px;" @click="addComponents('setFixedButton',15,'getFixedButton')" icon="menu">固定底部按钮</el-button>
  </div>
</template>

<script>
  import { randomId, arrayInNum } from '../common/common';
  import {Config, ROUTES} from '../common/api';
  import loading from '../loading/Loading';
  export default {
    data: function () {
      return {
        loading: false,
        topImgShow: false,
        detailImgShow: false,
        screenType: this.$store.state.topImg.screenType
      };
    },
    mounted () {
      this.setButtonNum = this.arrayInNum(this.setComponentsItems, 'setPageButton');
      this.setMapNum = this.arrayInNum(this.setComponentsItems, 'setHeatMap');
      this.setWordsNum = this.arrayInNum(this.setComponentsItems, 'setPageWords');
      this.setWordsUrlNum = this.arrayInNum(this.setComponentsItems, 'setPageWordsUrl');
    },
    methods: {
      // 横竖屏单选框切换
      onRadioChange: function (value) {
       // console.log(value);
        if (!localStorage.getItem('projectData')) {
          // console.log(this.getComponentsItems.length)
          if (this.getComponentsItems.length) {
            this.$store.commit("newSaveShowModal", true);
            this.loadAll();
          } else {
            this.$store.commit('newScreenType', value);
          }
        } else {
          let _projectData = JSON.parse(localStorage.getItem('projectData'));
          const pageData = this.scaffoldData(_projectData.category_id, _projectData.page_id);
          let updateData = {};
          updateData.scaffold_data = pageData;
          updateData.page_id = _projectData.page_id;
          // beforeAlias 用于cdn刷新
          updateData.beforeAlias = _projectData.page_alias;
          const url = Config.api_url + ROUTES.updateScaffolOption;
          this.loading = true;
          this.$ajax({
            method: 'post',
            url: url,
            data: updateData
          }).then((res) => {
            if (res.data) {
//             alert(JSON.stringify(res.data));
              if (res.data.data.ret_code === '0000') {
                this.successMsg('更新成功');
                localStorage.setItem('projectData', '');
                localStorage.setItem('projectData', JSON.stringify(pageData));
                this.$store.commit('newScreenType', value);
              } else if (res.data.data.ret_code === '5555') {
                this.failMsg(res.data.data.ret_msg);
              } else if (res.data.data.ret_code === '9999'){
                this.failMsg('更新失败');
              }
            }
            this.obtainData(JSON.parse(localStorage.getItem('projectData')));
//          console.log(res.data);
          //  this.showModal = false;
            this.loading = false;
            // 存储this.$store.state.app.setComponentsItems里组件的index值
            const arr = [];
            for (let i = 0; i < this.$store.state.app.setComponentsItems.length; i++) {
              arr[i] = this.$store.state.app.setComponentsItems[i].index;
            }
            // 不是可多次添加按钮的index数组
            const idArr = [1,2,6,7,8,9,10,11,12,13];
            // 切换横竖屏时判断按钮是否要置灰
            for (let i = 0; i < idArr.length; i++) {
              const dom = document.getElementById('groundPageButton' + idArr[i]);
              if (this.isInArray(arr,idArr[i])) {
                dom.classList.add('is-disabled');
              } else {
                dom.classList.remove('is-disabled');
              }
            }
          }).catch((err) => {
            console.log(err);
            this.failMsg('服务器错误');
           // this.$store.commit('newScreenType', value);
            this.obtainData(JSON.parse(localStorage.getItem('projectData')));
            this.loading = false;
            // 存储this.$store.state.app.setComponentsItems里组件的index值
            const arr = [];
            for (let i = 0; i < this.$store.state.app.setComponentsItems.length; i++) {
              arr[i] = this.$store.state.app.setComponentsItems[i].index;
            }
            // 不是可多次添加按钮的index数组
            const idArr = [1,2,6,7,8,9,10,11,12,13];
            // 切换横竖屏时判断按钮是否要置灰
            for (let i = 0; i < idArr.length; i++) {
              const dom = document.getElementById('groundPageButton' + idArr[i]);
              if (this.isInArray(arr,idArr[i])) {
                dom.classList.add('is-disabled');
              } else {
                dom.classList.remove('is-disabled');
              }
            }
          });
        }
      },
      addComponents: function (setcomponent, index, getcomponent) {
        // 模块可以添加多次
        if (index === 'many') {
          index = this.randomId();
        }
        /* 添加到设置页面 */
        if (setcomponent) {
          if (this.setComponentsItems.length) {
            let i;
            for (i in this.setComponentsItems) {
              if (index === this.setComponentsItems[i].index) {
                return false;
              }
            }
            this.setComponentsItems.push({
              component: setcomponent,
              index: index
            });

          } else {
            this.setComponentsItems.push({
              component: setcomponent,
              index: index
            });
          }

          switch (setcomponent) {
            case 'setPageWords':
              this.setWordsNum = this.arrayInNum(this.setComponentsItems, 'setPageWords');
              break;
            case 'setPageWordsUrl':
              this.setWordsUrlNum = this.arrayInNum(this.setComponentsItems, 'setPageWordsUrl');
              break;
            case 'setPageButton':
              this.setButtonNum = this.arrayInNum(this.setComponentsItems, 'setPageButton');
              break;
            case 'setHeatMap':
              this.setMapNum = this.arrayInNum(this.setComponentsItems, 'setHeatMap');
              break;
          }
          let domId = document.getElementById('groundPageButton' + index);
          if (domId)
            domId.classList.add('is-disabled');
        }
        /* 添加到预览模板页面 */
        if (getcomponent) {
          if (getcomponent === 'getPageBg') {
            this.$store.commit('newPageBgShow', true);
            return false;
          }
          /* 头图和详情图单独处理 */
          if (this.getComponentsItems.length) {
            let i;
            for (i in this.getComponentsItems) {
              // alert(index + '   ' + this.getComponentsItems[i].index);
              if (index === this.getComponentsItems[i].index) {
                return false;
              }
            }
            this.getComponentsItems.push({
              component: getcomponent,
              index: index
            });
          } else {
            this.getComponentsItems.push({
              component: getcomponent,
              index: index
            });
          }
//           console.log('getComponentsItems: ' + JSON.stringify(this.getComponentsItems));
        }
      }
    },
    components: {
      loading
    },
    watch: {
      topImgShow: function () {
        this.$store.commit('newTopImgShow', this.topImgShow);
      },
      detailImgShow: function () {
        this.$store.commit('newDetailImgShow', this.detailImgShow);
      }
    },
    computed: {
      isDisable () {
        return this.$store.state.topImg.isDisable;
      },
      isEffectH: function () {
        return this.$store.state.topImg.screenType === 'horizontal';
      },
      effectH: {
        get() {
          return this.$store.state.topImg.effectH;
        },
        set(value) {
          this.$store.commit('newEffectH', value);
        }
      },
      page_title: {
        get () {
          return this.$store.state.topImg.pageTitle;
        },
        set (value) {
          this.$store.commit('newPageTitle', value);
        }
      },
      page_url: {
        get () {
          return this.$store.state.topImg.pageUrl;
        },
        set (value) {
          this.$store.commit('newPageUrl', value);
        }
      },
//      screenType: {
//        get () {
//          return this.$store.state.topImg.screenType;
//        },
//        set (value) {
//          this.$store.commit('newScreenType', value);
//        }
//      },
      setComponentsItems: {
        get () {
          return this.$store.state.app.setComponentsItems;
        },
        set (value) {
          this.$store.commit('newSetComponentsItems', value);
        }
      },
      getComponentsItems: {
        get () {
          return this.$store.state.app.getComponentsItems;
        },
        set (value) {
          this.$store.commit('newGetComponentsItems', value);
        }
      },
      setButtonNum: {
        get () {
          // alert(this.$store.state.button.setButtonNum);
          return this.$store.state.button.setButtonNum;
        },
        set (value) {
          this.$store.commit('newSetButtonNum', value);
        }
      },
      setMapNum: {
        get () {
          // alert(this.$store.state.detailImg.setMapNum);
          return this.$store.state.detailImg.setMapNum;
        },
        set (value) {
          this.$store.commit('newSetMapNum', value);
        }
      },
      setWordsNum: {
        get () {
          return this.$store.state.button.setWordsNum;
        },
        set (value) {
          this.$store.commit('newSetWordsNum', value);
        }
      },
      setWordsUrlNum: {
        get () {
          return this.$store.state.button.setWordsUrlNum;
        },
        set (value) {
          this.$store.commit('newSetWordsUrlNum', value);
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .fontCenter {
    margin-top: 6px;
    font-size: 16px;
    color: #20a0ff;
    font-weight: bold;
  }
  .line {
    border: none;
    height: 1px;
    background-color: #a4a9b0;
    margin-top: -7px;
  }
  .tip {
    font-size: 16px;
    font-weight: normal;
    color:#0b97c4;
  }
  h3>span{
    font-size: 16px;
    font-weight: normal;
    color:#0b97c4;
  }
  button{
    padding:10px;
  }
  .el-button+.el-button{
    margin:0 8px 10px 0;
  }
  .item {
    margin-right: 8px;
  }
  .sort-button{
    float:right;
    margin:-5px 0 0 0;
    &:focus{
       color: #1f2d3d;
       border: 1px solid #c4c4c4;
     }
    &:hover{
       color: #1f2d3d;
       border: 1px solid #c4c4c4;
     }
  }
</style>
