const state = {
  /* 详情图片是否显示 true显示 false隐藏 */
  applyDownloadTitle: '腾讯应用下载',
  /* 详情图片数组 */
  appliesList: []
};
/* {
  appliesImgUrl: 'https://h5.sinaimg.cn/upload/2017/06/01/319/tit2.png',
    appliesImgName: '',
  appliesTitle: '应用标题',
  appliesButtonText: '免流使用',
  appliesHref: 'www.10010.com'} */
const mutations = {
  /* 图片详情是否显示 true显示 false隐藏 */
  newApplyDownloadTitle (state, msg) {
    state.applyDownloadTitle = msg;
  },
  /* 图片详情arr */
  newApplies (state, msg) {
    state.appliesList = msg;
  }
};

export default {
  state,
  mutations
};
