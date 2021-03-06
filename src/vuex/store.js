import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import topImg from './modules/topImg';
import options from './modules/options';
import button from './modules/button';
import detailImg from './modules/detailImg';
import background from './modules/background';
import applyDownload from './modules/applyDownload';
import project from './modules/project';
import fill from './modules/fill';
import fillInfo from './modules/fillInfo';
import fillInfoSubmit from './modules/fillInfoSubmit';
import commonFill from './modules/commonFill';
import share from './modules/share';
import floatImg from './modules/floatImg';
import * as getters from './getters';
import { actions } from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  actions,
  // 各模块对应的 state 根节点为 /state/{module-name}
  modules: {
    app,
    topImg,
    options,
    button,
    detailImg,
    background,
    applyDownload,
    project,
    fill,
    fillInfo,
    fillInfoSubmit,
    commonFill,
    share,
    floatImg,
  },
  strict: false
});
