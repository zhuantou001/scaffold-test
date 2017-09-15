const state = {
  /* 标题 */
  pageTitle: '落地页',
  /* 自定义链接 */
  pageUrl: '',
  /* 自定义链接 */
  pageDescContent: 'hello scaffold',
  /* 手机模板头图是否显示 true显示 false隐藏 */
  topImgShow: false,
  /* 头图图片地址 */
  topImgUrl: '',
  topImgName: ''
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
  newPageDescContent (state, msg) {
    state.pageDescContent = msg;
  },
  /* 手机模板头图是否显示 true显示 false隐藏 */
  newTopImgShow (state, msg) {
    state.topImgShow = msg;
  },
  /* 头图图片地址 */
  newTopImgUrl (state, msg) {
    state.topImgUrl = msg;
  },
  /* 头图图片地址 */
  newTopImgName (state, msg) {
    state.topImgName = msg;
  }
};

export default {
  state,
  mutations
};
