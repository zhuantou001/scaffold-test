import Vue from 'vue';
import IdCardValidate from './id_check';
// 填写页面验证,验证不通过的错误提示存到Vuex的error数组里
Vue.prototype.validate = function (value, item) {
  // 需要提交的数据(暂定,需要填写页那边的后台确认字段)
  // const submitFillDataButton = this.$store.state.fill.submitFillDataButton;
  // 验证名字
  if (item === 'certName') {
    // console.log(item+ ' : ' + CustCheck.checkReceiverName(value));
    if(CustCheck.checkReceiverName(value) != true) {
      this.showError(item, CustCheck.checkReceiverName(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证身份证号码
  if (item === 'certId') {
    // console.log(item+ ' : ' + CustCheck.checkIdCard(value));
    if(CustCheck.checkIdCard(value) != true) {
      this.showError(item, CustCheck.checkIdCard(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证用户手机号
  if (item == 'contractPhone') {
    // console.log(item+ ' : ' + CustCheck.checkPhone(value));
    if(CustCheck.checkPhone(value) != true) {
      this.showError(item, CustCheck.checkPhone(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证收货地址
  if (item === 'addressInfo') {
    // console.log(item+ ' : ' + CustCheck.checkAddressInfo(value));
    if(CustCheck.checkAddressInfo(value) != true) {
      this.showError(item, CustCheck.checkAddressInfo(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证有没有号码归属地
  if (item === 'chooseTelAdd') {
    // console.log(item+ ' : ' + CustCheck.checkNumAddress(value));
    if(CustCheck.checkNumAddress(value) != true) {
      this.showError(item, CustCheck.checkNumAddress(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证有没有选择号码
  if (item === 'chooseTel') {
    // console.log(item+ ' : ' + CustCheck.checkNumber(value));
    if(CustCheck.checkNumber(value) != true) {
      this.showError(item, CustCheck.checkNumber(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证有没有首月资费
  if (item === 'firstMonth') {
    // console.log(item+ ' : ' + CustCheck.checkFirstMonth(value));
    if(CustCheck.checkFirstMonth(value) != true) {
      this.showError(item, CustCheck.checkFirstMonth(value));
      return false;
    } else {
      this.hideError(item);
    }
  }
  // 验证有没有配送区县
  if (item === 'chooseAdd') {
    // console.log(item+ ' : ' + CustCheck.checkAddress(value));
    if(CustCheck.checkAddress(value) != true) {
      this.showError(item, CustCheck.checkAddress(value));
      return false;
    } else {
      this.hideError(item);
    }
  }

};

// 错误显示
Vue.prototype.showError = function (item, detail) {
  let errorList = this.$store.state.fill.isError;
  let obj = {};
  obj.errorItem = item;
  obj.errorDetail = detail;
  // 判断错误提示数组里是否有某条数据的错误提示, 有则覆盖, 没有则添加
  if (this.arrayInError(errorList, item) === false) {
    errorList.unshift(obj);
  } else {
    const i = this.arrayInError(errorList, item);
    errorList.splice(i, 1);
    errorList.unshift(obj); // 先删掉,再放到第一个
  }
  // console.log(JSON.stringify(errorList));
  this.$store.commit('newIsError', errorList);
  window.scrollTo(0, 0);
};
// 验证通过,错误隐藏
Vue.prototype.hideError = function (item) {
  let errorList = this.$store.state.fill.isError;
  if (this.arrayInError(errorList, item) === false) {
    return false;
  } else {
    const i = this.arrayInError(errorList, item);
    errorList.splice(i, 1);
    this.$store.commit('newIsError', errorList);
  }
};
// 点击别的页面, 验证错误隐藏
Vue.prototype.hideErrorOther = function (item) {
  this.$store.commit('newIsError', [{errorItem: '', errorDetail: ''}]);
};
// 数组里是否含有某字段, 有的话返回索引
Vue.prototype.arrayInError = function (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].errorItem === item) {
      return i;
    }
  }
  return false;
};
const CustCheck = {
  // 机主姓名验证
  checkReceiverName: (receiverName) => {
    if (isEmpty(receiverName) === '') {
      return '请准确填写姓名';
    }
    if (receiverName.length > 20) {
      return '姓名过长，请您最多输入20个汉字';
    }
    if (chineseLen(receiverName) < 2) {
      return '姓名必须至少包含2个汉字';
    }
    if (checkScript(receiverName)) {
      return '姓名包含非法字符';
    }
    return true;
  },
  // 收货人姓名验证
  checkName: (receiverName) => {
    if (isEmpty(receiverName) === '') {
      return '请准确填写收货人姓名';
    }
    if (receiverName.length > 20) {
      return '收货人姓名过长，请您最多输入20个汉字';
    }
    if (chineseLen(receiverName) < 2) {
      return '姓名必须至少包含2个汉字';
    }
    if (checkScript(receiverName)) {
      return '姓名包含非法字符';
    }
    return true;
  },
  // 证件号码校验
  checkIdCard: (id) => {
    // 身份证
    if (checkScript(id)) {
      return '证件号码包含非法字符';
    } else if (!IdCardValidate(id)) {
      return '请输入正确的身份证号';
    }
    return true;
  },
  // 根据身份证判断未满16周岁
  checkAge: (id) => {
    let strBirthday = id.substr(6, 4) + "/" + id.substr(10, 2) + "/" + id.substr(12, 2);
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
      age --;
    } else {
      age ++;
    }
    if (age < 16) {
      return '抱歉，根据国家相关规定未满16周岁无法办理此业务';
    }
    return true;
  },
  // 根据省份判断限制年龄
  checkAgeLimit: (id,_age) => {
    let strBirthday = id.substr(6, 4) + "/" + id.substr(10, 2) + "/" + id.substr(12, 2);
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
      age --;
    } else {
      age ++;
    }
    if (age < _age) {
      return '抱歉，根据国家相关规定您的年龄无法办理此业务。';
    }
    return true;
  },
  checkPhone: (number) => {
    if (number === '') {
      return '请填写联系电话';
    } else if (!checkMobiles(number)) {
      return '您的手机号码格式有误，请重新输入';
    }
    return true;
  },
  checkReceiverPhone: (number) => {
    if (number === '') {
      return '请填写收货人联系电话';
    } else if (!checkMobiles(number)) {
      return '您的手机号码格式有误，请重新输入';
    }
    return true;
  },
  checkNumber: (number) => {
    if (number === '') {
      return '请选择号码';
    }
    return true;
  },
  // 选择首月资费
  checkFirstMonth: (number) => {
    if (!number) {
      return '请选择首月资费';
    }
    return true;
  },
  // 选择优惠活动
  checkActive: (number) => {
    if (number === '') {
      return '请选择优惠活动';
    }
    return true;
  },
  // 选择号码归属地
  checkNumAddress: (address) => {
    if (address === '') {
      return '请选择号码归属地';
    }
    return true;
  },
  checkAddress: (address) => {
    if (address === '') {
      return '请选择您的配送区县';
    }
    return true;
  },
  checkAddressInfo: (address) => {
    if (address === '') {
      return '请填写详细地址';
    } else if (chineseLen(address) > 50) {
      return '详细地址过长，请您最多输入50个汉字';
    } else if (chineseLen(address) < 4) {
      return '详细地址太短，请您最少输入4个汉字';
    } else if (!checkZf(address)) {
      return '仅支持输入汉字、数字、字母、—、_、（）、空格、逗号';
    }
    return true;
  },
  // 验证码校验
  checkYzm: (yzm) => {
    if (yzm === '') {
      return '请填写验证码';
    }
    return true;
  },
  // 提交时验证码-号码校验
  checkYzmPhone: (data) => {
    if (data !== ($('#mobilePhone').val().trim())) {
      error('apply-yzm', '验证码错误');
      $('.rightI').hide();
      return false;
    }
    return true;
  },
};
/*
* 公共验证方法
* */
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
// 联通号码格式校验
const checkCUCC = number => /^((130|131|132|155|156|185|186|145|176|170|166)+\d{8})$/.test(number);
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
