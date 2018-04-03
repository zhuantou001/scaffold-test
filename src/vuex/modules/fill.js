/* 填写页 创建填写页样式时需要的数据 */

const state = {
  /* Fill body是否禁止滚动 */
  isScroll: false,
  /* Fill右侧组件显示数组 */
  setFillComponentsItems: [{
    'component': 'setPageTitle',
    'index': 0,
    'fixed': true
  }],
  /* Fill左侧组件显示数组 */
  getFillComponentsItems: [],
  /* 添加的描述数量 */
  setDescribeNum: 0,
  /* 页面属性数组 */
  // pageNature: [{pageTitle: '123', pageUrl: 111, pageDesc: '456'}]
  pageNature: [{
    pageTitle: '资料填写',
    pageUrl: '',
    pageDesc: '',
    majorColor: '#666',
    initUrl: '',
    submitUrl: '',
    submitField: ''
  }],
  /* 列表数组 */
  // listTitles: [{listTitle: '123', index: 111, listRemark: '456'}]
  listTitles: [],
  /* 用户信息模块 */
  // personInfo: [{radioPerInfo: '1', perName: '', perCode: ''}]
  personInfo: {
    radioPerInfo: 1,
    moduleTitle: '个人信息',
    moduleTitleShow: 1,
    moduleDesc: '',
    isCardLi: 1
  },
  /* 选择手机号码模块 */
  chooseTel: {
    moduleTitle: '选择手机号',
    moduleTitleShow: 1,
    occupyFlag: 1,
    moduleDesc: '',
    optFlag: 2
  },
  /* 收货地址信息模块 */
  deliveryAddress: {
    moduleTitleShow: 1,
    moduleTitle: '收货地址信息',
    moduleDesc: '',
    listTitle: '所在地区'
  },
  kingBroad: {
    radioPerInfo: 1
  },
  /* 首月资费信息模块 */
  firstMonth: {
    moduleTitle: '首月资费',
    moduleDesc: ''
  },
  /* 描述信息模块 */
  // describes: [{index: '1', describe: ''}]
  describes: [],
  /* 按钮 */
  button: [{
    buttonFont: '请输入按钮文字',
    buttonColor: '#4ca9d4',
    buttonRadius: 0,
    isMajorColor: '1'
  }],
  // 提交成功后弹框是否显示
  showMsgBox: false,
  // 提交成功弹框内容是否显示
  showSuccess: false,
  // 提交失败弹框内容是否显示
  showFail: false,
  // 失败弹框的内容
  showFailBoxContent: '',
  // 成功弹框的内容
  succContent: {
    title: '恭喜您获得XX卡', isLogistics: 1, image: '', hasContent: '',
    noContent: '', isPopButton: '1', isTimer: '1', popButton: '我知道了', popButtonRadius: 0,
    isJump: '1', jumpUrl: ''
  },
  // 是否是自提
  isFetch: true,
  // 协议弹框是否显示
  showProtocolBox: false,
  // 协议
  protocol: [{
    protocolFont: '请输入协议名称', protocolColor: '#4ca9d4',
    isMajorColor: '1', protocolContent: '',
    isProtocolUrl: '1', protocolUrl: '',activityType: ''
  }],
  /* 判断协议是否选中 */
  isCheck: true,
  /* 号码归属地里的省份城市选择 */
  chooseArea: [{curProvinceCode: '', curProvinceName: '', curCityCode: '', curCityName: ''}],
  /* 收货地址里所在区域选择 */
  chooseDisArea: [{curProvinceCode: '', curProvinceName: '', curCityCode: '', curCityName: '', curDistrictCode: '', curDistrictName: ''}],
  /* 验证错误项 */
  // isError: [{errorItem: 'certName', errorDetail: '名字写错啦!'}]
  isError: [{errorItem: '', errorDetail: ''}]

};

const mutations = {
  /* Fill body是否禁止滚动 */
  newIsScroll(state, msg) {
    state.isScroll = msg;
  },
  /* Fill右侧组件数组 */
  newSetFillComponentsItems(state, msg) {
    state.setFillComponentsItems = msg;
  },
  /* Fill左侧组件数组 */
  newGetFillComponentsItems(state, msg) {
    state.getFillComponentsItems = msg;
  },
  /* 添加的描述数量 */
  newSetDescribeNum(state, msg) {
    state.setDescribeNum = msg;
  },
  /* 页面属性数组 */
  newPageNature(state, msg) {
    state.pageNature = msg;
  },
  /* 列表数组 */
  newListTitles(state, msg) {
    state.listTitles = msg;
  },
  /* 用户信息模块 */
  newPersonInfo(state, msg) {
    state.personInfo = msg;
  },
  /* 选择手机号模块 */
  newChooseTel(state, msg) {
    state.chooseTel = msg;
  },
  /* 是否调用occupy接口 */
  newOccupyFlag(state, msg) {
    state.occupyFlag = msg;
  },
  /* 收货地址信息模块 */
  newDeliveryAddress(state, msg) {
    state.deliveryAddress = msg;
  },
  newKingBroad(state, msg) {
    state.kingBroad = msg;
  },
  /* 首月资费信息模块 */
  newFirstMonth(state, msg) {
    state.firstMonth = msg;
  },
  /* 描述信息 */
  newDescribes(state, msg) {
    state.describes = msg;
  },
  /* 按钮 */
  newButton(state, msg) {
    state.button = msg;
  },
  /* 协议 */
  newProtocol(state, msg) {
    state.protocol = msg;
  },
  newProtocolUrlContent(state, msg) {
    state.protocol[0].protocolUrlContent = msg;
  },
  newShowProtocolBox(state, msg) {
    state.showProtocolBox = msg;
  },
  newIsCheck(state, msg) {
    state.isCheck = msg;
  },
  // 提交成功后弹框是否显示
  newShowMsgBox(state, msg) {
    state.showMsgBox = msg;
  },
  // 成功弹框内容是否显示
  newShowSuccess(state, msg) {
    state.showSuccess = msg;
  },
  // 提交失败弹框内容是否显示
  newShowFail(state, msg) {
    state.showFail = msg;
  },
  // 失败弹框的内容
  newShowFailBoxContent(state, msg) {
    state.showFailBoxContent = msg;
  },
  newSuccContent(state, msg) {
  state.succContent = msg;
  },
  newIsFetch(state, msg) {
    state.isFetch = msg;
  },
  /* 号码归属地里的省份城市选择 */
  newChooseArea (state, msg) {
    state.chooseArea = msg;
  },
  /* 收货地址里所在区域选择 */
  newChooseDisArea (state, msg) {
    state.chooseDisArea = msg;
  },
  /* 验证错误项 */
  newIsError (state, msg) {
    state.isError = msg;
  }
};

export default {
  state,
  mutations
};
