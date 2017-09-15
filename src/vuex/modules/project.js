const state = {
  /* 文件夹外的我的作品 */
  projectList: [],
  /* 我的文件夹 */
  folderList: [],
  /* 每个文件夹内的作品 */
  innerProjectList: [],
  /* 侧边栏选项选中状态 传文件夹id, 默认全部作品 ID = work */
  activeState: 'work',
  /* containerShow显示文件夹还是文件夹内的文件 */
  containerShow: true
};

const mutations = {
  /* 文件夹外的我的作品 */
  newProjectList (state, msg) {
    state.projectList = msg;
  },
  /* 我的文件夹 */
  newFolderList (state, msg) {
    state.folderList = msg;
  },
  /* 每个文件夹内的作品 */
  newInnerProjectList (state, msg) {
    state.innerProjectList = msg;
  },
  /* 侧边栏选项选中状态 传文件夹id, 默认全部作品 ID = work */
  newActiveState (state, msg) {
    state.activeState = msg;
  },
  /* containerShow显示文件夹还是文件夹内的文件 */
  newContainerShow (state, msg) {
    state.containerShow = msg;
  }
};

export default {
  state,
  mutations
};
