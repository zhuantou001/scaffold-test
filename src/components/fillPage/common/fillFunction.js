import Vue from 'vue';

Vue.prototype.shuffle = function (arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
};

Vue.prototype.getUrlParam = () => {
  const args = {};
  const query = location.search.substring(1);
  const pairs = query.split('&');
  for (let i = 0; i < pairs.length; i += 1) {
    const pos = pairs[i].indexOf('=');
    if (pos !== -1) {
      const argName = pairs[i].substring(0, pos);
      args[argName] = pairs[i].substring(pos + 1);
    }
  }
  return args;
};
Vue.prototype.buttonUrlParam = (initParam) => {
  let urlParam = '';
  for (let key in initParam) {
    let values = initParam[key];
    if (values !== undefined && values !== 'undefined' && values !== '') {
      urlParam += `&${key}=${values}`;
    }
  }
  // $.each(initParam, (key, values) => {
  //   if (values !== undefined && values !== 'undefined' && values !== '') {
  //     urlParam += `&${key}=${values}`;
  //   }
  // });
  return urlParam;
};

// 填写页页面初始化请求
Vue.prototype.fillPageInit = function () {
  let initUrl = '';
  const initParam = this.getUrlParam();
  // console.log('获取的初始化接口: ' + this.$store.state.fill.pageNature[0].initUrl);
  // console.log('获取的初始化productID: ' + this.$store.state.options.selectedProductId);
  // const productKey = this.$store.state.options.productKey;
  if (this.$store.state.fill.pageNature[0].initUrl) {
    // initUrl = this.$store.state.fill.pageNature[0].initUrl + '?' + productKey + '=' + this.$store.state.options.selectedProductId + '&' + this.buttonUrlParam(initParam);
    const paramUrl = this.buttonUrlParam(initParam).substring(1);
    initUrl = this.$store.state.fill.pageNature[0].initUrl + '?' + paramUrl;
  } else {
    alert('请在创建填写页时填写初始化接口');
    return false;
  }
  // console.log('初始化接口: ' + initUrl);
  this.loading = true;
  this.$ajax({
    method: 'get',
    url: initUrl
    // url: 'http://demo.mall.10010.com:8104/king/kingNumCard/youkuinit?product=0'
    // url: '/king/kingNumCard/bjlinit?product=&mobil='
    // url: '/king/kingNumCard/minshenginit?product=0' // 民生卡
    // url: '/king/kingNumCard/llinit?product=0'
    // url: '/king/kingNumCard/init?product=0&mobil=undefined'
  }).then((res) => {
    if (res.data.resultCode === '0000') {
      // 初始化信息存入localStorage
      localStorage.setItem('fillPageInit', JSON.stringify(res.data));
      this.$store.commit('newInitData', res.data);
      this.init(res.data);
    } else {
      // this.failMsg('暂时无数据');
    }
    this.loading = false;
  }).catch((err) => {
    console.log(err);
    // this.failMsg('服务器错误');
    this.loading = false;
  });
};
// 页面初始化
Vue.prototype.init = function (data) {
  // 判断初始化数据里是否含有个人信息(姓名,身份证号,电话)
  if (data.hasOwnProperty('certName') && data.hasOwnProperty('certNo') && data.hasOwnProperty('mobilePhone')) {
    this.setPersonInfo(data);
  }
  if (data.hasOwnProperty('FirstMonthFee')) {
    this.setFirstMonth(data);
  }
  this.loadDataFromCache();
};
// 设置填写页的个人信息
Vue.prototype.setPersonInfo = function (data) {
  this.$store.commit('newCertName', data.certName);
  this.$store.commit('newCertId', data.certNo);
  this.$store.commit('newContractPhone', data.mobilePhone);
};
Vue.prototype.initSessionInfo = function (data) {
  this.$store.commit('newCertName', data.certInfo.certName);
  this.$store.commit('newCertId', data.certInfo.certId);
  this.$store.commit('newContractPhone', data.certInfo.contractPhone);
  this.$store.commit('newAddress', data.post.address);
};

// 设置填写页的首月资费
Vue.prototype.setFirstMonth = function (data) {
  this.$store.commit('newFirstMonthData', data.FirstMonthFee);
};

// 设置号码选择弹框的状态
Vue.prototype.setNumberBoxState = function (showNum, loading, noData, timeOut, initNoNumber) {
  // 号码列表是否显示
  this.$store.commit('newShowNum', showNum);
  // loading
  this.$store.commit('newLoading', loading);
  // 没有找到相关号码
  this.$store.commit('newNoData', noData);
  // 网络超时
  this.$store.commit('newTimeOut', timeOut);
  // 初始化没有数据
  this.$store.commit('newInitNoNumber', initNoNumber);
};

/**
 *
 * 提交验证逻辑
 *
 *
 * **/

// 判断数组里是否含有item组件
Vue.prototype.arrayInFill = function (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].component === item) {
      return true;
    }
  }
  return false;
};

// 填写页里面的提交
Vue.prototype.submitFillButton = function () {
  let submitUrl = '';
  if (this.$store.state.fill.pageNature[0].submitUrl) {
    submitUrl = this.$store.state.fill.pageNature[0].submitUrl;
  } else {
    alert('请在创建填写页时填写提交接口');
    this.$store.commit('newSubmitLoad', false);
    return false;
  }
  let submitField = '';
  if (this.$store.state.fill.pageNature[0].submitField) {
    submitField = this.$store.state.fill.pageNature[0].submitField;
  } else {
    alert('请在创建填写页时填写提交接口参数');
  }

  let submitData = {};
  submitData[submitField] = JSON.stringify(this.submitBeforeCheck());

  // console.log('提交接口: ' + submitUrl);
  // console.log('提交接口数据: ' + JSON.stringify(submitData));
  if (submitData) {
    this.loading = true;
    this.$ajax({
      method: 'post',
      // headers: {
      //   'Content-type': 'application/x-www-form-urlencoded'
      // },
      url: submitUrl,
      // url: '/king/kingBuy2/minsheng',
      data: submitData,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret.replace(/&$/, "");
      }],
    }).then((res) => {
      // console.log(JSON.stringify(res.data));
      let html = '';
      const numberS = this.$store.state.fillInfoSubmit.number;
      this.$store.commit('newSubmitLoad', false);
      if (res.data.code === '0000') {
        let object = {};
        object.orderId = res.data.orderId;
        object.phoneNum = res.data.phoneNum;
        object.productId = res.data.productId;
        this.$store.commit('newObtainInterParam', object);
        if (!this.$store.state.fillInfoSubmit.selfFetchCode) {
          // 无自提码,表示物流配送
          this.$store.commit('newIsFetch', false);
          // html = `<p class="point" style="margin-bottom:10px;">您的号码为<span style="color: ${this.$store.state.fill.pageNature[0].majorColor}">${numberS}</span>, 请您于拿到卡后<span style="color: ${this.$store.state.fill.pageNature[0].majorColor}">15日</span>内激活，如未激活，号码将被回收哦！</p>
          // <p class="point">订单及物流查询，请关注<span style="color: ${this.$store.state.fill.pageNature[0].majorColor}">“顺卡助手”微信公众号-开通-订单查询</span></p>`;
        } else {
          // 自提
          this.$store.commit('newIsFetch', true);
          // html = '<p class="point" >您的卡已在营业厅等待领取，营业员将会与您电话联系，请保持手机畅通！更多特权和服务尽在“顺卡助手”微信公众号</p>';
        }
        // this.$store.commit('newSuccContent', [{successFlag: true, simTitleHtml: '提交成功', succDes: html}]);
        this.$store.commit('newShowSuccess', true);
      } else if (res.data.code === '0005') {
        html = '<p class="point" style="text-align: center;"><span>' + numberS + '</span>号码已被抢占。</p>';
        this.$store.commit('newShowSuccess', false);
      } else if (res.data.code === '0010') {
        html = '<p class="point" style="text-align: center;">' + res.data.msg + '</p>';
        this.$store.commit('newShowSuccess', false);
      } else {
        html = '<p class="point" style="text-align: center;">' + res.data.msg + '</p>';
        this.$store.commit('newShowSuccess', false);
      }
      this.$store.commit('newShowMsgBox', true);
      this.$store.commit('newShowFailBoxContent', html);

      // 禁止页面滚动
      this.$store.commit('newIsScroll', true);
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.$store.commit('newSubmitLoad', false);
      // this.failMsg('服务器错误');
      this.loading = false;
    });
  }
};
// 填写页里面提交前的校验
Vue.prototype.submitBeforeCheck = function () {
  const getFillComponentsItems = this.$store.state.fill.getFillComponentsItems;
  let data = {}; // 提交参数准备
  data.goodsId = this.$store.state.fillInfoSubmit.goodsId;
  data.product = 0;
  if (this.$store.state.options.selectedProductId) {
    data.product = this.$store.state.options.selectedProductId;
  }
  data.certInfo = {};
  data.certInfo.certName = this.$store.state.fillInfoSubmit.certName;
  data.certInfo.certId = this.$store.state.fillInfoSubmit.certId;
  data.certInfo.contractPhone = this.$store.state.fillInfoSubmit.contractPhone;
  data.numRes = {};
  data.numRes.essProvince = this.$store.state.fillInfoSubmit.essProvince;
  data.numRes.essCity = this.$store.state.fillInfoSubmit.essCity;
  data.numRes.number = this.$store.state.fillInfoSubmit.number;
  // const firstMonth = this.$store.state.fillInfoSubmit.firstMonth;
  data.post = {};
  data.post.webProvince = this.$store.state.fillInfoSubmit.webProvince;
  data.post.webCity = this.$store.state.fillInfoSubmit.webCity;
  data.post.webCounty = this.$store.state.fillInfoSubmit.webCounty;
  data.post.address = this.$store.state.fillInfoSubmit.address;
  const _cache = {};
  _cache.certInfo = data.certInfo;
  _cache.post = data.post;
  sessionStorage.setItem('ANT_CARD', JSON.stringify(_cache));
  // 判断是否有自提, 有则传参数, 没有则不传
  if (this.$store.state.fillInfoSubmit.selfFetchCode) {
    // console.log('有自提');
    data.delivery = {};
    data.delivery.selfFetchCode = this.$store.state.fillInfoSubmit.selfFetchCode;
  }
  // console.log('data: ' + JSON.stringify(data));
  // const 直接判断vuex里的要提交的数据字段是不是为空
  // console.log(JSON.stringify(getFillComponentsItems));
  const errorList = this.$store.state.fill.isError;
  if (errorList.length > 1) {
    // alert('请修改提示问题');
    // this.failMsg('请修改提示问题');
    return false;
  }
  // 个人信息模块
  if (this.arrayInFill(getFillComponentsItems, 'getPersonInfo')) {
    if (data.certInfo) {
      if (!data.certInfo.certName) {
        this.validate('', 'certName');
        return false;
      }
      if (!data.certInfo.certId) {
        this.validate('', 'certId');
        return false;
      }
      if (!data.certInfo.contractPhone) {
        this.validate('', 'contractPhone');
        return false;
      }
    }
  }
  if (this.arrayInFill(getFillComponentsItems, 'getChooseTel')) {
    // 选择号码模块
    if (data.numRes) {
      if (!data.numRes.essProvince || !data.numRes.essCity) {
        this.validate('', 'chooseTelAdd');
        return false;
      }
      if (!data.numRes.number) {
        this.validate('', 'chooseTel');
        return false;
      }
    }
  }
  if (this.arrayInFill(getFillComponentsItems, 'getFirstMonth')) {
    // 首月资费模块  目前还不知道是哪个字段, 自己模拟一个
    // if (!data.firstMonth) {
    //   this.validate('', 'firstMonth');
    //   return false;
    // }
  }
  if (this.arrayInFill(getFillComponentsItems, 'getDeliveryAddress')) {
    // 收货地址模块
    if (data.post) {
      if (!data.post.webCity || !data.post.webCounty) {
        this.validate('', 'chooseAdd');
        return false;
      }
      if (!data.post.address) {
        this.validate('', 'addressInfo');
        return false;
      }
    }
  }
  return data;
};
// 获取自提列表
Vue.prototype.selfFetch = function () {
  let param = {};
  const webProvince = this.$store.state.fillInfoSubmit.webProvince;
  const webCity = this.$store.state.fillInfoSubmit.webCity;
  const webCounty = this.$store.state.fillInfoSubmit.webCounty;
  const essProvince = this.$store.state.fillInfoSubmit.essProvince;
  const goodsId = this.$store.state.fillInfoSubmit.goodsId;

  // const webProvince = 110000;
  // const webCity = 110100;
  // const webCounty = 110102;
  // const goodsId = 111408012301;
  // const essProvince = 11;

  param = {
    "webProvince":　webProvince,
    "webCity": webCity,
    "webCounty": webCounty,
    "essProvince":　essProvince,
    "goodsId": goodsId
  };
  this.loading = true;
  this.$store.commit('newSubmitLoad', true);
  this.$ajax({
    method: 'post',
    url: '/king/kingNumCard/selfFetch',
    data:　param,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret.replace(/&$/, "");
      }
    ]
  }).then((res) => {
    // console.log(JSON.stringify(res.data));
    if (res.data.selfFetchFlag === '1') {
      // console.log('有自提点');
      this.$store.commit('newSubmitLoad', false);
      this.$store.commit('newSinceFlag', true);
      this.$store.commit('newSelfFetchInfo', res.data.selfFetchInfo);
      // // 禁止页面滚动
      // this.$store.commit('newIsScroll', true);
    } else if (res.data.selfFetchFlag === '0') {
      // console.log('无自提点');
      this.$store.commit('newSubmitLoad', true);
      // 提交数据
      this.submitFillButton();
    }
    // 禁止页面滚动
    this.$store.commit('newIsScroll', true);
    this.loading = false;
  }).catch((err) => {
    console.log(err);
    // this.failMsg('服务器错误');
    this.loading = false;
  });
};
// 从缓存读取数据
Vue.prototype.loadDataFromCache = function () {
  const _cache = sessionStorage.getItem('ANT_CARD');
  if (_cache) {
    const _cacheObject = JSON.parse(_cache);
    // const _certInfo = _cacheObject.certInfo;
    this.initSessionInfo(_cacheObject);
    // const _post = _cacheObject.post;
    // this.$store.commit('newAddress', _post.address);
  }
};
