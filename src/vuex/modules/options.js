const state = {
  /* 选项卡 */
  switch_num: '2', // 选项卡数量
  options: {
    switch_title01: '选项卡标题01',
    switch_title02: '选项卡标题02',
    switch_title03: '选项卡标题03',
    switch_content01: '选项卡内容01',
    switch_content02: '选项卡内容02',
    switch_content03: '选项卡内容03'
  }
};

const mutations = {
  /* 选项卡 */
  newSwitchNum (state, msg) {
    state.switch_num = msg;
  },
  newSwitchObject (state, msg) {
    state.options = msg;
  }
};

export default {
  state,
  mutations
};
