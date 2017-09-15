/* directive */
import Vue from 'vue';
import store from '../../vuex/store';
Vue.directive('validate', {
  update: function(el, binding, vnode){
    // alert(JSON.stringify(store.state.fill.personInfo));
    let errorList = [];
    console.log(JSON.stringify(binding));
    let value1 = el.value;
    let value2 = binding.value;
    // console.log('value1: ' + value1);
    // console.log('value2: ' + value2);
    //alert(checkReceiverName(value1));
    if(checkReceiverName(value1) != true) {
      console.log(checkReceiverName(value1));
      let obj = {};
      obj.errorItem = binding.expression;
      obj.errorDetail = checkReceiverName(value1);
      errorList.push(obj);
      // this.$store.commit('newIsError', errorList);
      // store.commit('newIsError', errorList);
      showError(errorList);
      return false;
    } else {
      this.$store.commit('newIsError', []);
    }

  }


});

const showError = (data) => {
  // store.commit('newIsError', data);
  this.$store.commit('newIsError', data);
};

const checkReceiverName = (receiverName) => {
  // let errorList = [];
  // let obj = {};
  if (isEmpty(receiverName) === '') {
    // console.log(receiverName + '请准确填写姓名');
    // error('apply-name', '请准确填写姓名');
    return '请准确填写姓名';
  }
  if (receiverName.length > 20) {
    // console.log(receiverName + '姓名过长，请您最多输入20个汉字');
    // error('apply-name', '姓名过长，请您最多输入20个汉字');
    return '姓名过长，请您最多输入20个汉字';
  }
  if (chineseLen(receiverName) < 2) {
    // console.log(receiverName + '姓名必须至少包含2个汉字');
    // error('apply-name', '姓名必须至少包含2个汉字');
    return '姓名必须至少包含2个汉字';
  }
  if (checkScript(receiverName)) {
    // console.log(receiverName + '姓名包含非法字符');
    // error('apply-name', '姓名包含非法字符');
    return '姓名包含非法字符';
  }
  return true;
};

function isEmpty(s) {
  return typeof s === 'undefined' || s === null || s === '';
}
// 计算汉字长度
const chineseLen = (txt) => {
  let n = 0;
  const len = txt.length;
  for (let i = 0; i < len; i += 1) {
    if (/[\u4E00-\u9FA5\u3400-\u4DB5\u9FA6-\u9FBB\uF900-\uFA2D\uFA30-\uFA6A\uFA70-\uFAD9]/.test(txt.charAt(i))) {
      n += 1;
    }
  }
  return n;
};
// 电话号码格式校验
const checkMobiles = number => /^((13|15|18|14|17)+\d{9})$/.test(number);
// 校验非法字符
const checkScript = (text) => {
  let flag = false;
  const scriptWord = "<|>|script|alert|{|}|#|$|'|\"|:|;|&|*|@|@|%|^|?";
  const words = scriptWord.split('|');
  for (let i = 0; i < words.length; i += 1) {
    if (text.indexOf(words[i]) !== -1) {
      flag = true;
      break;
    }
  }
  return flag;
};
// 仅支持输入汉字、数字、字母和＃ （）－ 符号
const checkZf = (text) => {
  let flags = false;
  const spaceWord = /^[\sA-Za-z0-9\u4e00-\u9fa5()（）,，_—-]+$/;
  flags = spaceWord.test(text);
  return flags;
};
