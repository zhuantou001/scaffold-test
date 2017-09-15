/* 公共方法 */
import Vue from 'vue';
import {Config, ROUTES} from '../common/api';
// import $ from 'jquery';
// 加载全部文件夹和不在文件夹内的作品 传入用户id
Vue.prototype.loadAll = function () {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const url = Config.api_url + ROUTES.queryFileList + '?operator=' + userId;
  // alert(url);
  // document.cookie = 'wang=fadfadfafadfada';
  this.loading = true;
  // $.ajax({
  //   type: 'get',
  //   dataType: 'json',
  //   url: url,
  //   headers: {
  //     'Access-Token': document.cookie
  //   },
  //   xhrFields: {
  //     withCredentials: true
  //   },
  //   crossDomain: true,
  //   success: function (res) {
  //   }
  // });

  this.$ajax({
    method: 'get',
    url: url
    // withCredentials: true
  }).then((res) => {
    if (res.data) {
      // alert(JSON.stringify(res.data.folders));
      if (res.data.folders.scaffold_index.length > 0) {
        this.folderList = res.data.folders.scaffold_index;
        this.$store.commit('newFolderList', res.data.folders.scaffold_index);
      }
      if (res.data.folders.scaffold_option.length > 0) {
        this.projectList = res.data.folders.scaffold_option;
        this.$store.commit('newProjectList', res.data.folders.scaffold_option);
      }
      if (res.data.folder_total === 0 && res.data.project_total === 0) {
        this.failMsg('暂无作品');
      }
    } else {
      this.failMsg('暂时无数据');
    }
    // 控制container显示所有文件夹页面还是显示文件夹内部页面
    this.$store.commit('newContainerShow', true);
    // 设置侧边栏选中
    this.$store.commit('newActiveState', 'work');
    console.log(res.data);
    this.loading = false;
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
    this.loading = false;
  });
};

// 加载文件夹内的作品 传入文件夹id
Vue.prototype.loadInnerProject = function (id) {
  const url = Config.api_url + ROUTES.queryCategoryFile + '?category_id=' + id;
  this.loading = true;
  this.$ajax({
    method: 'get',
    url: url
  }).then((res) => {
    if (res.data) {
      console.log(res.data.fileList);
      if (res.data.fileList.length > 0) {
        this.$store.commit('newInnerProjectList', res.data.fileList);
      } else {
        this.failMsg('文件夹内无数据');
        this.$store.commit('newInnerProjectList', []);
      }
    } else {
      this.failMsg('暂时无数据');
    }
    // 控制container显示所有文件夹页面还是显示文件夹内部页面
    this.$store.commit('newContainerShow', false);
    // 设置侧边栏选中
    this.$store.commit('newActiveState', 'a' + id);
    this.loading = false;
    console.log(res.data);
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
    this.loading = false;
  });
};

// 获取单个文件的全部数据
Vue.prototype.pageData = function (id) {
  const url = Config.api_url + ROUTES.queryPageidData + '?page_id=' + id;
  this.loading = true;
  this.$ajax({
    method: 'get',
    url: url
  }).then((res) => {
    if (res.data) {
      // console.log(res.data);
      // alert(JSON.stringify(res.data));
      this.projectData = res.data;
    } else {
      this.failMsg('暂时无数据');
    }
    this.loading = false;
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
    this.loading = false;
  });
};

