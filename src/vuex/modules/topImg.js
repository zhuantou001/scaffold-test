const state = {
  /* 标题 */
  pageTitle: '标题',
  /* 自定义链接 */
  pageUrl: 'eg:tencent',
  /* 手机模板头图是否显示 true显示 false隐藏 */
  topImgShow: false,
  /* 头图图片地址 */
  topImgUrl: ''
};

const mutations = {
  /* 标题 */
  newPageTitle (state, msg) {
    state.pageTitle = msg;
  },
  /* 自定义链接 */
  newPageUrl (state, msg) {
    state.pageUrl = msg;
  },
  /* 手机模板头图是否显示 true显示 false隐藏 */
  newTopImgShow (state, msg) {
    state.topImgShow = msg;
  },
  /* 头图图片地址 */
  newTopImgUrl (state, msg) {
    state.topImgUrl = msg;
  }
};

export default {
  state,
  mutations
};
