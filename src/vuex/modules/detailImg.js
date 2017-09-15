const state = {
  /* 详情图片是否显示 true显示 false隐藏 */
  detailImgShow: false,
  /* 详情图片数组 用于往服务器上传 */
  detailImgFileList: []
};
const mutations = {
  /* 图片详情是否显示 true显示 false隐藏 */
  newDetailImgShow (state, msg) {
    state.detailImgShow = msg;
  },
  /* 详情图片数组 用于往服务器上传 */
  newDetailImgFileList (state, msg) {
    state.detailImgFileList = msg;
  }
};

export default {
  state,
  mutations
};
