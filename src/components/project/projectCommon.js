/* 公共方法 */
import Vue from 'vue';
import {Config, ROUTES} from '../common/api';
// import $ from 'jquery';
// 加载全部文件夹和不在文件夹内的落地页和填写页 传入用户id
Vue.prototype.loadAll = function (userId) {
  if (!userId) {
    userId = JSON.parse(localStorage.getItem('user')).id;
  }
  const url = Config.api_url + ROUTES.queryFileList + '?operator=' + userId;
  // alert(url);
  this.loading = true;
  this.$ajax({
    method: 'get',
    url: url
    // withCredentials: true
  }).then((res) => {
    if (res.data.resultCode === '0000') {
      // alert(JSON.stringify(res.data.data));
      const v = res.data.data;
      // 文件夹
      // if (v.folders_list.length > 0) {
        this.$store.commit('newFolderList', v.folders_list);
      // }
      // 落地页
      // if (v.scaffold_list.length > 0) {
        this.$store.commit('newProjectList', v.scaffold_list);
      // }
      // 填写页
      // if (v.fill_list.length > 0) {
        this.$store.commit('newFillList', v.fill_list);
      // }
      if (v.scaffold_list.length === 0 && v.fill_list.length === 0 && v.folders_list.length === 0) {
        this.failMsg('暂无作品');
      }
    } else if (res.data.resultCode === '9999') {
      this.failMsg('暂时无数据');
    }
    // 控制container显示所有文件夹页面还是显示文件夹内部页面
    this.$store.commit('newContainerShow', true);
    // 设置侧边栏选中
    this.$store.commit('newActiveState', 'work');
    // console.log(res.data);
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
    if (res.data.resultCode === '0000') {
      const v = res.data.data;
      // 落地页
      if (v.scaffold_list.length > 0) {
        this.$store.commit('newInnerProjectList', v.scaffold_list);
      }
      // 填写页
      if (v.fill_list.length > 0) {
        this.$store.commit('newInnerFillList', v.fill_list);
      }
      if (v.scaffold_list.length === 0) {
        this.$store.commit('newInnerProjectList', []);
      }
      if (v.fill_list.length === 0) {
        this.$store.commit('newInnerFillList', []);
      }
      if (v.scaffold_list.length === 0 && v.fill_list.length === 0) {
        this.failMsg('文件夹内无数据');
      }
    } else if (res.data.resultCode === '9999') {
      this.failMsg('暂时无数据');
    }
    // 控制container显示所有文件夹页面还是显示文件夹内部页面
    this.$store.commit('newContainerShow', false);
    // 设置侧边栏选中
    this.$store.commit('newActiveState', 'a' + id);
    this.loading = false;
    // console.log(res.data);
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
    this.loading = false;
  });
};

// 查询单个落地页的全部数据
Vue.prototype.singleGroundPageData = function (id) {
  const url = Config.api_url + ROUTES.queryPageidData + '?page_id=' + id;
  this.loading = true;
  this.$ajax({
    method: 'get',
    url: url
  }).then((res) => {
    if (res.data.resultCode === '0000') {
      // console.log(res.data);
      // alert(JSON.stringify(res.data.data));
      this.projectData = res.data.data[0];
    } else if (res.data.resultCode === '9999') {
      this.failMsg('暂时无数据');
    }
    this.loading = false;
  }).catch((err) => {
    console.log(err);
    this.failMsg('服务器错误');
    this.loading = false;
  });
};
