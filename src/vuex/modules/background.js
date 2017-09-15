const state = {
  radioSwitchBg: "0",
  page_color: '#ffffff',
  /* 背景模块是否显示 true显示 false隐藏 */
  pageBg: false,
  // 背景图片地址
  bgImgUrl: '',
  /* 图片名称 */
  bgImgName: ''

};

const mutations = {
  /* 选中的按钮值 */
  newSwitchBgNum (state, msg) {
    state.radioSwitchBg = msg;
  },
  newPageBg (state, msg) {
    state.pageBg = msg;
  },
  /*  */
  newPageColor (state, msg) {
    state.page_color = msg;
  },
  newImgUrl (state, imgUrl) {
    state.bgImgUrl = imgUrl;
  },
  newImgName (state, imgName) {
    state.bgImgName = imgName;
  }
};

export default {
  state,
  mutations
};
