const state = {
  /* 选项卡 */
  switch_num: '2', // 选项卡数量
  tabDefSwitch: 1, // 文字选项卡默认选中
  options: {
    switch_title01: '选项卡标题01',
    switch_title02: '选项卡标题02',
    switch_title03: '选项卡标题03',
    switch_productId01: 'product01',
    switch_productId02: 'product02',
    switch_productId03: 'product03',
    switch_content01: '选项卡内容01',
    switch_content02: '选项卡内容02',
    switch_content03: '选项卡内容03',
    switch_scale01: 0.9,
    switch_scale02: 0.9,
    switch_scale03: 0.9
  },
  // 选项卡背景颜色
  setBorderColor: '#cccccc',
  // 选项卡边框颜色
  setBackgroundColor: '#ffffff',
  setCheckBgColor:　'#ffffff',
  // 落地页链接里的参数
  urlParam: '',
  // 文字选项卡里的上移下移
  setPosition: 0,
  // 新增的选项卡switchSlide
  switchSlide: {
    radioSwitch: 1, switchShowStyleTwo: 1, switchShowStyle: 1,
    defSwitch: 1, radioBackground: 1, tabBackgroundColor: '#ffffff',
    isCheckedFont: 1, checkedFont: '已选', checkedBackgroundColor: '#4ca9d4',
    checkedFontColor: '#ffffff', productPosition: 0,
    switchImg: [{id: 1, image: '', productId: '', productName: ''}]},
  // 新增的选项卡switchImage
  switchImage: {
    switchNum: 3, defSwitch: 1,
    setDotColor: '#555555',
    productPosition: 0,
    switchImg: [{id: 1, image: '', productId: '', productName: ''}]},
  // 产品参数key值
  productKey: 'product'
};

const mutations = {
  /* 选项卡 */
  newSwitchNum (state, msg) {
    state.switch_num = msg;
  },
  newTabDefSwitch (state, msg) {
    state.tabDefSwitch = msg;
  },
  newSwitchObject (state, msg) {
    state.options = msg;
  },
  newSetBorderColor (state, msg) {
    state.setBorderColor = msg;
  },
  newSetBackgroundColor (state, msg) {
    state.setBackgroundColor = msg;
  },
  newSetCheckBgColor (state, msg) {
    state.setCheckBgColor = msg;
  },
  newUrlParam (state, msg) {
    state.urlParam = msg;
  },
  // 文字选项卡里的上移下移
  newSetPosition (state, msg) {
    state.setPosition = msg;
  },
  // 新增的选项卡switchSlide
  newSwitchSlide (state, msg) {
    state.switchSlide = msg;
  },
  // 新增的选项卡switchImage
  newSwitchImage (state, msg) {
    state.switchImage = msg;
  },
  // 产品参数key值
  newProductKey (state, msg) {
    state.productKey = msg;
  }

};

export default {
  state,
  mutations
};
