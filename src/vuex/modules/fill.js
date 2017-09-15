/* 填写页 */

const state = {
  /* Fill右侧组件显示数组 */
  setFillComponentsItems: [{
    'component': 'setPageTitle',
    'index': 0,
    'fixed': true
  }],
  /* Fill左侧组件显示数组 */
  getFillComponentsItems: [],
  /* 页面属性数组 */
  // pageNature: [{pageTitle: '123', pageUrl: 111, pageDesc: '456'}]
  pageNature: [{
    pageTitle: '填写页',
    pageUrl: '',
    pageDesc: '',
    majorColor: '#4ca9d4'
  }],
  /* 列表数组 */
  // listTitles: [{listTitle: '123', index: 111, listRemark: '456'}]
  listTitles: [],
  /* 用户信息 */
  // personInfo: [{radioPerInfo: '1', perName: '', perCode: ''}]
  personInfo: [{
    radioPerInfo: 1
  }],
  /* 描述信息 */
  // describes: [{index: '1', describe: ''}]
  describes: [],
  /* 按钮 */
  button: [{
    buttonFont: '请输入按钮文字',
    buttonColor: '#4ca9d4'
  }],
  /* 协议 */
  protocol: [{
    protocolFlag: true,
    protocolFont: '请输入协议名称',
    protocolColor: '#4ca9d4'
  }],
  // 成功弹出框内容
  succContent: [{
    successFlag: false,
    succDes: '您好'
   //  succDes: '<p><img src="http://www.wy.com:3001\\images\\alertImage\\upload_ff0004eda9ef5fc31bf643a1a1ae18d6.png" class=""></p>'+
   //  '<p class="ql-align-center"><br/></p>'+
   //  '<p class="ql-align-center">'+
   //    '<span style="color: rgb(255, 153, 0);" class="ql-size-large">恭喜您获得唯卡</span>'+
   // ' </p>'+
   //  '<p class="ql-align-center"><br></p>'+
   //  '<p class="ql-align-center">您的号码为：'+
   //    '<span style="color: rgb(255, 153, 0);">18888888888</span>。我们将尽快为您配送，'+
   //    '<span style="color: rgb(255, 153, 0);">20天内</span>激活，如未激活，号码将被回收哦！</p>'+
   //  '<p class="ql-align-center"><br></p>'+
   //  '<p class="ql-align-center">如需了解更多信息，请关注</p>'+
   //  '<p class="ql-align-center">'+
   //    '<span style="color: rgb(255, 153, 0);">微信公众号“唯卡助手"</span>，还有更多神秘特权！</p>'+
   //  '<p class="ql-align-center"><br></p>'+
   //  '<p> 首次下载联通手机营业厅，领取'+
   //    '<span style="color: rgb(255, 153, 0);">300M</span>流量'+
   //    '<a href="http://u.10010.cn/qAa9l" target="_blank" style="color: rgb(255, 153, 0);">http://u.10010.cn/qAa9l</a>'+
   //  '</p>'
  }],
  sorryBuyContent:[{
    sorryBuyFlag: false,
    sorryBuyDes:''
  }],
  sorryCardContent:[{
    sorryCardFlag: false,
    sorryCardDes:''
  }],
  sorryWaitContent:[{
    sorryWaitFlag: false,
    sorryWaitDes:''
  }],
  sorryOvertimeContent:[{
    sorryOvertimeFlag: false,
    sorryOvertimeDes:''
  }],
  sorryTryagainContent:[{
    sorryTryagainFlag: false,
    sorryTryagainDes:''
  }],
  protocol: [{protocolFont: '请输入协议名称', protocolColor: '#4ca9d4'}],
  /* 号码归属地里的省份城市选择 */
  chooseArea: [{curProvinceCode: 110000, curProvinceName: '北京', curCityCode: '', curCityName: ''}],
  /* 收货地址里所在区域选择 */
  chooseDisArea: [{curCityCode: '', curCityName: '', curDistrictCode: '', curDistrictName: ''}],
  /* 验证错误项 */
  // isError: [{errorItem: 'certName', errorDetail: '名字写错啦!'}]
  isError: [{errorItem: '', errorDetail: ''}],
  // 手机填写页里面的填写字段
  submitFillData: {}
};

const mutations = {
  /* Fill右侧组件数组 */
  newSetFillComponentsItems(state, msg) {
    state.setFillComponentsItems = msg;
  },
  /* Fill左侧组件数组 */
  newGetFillComponentsItems(state, msg) {
    state.getFillComponentsItems = msg;
  },
  /* 页面属性数组 */
  newPageNature(state, msg) {
    state.pageNature = msg;
  },
  /* 列表数组 */
  newListTitles(state, msg) {
    state.listTitles = msg;
  },
  /* 用户信息 */
  newPersonInfo(state, msg) {
    state.personInfo = msg;
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
  newProtocolFlag(state, msg) {
    state.protocol[0].protocolFlag = msg;
  },
  // 成功弹出框
  newSuccContent(state, msg) {
    state.succContent[0].succDes = msg;
  },
   newSuccFlag(state, msg) {
    state.succContent[0].successFlag = msg;
  },
  // 各种警告框
  newSorryBuyFlag(state,msg){
    state.sorryBuyContent[0].sorryBuyFlag = msg;
  },
  newSorryCard(state,msg){
    state.sorryCardContent[0].sorryCardFlag = msg;
  },
  newSorryWait(state,msg){
    state.sorryWaitContent[0].sorryWaitFlag = msg;
  },
  newSorryOvertime(state,msg){
    state.sorryOvertimeContent[0].sorryOvertimeFlag = msg;
  },
  newSorryTryagain(state,msg){
    state.sorryTryagainContent[0].sorryTryagainFlag = msg;
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
  },
  newSubmitFillData(state, msg) {
    state.submitFillData = msg;
  }
};

export default {
  state,
  mutations
};
