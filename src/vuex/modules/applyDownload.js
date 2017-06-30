const state = {
  applyDownloadTitle: '腾讯应用下载',
  /* 应用下载数组 */
  appliesList: []
};
/* {
  appliesImgUrl: 'https://h5.sinaimg.cn/upload/2017/06/01/319/tit2.png',
    appliesImgName: '',
  appliesTitle: '应用标题',
  appliesButtonText: '免流使用',
  appliesHref: 'www.10010.com'} */
const mutations = {
  /* 应用下载主标题 */
  newApplyDownloadTitle (state, msg) {
    state.applyDownloadTitle = msg;
  },
  /* 应用下载数组 */
  newApplies (state, msg) {
    state.appliesList = msg;
  }
};

export default {
  state,
  mutations
};
