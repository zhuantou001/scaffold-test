/* 公共方法 */
import Vue from 'vue';
/* 删除组件 */
Vue.prototype.deleteComponent = function (setComponentsItems, getComponentsItems, index) {
  // alert(index);
  // alert(JSON.stringify(setComponentsItems));
  for (let i in setComponentsItems) {
    if (setComponentsItems[i].index === index) {
      setComponentsItems.splice(i, 1);
    }
  }
  for (let i in getComponentsItems) {
    if (getComponentsItems[i].index === index) {
      getComponentsItems.splice(i, 1);
    }
  }
};
