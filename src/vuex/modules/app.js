import { SYNC_TOAST_STATE } from '../mutation-types';

// init state
const state = {
  /* 右侧组件显示数组 默认标题组件永远显示 */
  setComponentsItems: [{'component': 'setPageTitle', 'index': 0}],
  /* 右侧组件显示数组 */
  getComponentsItems: [],
  showLoading: false,
  loadingLabel: '加载中...',
  showToast: false,
  toastLabel: '操作成功'
};

const mutations = {
  /* 右侧组件数组 */
  newSetComponentsItems (state, msg) {
    state.setComponentsItems = msg;
  },
  /* 左侧组件数组 */
  newGetComponentsItems (state, msg) {
    state.getComponentsItems = msg;
  },
  [SYNC_TOAST_STATE] (state, {showToast, toastLabel}) {
    state.showToast = showToast;
    state.toastLabel = toastLabel;
  }
};

export default {
  state,
  mutations
};
