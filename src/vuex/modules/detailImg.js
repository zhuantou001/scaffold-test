const state = {
  /* 详情图片是否显示 true显示 false隐藏 */
  detailImgShow: false,
  /* 详情图片数组 用于往服务器上传 */
  detailImgFileList: [],
  mapHots: [],
  // 热力图坐标
  // mapHot: [],
  // 对应热力图图片id
  // mapId: '',
  // 热力图跳转地址
  // mapUrl: '',
  // 热力图个数
  setMapNum: 0

};
const mutations = {
  /* 图片详情是否显示 true显示 false隐藏 */
  newDetailImgShow (state, msg) {
    state.detailImgShow = msg;
  },
  /* 详情图片数组 用于往服务器上传 */
  newDetailImgFileList (state, msg) {
    state.detailImgFileList = msg;
  },
  newMapHots (state, msg) {
    state.mapHots = msg;
  },
  // newMapId (state, msg) {
  //   state.mapId = msg;
  // },
  // newMapUrl (state, msg) {
  //   state.mapUrl = msg;
  // },
  newSetMapNum (state, msg) {
    state.setMapNum = msg;
  },
};

export default {
  state,
  mutations
};
