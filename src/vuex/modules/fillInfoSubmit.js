/* 填写页 内部提交数据 */

const state = {
  /* 提交表单的数据 */
  /* 初始化中获取goodsId */
  goodsId: '',
  /* 落地页传来的,从url中获取product */
  product: '',
  /* 个人信息 */
  certName: '',
  certId: '',
  contractPhone: '',
  /* 选号码归属地 */
  essProvince:'',
  essCity:'',
  number:'',
  /* 首月资费 */
  firstMonth: '',
  /* 收货地址 省份编码6位*/
  webProvince:'',
  webCity:'',
  webCounty:'',
  address:'',
  /* 自提码 */
  selfFetchCode: '',
};

const mutations = {
  /* Fill页面初始化返回的数据 */
  newGoodsId(state, msg) {
    state.goodsId = msg;
  },
  newProduct(state, msg) {
    state.product = msg;
  },
  newCertName(state, msg) {
    state.certName = msg;
  },
  newCertId(state, msg) {
    state.certId = msg;
  },
  newContractPhone(state, msg) {
    state.contractPhone = msg;
  },
  newEssProvince(state, msg) {
    state.essProvince = msg;
  },
  newEssCity(state, msg) {
    state.essCity = msg;
  },
  newNumber(state, msg) {
    state.number = msg;
  },
  newFirstMonth(state, msg) {
    state.firstMonth = msg;
  },
  newWebProvince(state, msg) {
    state.webProvince = msg;
  },
  newWebCity(state, msg) {
    state.webCity = msg;
  },
  newWebCounty(state, msg) {
    state.webCounty = msg;
  },
  newAddress(state, msg) {
    state.address = msg;
  },
  /* 自提码 */
  newSelfFetchCode(state, msg) {
    state.selfFetchCode = msg;
  }
};

export default {
  state,
  mutations
};
