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

Vue.use(Element);
Vue.use(Vuex);
Vue.use(VueQuillEditor);

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

