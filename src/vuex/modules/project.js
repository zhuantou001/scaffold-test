const state = {
  /* 文件夹外的落地页 */
  projectList: [],
  /* 文件夹外的填写页 */
  fillList: [],
  /* 我的文件夹 */
  folderList: [],
  /* 每个文件夹内的填写页 */
  innerProjectList: [],
  /* 每个文件夹内的落地页 */
  innerFillList: [],
  /* 侧边栏选项选中状态 传文件夹id, 默认全部作品 ID = work */
  activeState: 'work',
  /* containerShow显示文件夹还是文件夹内的文件 */
  containerShow: true,
  sort: false,
  showModal: false,
  searchValue: '---请选择用户---'
};

const mutations = {
  // search
  newSearchValue (state, msg) {
    state.searchValue = msg;
  },
  // 模态框显示
  newShowModal (state, msg) {
    state.showModal = msg;
  },
  // 组件排序
  newSort (state, msg) {
    state.sort = msg;
  },
  /* 文件夹外的落地页 */
  newProjectList (state, msg) {
    state.projectList = msg;
  },
  /* 文件夹外的填写页 */
  newFillList (state, msg) {
    state.fillList = msg;
  },
  /* 我的文件夹 */
  newFolderList (state, msg) {
    state.folderList = msg;
  },
  /* 每个文件夹内的落地页 */
  newInnerProjectList (state, msg) {
    state.innerProjectList = msg;
  },
  /* 每个文件夹内的填写页 */
  newInnerFillList (state, msg) {
    state.innerFillList = msg;
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
