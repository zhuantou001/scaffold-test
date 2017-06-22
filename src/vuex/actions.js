import * as types from './mutation-types';
export const actions = {
  syncToastState: ({commit, state}, {showToast, toastLabel}) => {
    commit(types.SYNC_TOAST_STATE, {showToast, toastLabel});
  },
  changeSimColor: (store, color) => {
    return new Promise((resolve) => {
      store.commit('newSimObject', color);
      resolve();
    });
  }
};
