const state = {
  /* 控制作品管理container界面的显示 */
  projectList: [],
  folderList: [],
  /* 侧边栏选项选中状态 传文件夹id, 默认全部作品 ID = work */
  activeState: 'work'
};

const mutations = {
  /* 我的作品 */
  newProjectList (state, msg) {
    state.projectList = msg;
  },
  /* 我的文件夹 */
  newFolderList (state, msg) {
    state.folderList = msg;
  },
  newActiveState (state, msg) {
    state.activeState = msg;
  }
};

export default {
  state,
  mutations
};
