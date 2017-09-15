/**
 *  填写页公共数据
 */

const state = {
  // 遮罩层的显隐
  showMask: false,
  showNumberFlag: false,
  showSinceFlag: false
};
const mutations = {
  newShowMask(state, msg) {
    state.showMask = msg;
  },
  newShowNumberFlag(state, msg) {
    state.showNumberFlag = msg;
  },
  newSinceFlag(state, msg) {
    state.showSinceFlag = msg;
  }
};

export default {
  state,
  mutations
};
