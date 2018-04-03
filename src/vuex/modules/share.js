const state = {
  // 分享属性
  share_type: [0],
  share_title:'',
  share_desc: '',
  share_url: ''
};
const mutations = {
  newShareType (state, msg) {
    state.share_type = msg;
  },
  newShareTitle (state, msg) {
    state.share_title = msg;
  },
  newShareDesc (state, msg) {
    state.share_desc = msg;
  },
  newShareUrl (state, msg) {
    state.share_url = msg;
  }
};
export default {
  state,
  mutations
};
