const state = {
  pageBg: {
    bgRadio: 0,
    bgColor: '#ffffff',
    bgImg: ''
  }
};

const mutations = {
  /* 选中的按钮值 */
  newPageBg (state, msg) {
    state.pageBg = msg;
  }

};

export default {
  state,
  mutations
};
