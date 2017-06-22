const state = {
  /* 页面按钮文字、颜色 */
  buttonObject: {buttonFont: '按钮标题', buttonColor: '#4ca9d4'},
  /* 页面文本内容、颜色、段落、超链接 */
  wordsObject: {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center'},
  /* 页面超文本内容、颜色、段落、超链接 */
  descLinkObject: {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center', wordsUrl: ''},
  /* sim卡颜色 */
  simObject: {simColLA: '#ff6600', simColLB: '#ffffff', simColRA: '#cccccc', simColRB: '#ffffff'}
};

const mutations = {
  /* 页面按钮文字、颜色 */
  newPagebuttonObject (state, msg) {
    state.buttonObject = msg;
  },
  /* 页面文本内容、颜色、段落 */
  newWordsObject (state, msg) {
    state.wordsObject = msg;
  },
  /* 页面超文本内容、颜色、段落、超链接 */
  newWordsUrlObject (state, msg) {
    state.descLinkObject = msg;
  },
  /* 页面超文本内容、颜色、段落、超链接 */
  newSimObject (state, msg) {
    state.simObject = msg;
  }
};

export default {
  state,
  mutations
};
