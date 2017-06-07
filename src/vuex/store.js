import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 定义状态
  state: {
    /* 标题 */
    page_title: '标题',
    /* 自定义链接 */
    page_url: 'eg:tencent',
    /* 头图图片地址 */
    topImageUrl: '',
    /* 页面按钮文字 */
    button_font: '按钮标题',
    /* 页面按钮颜色 */
    buttonStyle: {buttonColor: '#4ca9d4'},
    switch_title01: '选项卡标题01',
    switch_title02: '选项卡标题02',
    switch_content01: '选项卡内容01',
    switch_content02: '选项卡内容02',
    /* 详情图片数组 */
    detailImgFileList: [],
    /* 右侧组件显示数组 默认标题组件永远显示 */
    setComponentsItems: [{'component': 'setPageTitle', 'index': 0}],
    /* 右侧组件显示数组 默认标题组件永远显示 */
    getComponentsItems: []
  },
  mutations: {
    /* 标题 */
    newPageTitle (state, msg) {
      state.page_title = msg;
    },
    /* 自定义链接 */
    newPageUrl (state, msg) {
      state.page_url = msg;
    },
    /* 头图图片地址 */
    newTopImageUrl (state, msg) {
      state.topImageUrl = msg;
    },
    /* 页面按钮文字 */
    newPagebuttonFont (state, msg) {
      state.button_font = msg;
    },
    /* 页面按钮颜色 */
    newPagebuttonColor (state, msg) {
      state.buttonStyle = msg;
    },
    /* 选项卡标题1 */
    newSwitchTitle01 (state, msg) {
      state.switch_title01 = msg;
    },
    /* 选项卡标题2 */
    newSwitchTitle02 (state, msg) {
      state.switch_title02 = msg;
    },
    /* 选项卡内容1 */
    newSwitchContent01 (state, msg) {
      state.switch_content01 = msg;
    },
    /* 选项卡内容2 */
    newSwitchContent02 (state, msg) {
      state.switch_content02 = msg;
    },
    /* 图片详情arr */
    newDetailImgFileList (state, msg) {
      state.detailImgFileList = msg;
    },
    /* 右侧组件数组 */
    newSetComponentsItems (state, msg) {
      state.setComponentsItems = msg;
    },
    /* 左侧组件数组 */
    newGetComponentsItems (state, msg) {
      state.getComponentsItems = msg;
    }
  }
});

export default store;
