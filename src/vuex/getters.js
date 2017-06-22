export const loading = (state) => {
  let show = state.app.showLoading;
  let label = state.app.loadingLabel;
  return {show, label};
};

export const toast = (state) => {
  let show = state.app.showToast;
  let label = state.app.toastLabel;
  return {show, label};
};
