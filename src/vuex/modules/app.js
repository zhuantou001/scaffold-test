import { SYNC_TOAST_STATE } from '../mutation-types';

// init state
const state = {
  user: {},
  /* 右侧组件显示数组 默认标题组件永远显示 */
  setComponentsItems: [{'component': 'setPageTitle', 'index': 0, 'fixed': true}],
 // setComponentsItems: [],
  /* 左侧组件显示数组 */
  getComponentsItems: [],
  showLoading: false,
  loadingLabel: '加载中...',
  showToast: false,
  toastLabel: '操作成功',
  /* 禁止浏览器回退 (个人觉得没啥卵用,但是教程里有,先留着) */
  forbidHistory: false,
  // 获取的页面数据
  pageData: {},
  /* 咨询导图 以及衍生的悬浮框*/
  consult: [{
    consultFont: '在线咨询',
    consultColor: '#118ee9',
    isMajorColor: '1',
    right: '35px',
    top: '5px',
    hrefUrl: '',
    width: '',
    height: '',
    radius: ''
  }],
};

const mutations = {
  /* 用户信息 */
  newUser (state, msg) {
    state.user = msg;
  },
  /* 禁止浏览器回退 */
  newForbidHistory (state, msg) {
    state.forbidHistory = msg;
  },
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
  },
  // 更新页面数据
  newPageData (state, msg) {
    state.pageData = msg;
  },
  newConsult(state, msg) {
    state.consult = msg;
  },
};

export default {
  state,
  mutations
};
