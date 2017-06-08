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
    /* 手机模板头图是否显示 true显示 false隐藏 */
    topImgShow: false,
    /* 头图图片地址 */
    topImgUrl: '',
    /* 页面按钮文字、颜色 */
    button_object: {buttonFont: '按钮标题', buttonColor: '#4ca9d4'},
    /* 页面文本内容、颜色、段落、超链接 */
    words_object: {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center'},
    /* 页面超文本内容、颜色、段落、超链接 */
    words_url_object: {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center', wordsUrl: ''},
    /* 选项卡 */
    switch_object: {
      switch_title01: '选项卡标题01',
      switch_title02: '选项卡标题02',
      switch_content01: '选项卡内容01',
      switch_content02: '选项卡内容02'
    },
    /* 详情图片是否显示 true显示 false隐藏 */
    detailImgShow: false,
    /* 详情图片数组 */
    detailImgFileList: [],
    /* 右侧组件显示数组 默认标题组件永远显示 */
    setComponentsItems: [{'component': 'setPageTitle', 'index': 0}],
    /* 右侧组件显示数组 */
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
    /* 手机模板头图是否显示 true显示 false隐藏 */
    newTopImgShow (state, msg) {
      state.topImgShow = msg;
    },
    /* 头图图片地址 */
    newTopImgUrl (state, msg) {
      state.topImgUrl = msg;
    },
    /* 页面按钮文字、颜色 */
    newPagebuttonObject (state, msg) {
      state.button_object = msg;
    },
    /* 页面文本内容、颜色、段落 */
    newWordsObject (state, msg) {
      state.words_object = msg;
    },
    /* 页面超文本内容、颜色、段落、超链接 */
    newWordsUrlObject (state, msg) {
      state.words_url_object = msg;
    },
    /* 选项卡 */
    newSwitchObject (state, msg) {
      state.switch_object = msg;
    },
    /* 图片详情是否显示 true显示 false隐藏 */
    newDetailImgShow (state, msg) {
      state.detailImgShow = msg;
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
