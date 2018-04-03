const state = {
  /* 标题 */
  pageTitle: '落地页',
  /* 自定义链接 */
  pageUrl: '',
  // 屏幕类型
  screenType: 'vertical',
  // 横屏是否生效
  effectH: 0,
  // 控制保存时的弹框，横竖屏切换时用到
  saveShowModal: false,
  /* 页面描述 */
 // pageDescContent: 'hello scaffold',
  /* 手机模板头图是否显示 true显示 false隐藏 */
  topImgShow: false,
  /* 详情图片数组 用于往服务器上传 */
  topImgFileList: [],
  topImgName: '',
  /* 嵌码 */
  embedCode: {
    codeUrl: ''
  },
  isDisable: false
};

const mutations = {
  newIsDisable (state, msg) {
    state.isDisable = msg;
  },
  /* 标题 */
  newPageTitle (state, msg) {
    state.pageTitle = msg;
  },
  /* 自定义链接 */
  newPageUrl (state, msg) {
    state.pageUrl = msg;
  },
  // newPageDescContent (state, msg) {
  //   state.pageDescContent = msg;
  // },
  // 更新屏幕类型
  newScreenType(state, msg) {
    state.screenType = msg;
  },
  // 更新横屏是否生效
  newEffectH(state, msg) {
    state.effectH = msg;
  },
  // 更新保存时的弹出框状态
  newSaveShowModal(state, msg) {
    state.saveShowModal = msg;
  },
  /* 手机模板头图是否显示 true显示 false隐藏 */
  newTopImgShow (state, msg) {
    state.topImgShow = msg;
  },
  /* 详情图片数组 用于往服务器上传 */
  newTopImgFileList (state, msg) {
    state.topImgFileList = msg;
  },
  /* 头图图片名称 */
  newTopImgName (state, msg) {
    state.topImgName = msg;
  },
  /* 嵌码 */
  newEmbedCode (state, msg) {
    state.embedCode = msg;
  }
};

export default {
  state,
  mutations
};
