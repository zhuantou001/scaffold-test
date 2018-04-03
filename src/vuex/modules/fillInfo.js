/* 填写页 内部初始化的数据 填写过程中需要的数据 提交数据 */

const state = {
  /* Fill页面初始化返回的数据 */
  initData: [],
  /* 查询号码接口返回的数据 */
  queryNum: [],
  /* 号码解析后的手机号码数据 */
  telList: [],
  /* 选择号码的搜索内容 */
  searchContent: '',
  /* 首月计费方式 */
  firstMonthData: [],
  /* 首月计费选择数据 */
  firstMonthChooseData: [],
  /* 自提点数据 */
  selfFetchInfo: [],
  /* 从链接获取的参数 */
  obtainUrlParam: {},
  /* 从后台获取的参数 */
  obtainInterParam: {},

  /*
  * 选择号码的状态 超时、正在加载、没有号码、正常显示、号码预占中
  * 搜索图标显示(点击进行搜索操作) 搜索关闭图标显示(点击清除搜索条件)
  */
  timeOut: false,
  loading: false,
  noData: false,
  showNum: false,
  occupy: false,
  searchShow: true,
  searchClear: false,
  initNoNumber: false,
  refresh: '换一批',
  noDataContent: '',
  // 提交申请loading
  submitLoad: false

};

const mutations = {
  /* Fill页面初始化返回的数据 */
  newInitData(state, msg) {
    state.initData = msg;
  },
  /* 查询号码接口返回的数据 */
  newQueryNum(state, msg) {
    state.queryNum = msg;
  },
  /* 号码解析后的手机号码数据 */
  newTelList(state, msg) {
    state.telList = msg;
  },
  /* 选择号码的搜索内容 */
  newSearchContent(state, msg) {
    state.searchContent = msg;
  },
  /* 首月计费方式 */
  newFirstMonthData(state, msg) {
    state.firstMonthData = msg;
  },
  /* 首月计费选择数据 */
  newFirstMonthChooseData(state, msg) {
    state.firstMonthChooseData = msg;
  },
  /* 自提点数据 */
  newSelfFetchInfo(state, msg) {
    state.selfFetchInfo = msg;
  },
  /* 从链接获取的参数 */
  newObtainUrlParam(state, msg) {
    state.obtainUrlParam = msg;
  },
  /* 从后台获取的参数 */
  newObtainInterParam(state, msg) {
    state.obtainInterParam = msg;
  },
  /*
   * 选择号码的状态 超时、正在加载、没有号码、正常显示、号码预占中
   * 搜索图标显示(点击进行搜索操作) 搜索关闭图标显示(点击清除搜索条件)
   */
  newTimeOut(state, msg) {
    state.timeOut = msg;
  },
  newLoading(state, msg) {
    state.loading = msg;
  },
  newNoData(state, msg) {
    state.noData = msg;
  },
  newShowNum(state, msg) {
    state.showNum = msg;
  },
  newOccupy(state, msg) {
    state.occupy = msg;
  },
  newSearchShow(state, msg) {
    state.searchShow = msg;
  },
  newSearchClear(state, msg) {
    state.searchClear = msg;
  },
  newInitNoNumber(state, msg) {
    state.initNoNumber = msg;
  },
  newRefresh(state, msg) {
    state.refresh = msg;
  },
  newNoDataContent(state, msg) {
    state.noDataContent = msg;
  },
  newSubmitLoad (state, msg) {
    state.submitLoad = msg;
  }

};

export default {
  state,
  mutations
};
