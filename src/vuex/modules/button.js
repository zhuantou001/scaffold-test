const state = {
  /* 按钮种类 */
  buttonKinds: 0,
  /* 按钮上下移动范围 */
  moveRange: 0,
  /* 页面按钮文字、颜色 */
  buttonObject: {
    buttonFont: '请输入按钮文字',
    buttonColor: '#4ca9d4',
    buttonFrontColor: '#ffffff',
    buttonLinkWay: 0,
    buttonFillAlias: '',
    clickButton: 0,
    buttonRadius: 0
  },
  /* 文字链配置：文字、颜色、链接地址，*/
  linkObject:{
    linkFont: '请输入文字链文字',
    linkColor: '#4ca9d4',
    linkAlias: '',
  },
  /* 页面文本内容、颜色、段落、超链接 */
  // wordsObject: {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center'},
  // wordsArr: [{index: '', wordsContent: '文本内容'}],
  wordsArr: [],
  /* 页面超文本内容、颜色、段落、超链接 */
  // wordsUrlArr: [{index: '', wordsContent: '超文本内容', wordsUrl: ''}]
  wordsUrlArr: [],
  /* sim卡颜色 */
  simObject: {
    simColLA: '#ff6600',
    simColLB: '#ffffff',
    simColRA: '#cccccc',
    simColRB: '#ffffff'
  },
  // 按钮模块数量
  setButtonNum: 0,
  // buttons:[{index: '', buttonFont: '请输入按钮文字',buttonColor: '#4ca9d4',buttonFrontColor: '#ffffff',buttonLinkWay: 0,buttonFillAlias: '',clickButton: 0,buttonRadius: 0}]
  buttons: [],
  // 添加的文字数量
  setWordsNum: 0,
  // 添加的超文本文字数量
  setWordsUrlNum: 0,
  /* fixedButton 模块设置 */
  /* {buttonFont: '请输入按钮文字', buttonColor:'#4ca9d4',
  buttonFrontSize: 14, buttonFontColor: '#fff',
  buttonLinkWay: 0, buttonFillAlias: ''} */
  /* {menuFont: '请输入按钮文字', menuColor:'#4ca9d4',
   menuFrontSize: 14, menuFontColor: '#fff',
   } */
  fixedButton: {
    menu: [],
    button: [],
    application: 0,
    userAgent: ''
  }
};

const mutations = {
  /* 按钮种类 */
  newButtonKinds(state, msg) {
    state.buttonKinds = msg;
  },
  /* 按钮块上下移动范围 */
  newMoveRange(state, msg) {
    state.moveRange = msg;
  },
  /* 页面按钮文字、颜色 */
  newPagebuttonObject(state, msg) {
    state.buttonObject = msg;
  },
  /* 文字链文字、颜色 */
  newLinkObject(state, msg) {
    state.linkObject = msg;
  },
  // 页面文字内容
  newWordsArr(state, msg) {
    state.wordsArr = msg;
  },
  // 页面超文本内容
  newWordsUrlArr(state, msg) {
    state.wordsUrlArr = msg;
  },
  /* 页面超文本内容、颜色、段落、超链接 */
  newSimObject(state, msg) {
    state.simObject = msg;
  },
  newSetButtonNum(state, msg) {
    state.setButtonNum  = msg;
  },
  newButtons (state, msg) {
    state.buttons = msg;
  },
  // 改变添加的文字数量
  newSetWordsNum(state, msg) {
    state.setWordsNum = msg;
  },
  // 改变添加的超文本文字数量
  newSetWordsUrlNum(state, msg) {
    state.setWordsUrlNum = msg;
  },
  /* fixedButton 模块设置 */
  newFixedButton(state, msg) {
    state.fixedButton = msg;
  },
};

export default {
  state,
  mutations
};
