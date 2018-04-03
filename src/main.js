// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Vuex from 'vuex';
import store from './vuex/store';
import VueQuillEditor from 'vue-quill-editor';
import axios from 'axios';
import VueResouse from 'vue-resource';
// import $ from 'jquery';

Vue.use(Element);
Vue.use(Vuex);
Vue.use(VueQuillEditor);
Vue.use(VueResouse);
// Vue.use($);

// axios.defaults.withCredentials = false;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
     // 在发送请求之前做某事
  // let token = localStorage.getItem('token');
  let token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
},
  function (error) {
     // 请求错误时做些事
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // console.log(response);
  return response;
},
error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        alert('登录超时，请重新登录！')
        localStorage.setItem('user', '{}');
        localStorage.setItem('token', null);
        // this.$store.commit('newUser', {});
        router.replace({
          path: '/',
          query: {redirect: router.currentRoute.fullPath}
        });
    }
  }
  return Promise.reject(error.response.data);   // 返回接口返回的错误信息
});
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});

