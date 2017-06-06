import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 定义状态
  state: {
    page_title: '标题',
    topImageUrl: '',
    switch_title01: '选项卡标题01',
    switch_title02: '选项卡标题02',
    switch_content01: '选项卡内容01',
    switch_content02: '选项卡内容02',
    detailImgFileList: ''
  },
  mutations: {
    newPageTitle (state, msg) {
      state.page_title = msg;
    },
    newTopImageUrl (state, msg) {
      state.topImageUrl = msg;
    },
    newSwitchTitle01 (state, msg) {
      state.switch_title01 = msg;
    },
    newSwitchTitle02 (state, msg) {
      state.switch_title02 = msg;
    },
    newSwitchContent01 (state, msg) {
      state.switch_content01 = msg;
    },
    newSwitchContent02 (state, msg) {
      state.switch_content02 = msg;
    },
    newDetailImgFileList (state, msg) {
      /* 图片详情arr */
      state.detailImgFileList = msg;
    }
  }
});

export default store;
