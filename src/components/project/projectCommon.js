/* 公共方法 */
import Vue from 'vue';
// 加载全部文件夹和不在文件夹内的作品 传入用户id
Vue.prototype.loadAll = function (userId) {
  this.$ajax({
    method: 'get',
    url: 'allList',
    data: {
      userId: userId
    }
  }).then((res) => {
    if (res.data) {
      if (res.data.folder_total > 0) {
        this.folderList = res.data.folders;
        this.$store.commit('newFolderList', res.data.folders);
      }
      if (res.data.project_total > 0) {
        this.projectList = res.data.projects;
        this.$store.commit('newProjectList', res.data.projects);
      }
      if (res.data.folder_total === 0 && res.data.project_total === 0) {
        this.failMsg('暂无作品');
      }
    } else {
      this.failMsg('暂时无数据');
    }
    // 设置侧边栏选中
    this.$store.commit('newActiveState', 'work');
    console.log(res.data);
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
  });
};

// 加载文件夹内的作品 传入文件夹id
Vue.prototype.loadProject = function (id) {
  this.$ajax({
    method: 'get',
    url: 'folderInnerList',
    data: {
      id: id
    }
  }).then((res) => {
    if (res.data) {
      if (res.data.projects.length > 0) {
        console.log(res.data.projects);
        this.$store.commit('newProjectList', res.data.projects);
        this.$store.commit('newFolderList', []);
      } else {
        this.failMsg('文件夹内无数据');
        this.$store.commit('newProjectList', []);
        this.$store.commit('newFolderList', []);
      }
    } else {
      this.failMsg('暂时无数据');
    }
    // 设置侧边栏选中
    this.$store.commit('newActiveState', id);
    console.log(res.data);
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
  });
};

// 加载所有文件夹名字 传用户id
Vue.prototype.getFolderName = function (id) {
  this.$ajax({
    method: 'get',
    url: 'allList',
    data: {
      username: 111
    }
  }).then((res) => {
    if (res.data) {
      if (res.data.folder_total > 0) {
        this.folderList = res.data.folders;
      }
    } else {
      this.failMsg('暂时无数据');
    }
    console.log(res.data);
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
  });
};
