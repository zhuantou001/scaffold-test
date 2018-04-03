/**
 * Created by Glacier on 16/11/8.
 * 填写页
 */
import FastClick from 'fastclick';
import './fill.scss';
import Area from '../../../common/js/area';
import { shuffle } from '../../../common/js/ArrayUtils';
import { resize, getUrlParam } from '../../../common/js/commonUtils';
import * as commonCheck from '../../../common/js/commonCheck';

let passedPhone = '';
// 验证码发送状态
let isStatus = true;
// 判断地市是否为新疆
// 所在地区是否重置
let curCity = '';

// 验证码开关
const captchaSwitch = false;

$(() => {
  FastClick.attach(document.body);
  resize();
  // 初始化参数
  const initParam = getUrlParam();
  // 请求参数
  const req = {};
  // 地市信息
  let city = [];
  // 号码查询参数
  const numberParam = {};
  // 并发请求限制
  let requestFlag = false;
  // 有遮罩层时禁止滚动
  const noScroll = () => {
    $('html, body').addClass('no-scroll');
  };
  const reScroll = () => {
    $('html, body').removeClass('no-scroll');
  };
  // 请求参数初始化
  const setReq = (data) => {
    const _location = $.cookie('mallcity') || '11|110';
    let _provinceCode = _location.split('|')[0];
    let _cityCode = _location.split('|')[1];
    const _exist = data.provinceData.filter(p => p.PROVINCE_CODE === _provinceCode);
    if (_exist.length === 0) {
      _provinceCode = data.provinceData[0].PROVINCE_CODE;
      _cityCode = data.cityData[_provinceCode][0].CITY_CODE;
      $.cookie('mallcity', `${_provinceCode}|${_cityCode}`, { expires: 7, path: '/', domain: '.10010.com' });
    }
    $('#delivery-desc').show();
    req.numRes = {};
    req.numRes.essProvince = _provinceCode;
    req.numRes.essCity = _cityCode;
    req.goodsId = `${_provinceCode}${data.goodsId}`;
    req.product = initParam.product;
    const feeMonth = $('#chooseStyle').find('.jifei');
    feeMonth.find('p').remove();
    let htmP = '';
    for (let i = 0; i < data.FirstMonthFee.length; i += 1) {
      const keys = Object.keys(data.FirstMonthFee[i]);
      if (`${keys}` === 'A000011V000001') {
        htmP = `<p><label for='${keys}'>全月计费</label><input type='radio' name='radio' id='${keys}' checked ></p>`;
        feeMonth.append(htmP);
      } else if (`${keys}` === 'A000011V000003') {
        htmP = `<p><label for='${keys}'>按量计费</label><input type='radio' name='radio' id='${keys}' ></p>`;
        feeMonth.append(htmP);
      }
    }
  };
  // 顶部描述
  const _topText = '套餐办理中，请确认您的准确信息';
  // 设置产品信息
  const setProduct = () => {
    $('#top-desc').show().text(_topText);
  };
  // 用户信息初始化
  function setUser() {
    $('#certName').text(decodeURIComponent(initParam.certName));
    $('#certNo').text(initParam.certNo);
  }
  function changeRaido() {
    const $id = $('.jifei').find('input:checked');
    const _text = $id.parents('p').find('label').text();
    if ($id.attr('id') === 'A000011V000001') {
      $('.tips').text('适合月初开通的用户，按照您选择的套餐正常计费并享受套餐内容，即199元/月。“首月”指号码激活认证成功当月。');
    } else {
      $('.tips').text('适合月底开通的用户，开通当月按照标准资费依据使用量进行计费，即国内语音拨打0.15元/分钟收费，不足一分钟按一分钟计算，国内流量按0.27元/MB，累计至10元，按照10元100M计费，101M起继续按照0.27元/MB计费，累计至5元时不再收费，直至1GB，即15元1GB，以后依次类推。从次月起恢复正常。“首月”指号码激活认证成功当月。');
    }
    $('#firstMonth .p-content').text(_text);
    req.monthFee = {};
    req.monthFee.id = $id.attr('id');
    req.monthFee.name = _text;
  }
  // 省份切换
  function provinceChange(provinceCode, cityCode) {
    $('#province li, #city li').removeClass('selected');
    $('#province').find('li[data-code=' + provinceCode + ']').addClass('selected');
    const cityList = [];
    city[provinceCode].forEach((c) => {
      cityList.push(`<li data-code=${c.CITY_CODE}>${c.CITY_NAME}</li>`);
    });
    $('#city').html(cityList);
    if (!commonCheck.isEmpty(cityCode)) {
      $('#city').find('li[data-code=' + cityCode + ']').addClass('selected');
    }
  }
  // 省份地市初始化
  function setLocation(location) {
    city = location.cityData;
    const provinceList = [];
    location.provinceData.forEach((p) => {
      provinceList.push(`<li data-code=${p.PROVINCE_CODE}>${p.PROVINCE_NAME}</li>`);
    });
    $('#province').html(provinceList).find('li[data-code=' + req.numRes.essProvince + ']').addClass('selected');
    provinceChange(req.numRes.essProvince, req.numRes.essCity);
  }
  // 邮寄地市切换
  const cityChange = (cityCode, districtCode) => {
    $('#post-city li, #post-district li').removeClass('selected');
    $('#post-city').find(`li[data-code=${cityCode}]`).addClass('selected');
    const _districtList = [];
    Area.CITY_MAP[cityCode].forEach((d) => {
      _districtList.push(`<li data-code=${d.DISTRICT_CODE}>${d.DISTRICT_NAME}</li>`);
    });
    $('#post-district').html(_districtList);
    if (!commonCheck.isEmpty(districtCode)) {
      $('#post-district').find(`li[data-code=${districtCode}]`).addClass('selected');
    }
  };
  // 邮寄信息初始化
  const setPost = () => {
    const postPro = Area.PROVINCE_LIST.filter(p => p.ESS_PROVINCE_CODE === req.numRes.essProvince)[0];
    const _cityList = [];
    Area.PROVINCE_MAP[postPro.PROVINCE_CODE].forEach((c) => {
      _cityList.push(`<li data-province-name=${postPro.PROVINCE_NAME} data-code=${c.CITY_CODE} data-ess-code=${c.ESS_CITY_CODE}>${c.CITY_NAME}</li>`);
    });
    $('#post-city').html(_cityList);
    $(`#post-city li[data-ess-code=${req.numRes.essCity}]`).addClass('selected');
    let postCity = Area.PROVINCE_MAP[postPro.PROVINCE_CODE].filter(c => c.ESS_CITY_CODE === req.numRes.essCity)[0];
    if (postCity === undefined) {
      postCity = Area.PROVINCE_MAP[postPro.PROVINCE_CODE][0];
    }
    const _districtList = [];
    Area.CITY_MAP[postCity.CITY_CODE].forEach((d) => {
      _districtList.push(`<li data-code=${d.DISTRICT_CODE}>${d.DISTRICT_NAME}</li>`);
    });
    $('#post-district').html(_districtList);
    const _postDis = $('#post-district li:first');
    _postDis.addClass('selected');
    req.post = {};
    req.post.webProvince = postPro.PROVINCE_CODE;
    req.post.webCity = postCity.CITY_CODE;
    req.post.webCounty = _postDis.data('code') + '';
  };
  // 生成号码列表
  const listNumber = () => {
    if (numberParam.list.length === 0) {
      $('.number-list').html('无号码');
      return;
    }
    const _start = (numberParam.current - 1) * numberParam.size;
    let _end = _start + numberParam.size;
    if (numberParam.current === numberParam.max) {
      _end = numberParam.list.length;
    }
    const numberHtml = [];
    for (let i = _start; i < _end; i += 1) {
      const numberObj = numberParam.list[i];
      if (numberObj.niceRule === 0) {
        numberHtml.push(`<li><a data-niceRule='${numberObj.niceRule}'
      data-monthLimit='${numberObj.monthLimit}' >${numberObj.number}</a></li>`);
      } else {
        numberHtml.push(`<li><a data-niceRule='${numberObj.niceRule}'
      data-monthLimit='${numberObj.monthLimit}' >${numberObj.number}<i>靓</i></a></li>`);
      }
    }
    numberParam.current += 1;
    $('.number-list').html(numberHtml);
  };
  // 解析号码
  function decompress(number) {
    $('.number-loading').hide();
    const _key = $('#search').data('val');
    if (number.numArray.length === 0) {
      if (commonCheck.isEmpty(_key)) {
        $('.no-number').text('当前选号人数过多，请稍后再试').show();
        $('#refresh').text('再试一次');
      } else {
        $('.no-number').text('抱歉，没有找到相关号码，请重新筛选。').show();
        $('#refresh').text('换一批');
      }
      return;
    }
    $('.number-list').show();
    numberParam.list = [];
    numberParam.current = 1;
    const numArray = number.numArray;
    for (let i = 0; i < numArray.length; i += 12) {
      const numberObj = {};
      if (commonCheck.isEmpty(_key)) {
        numberObj.number = numArray[i];
      } else {
        numberObj.number = numArray[i].toString().replace(new RegExp(`${_key}$`), `<span>${_key}</span>`);
      }
      numberObj.niceRule = numArray[i + 5];
      numberObj.monthLimit = numArray[i + 6];
      numberParam.list.push(numberObj);
    }
    numberParam.max = Math.ceil(numberParam.list.length / numberParam.size);
    shuffle(numberParam.list);
    listNumber();
  }
  // 初始化号码查询参数
  const setNumberParam = (number) => {
    numberParam.list = [];
    numberParam.current = 1;
    numberParam.size = 10;
    numberParam.max = 1;
    numberParam.proGroupNum = number.proGroupNum;
  };
  // 初始化号码
  const setNumber = () => {
    $('.number-list, .no-number').hide();
    $('.number-loading').show();
    const param = {
      provinceCode: req.numRes.essProvince,
      cityCode: req.numRes.essCity,
      monthFeeLimit: 0,
      groupKey: numberParam.proGroupNum[req.numRes.essProvince],
      searchCategory: 3,
      net: '01',
      amounts: 200,
      codeTypeCode: '',
      searchValue: $('#search').data('val'),
      qryType: '02',
      goodsNet: 4,
    };
    if (!commonCheck.isEmpty(param.groupKey)) {
      $.ajax({
        type: 'get',
        url: '/NumApp/NumberCenter/qryNum',
        data: param,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonp_queryMoreNums',
        timeout: 5000,
        success: (numberData) => {
          decompress(numberData);
        },
        complete: (XMLHttpRequest, status) => {
          if (status === 'timeout') {
            // $('.number-loading').hide();
            // $('.timeOut').show();
            // $('#refresh').addClass('time-out');
          }
        },
      });
    } else {
      $('.no-number').text('抱歉，没有找到相关号码，请重新筛选。').show();
      $('#refresh').text('换一批');
      $('.number-list, .number-loading').hide();
    }
  };
  // 号码预占
  const occupyNumber = (number, rule, month) => {
    var param = {
      provinceCode: req.numRes.essProvince,
      cityCode: req.numRes.essCity,
      numID: number,
      goodsId: req.goodsId,
    };
    requestFlag = true;
    $('.occupyTips').show();
    $.ajax({
      type: 'POST',
      url: '/mall-mobile/PromptlyBuyNumAjax/occupyNumberAjax',
      timeout: 6000,
      data: param,
      success: (resCode) => {
        if (resCode === 'SUCCESS') {
          $('.mask, #number-popup, .occupyTips').hide();
          reScroll();
          $('#number .p-content').text(number);
          req.numRes.number = number;
          if (rule === '1' && month !== '0') {
            $('.numberTips').show().find('i').text(month);
          } else {
            $('.numberTips').hide();
          }
          if ($('#top-desc').text() === '请选择号码') {
            $('#top-desc').removeClass('error').text(_topText);
          }
        } else if (resCode === 'OCCUPYFAIL') {
          $('#number-popup, .occupyTips').hide();
          $('#error').show();
          $('#reserved-number').html('当前网络不给力，请在wifi或其他网络环境下重试！');
        } else {
          $('#number-popup, .occupyTips').hide();
          $('#error').show();
          $('#reserved-number').html('<span>' + number + '</span>号码已被抢占。');
        }
        $('#number').removeClass('error');
        requestFlag = false;
      },
      error: () => {
        $('#number-popup, .occupyTips').hide();
        $('#error').show();
        $('#reserved-number').html('<span>' + number + '</span>号码已被抢占。');
        requestFlag = false;
      },
    });
  };

  // 点击错误提示消失
  $('.p-content').find('input').click((e) => {
    const _this = $(e.currentTarget);
    const par = _this.parents('li');
    const isError = par.hasClass('error');
    if (isError) {
      par.removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  $('.p-text-area').click(() => {
    if ($('#delivery-desc').hasClass('error')) {
      $('#delivery-desc').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  $('#delivery').click((e) => {
    if ($(e.currentTarget).hasClass('error')) {
      $('#delivery').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  // 提交前校验
  const verify = () => {
    $('li.error').removeClass('error');
    if (!commonCheck.CustCheck.checkNumAddress($('#location .p-content').text())) {
      return false;
    } else if (!commonCheck.CustCheck.checkNumber($('#number .p-content').text())) {
      return false;
    } else if (!commonCheck.CustCheck.checkPhone($('#mobilePhone').val())) {
      return false;
    } else if (captchaSwitch && !commonCheck.CustCheck.checkYzm($('.yzmInput').val())) {
      return false;
    } else if (!commonCheck.CustCheck.checkFirstMonth($('#firstMonth .p-content').text())) {
      return false;
    } else if (captchaSwitch && !commonCheck.CustCheck.checkYzmPhone(passedPhone)) {
      return false;
    } else if (!commonCheck.CustCheck.checkAddress($('#delivery .p-content').text())) {
      return false;
    } else if (!commonCheck.CustCheck.checkAddressInfo($('#address').val())) {
      return false;
    }
    return true;
  };
  // 提交参数准备
  const preSubmit = () => {
    req.certInfo = {};
    req.certInfo.contractPhone = $('#mobilePhone').val().trim();
    req.post.address = $('#address').val().trim();
    req.goodsId = `${req.numRes.essProvince}${req.goodsId.substring(2)}`;
    req.product = initParam.product;
    req.captcha = $('.yzmInput').val().trim();
    const _cache = {};
    _cache.certInfo = req.certInfo;
    _cache.post = req.post;
    sessionStorage.setItem('ICE_CARD', JSON.stringify(_cache));
  };

  // 提交
  const submit = () => {
    const reqData = JSON.stringify(req);
    sessionStorage.setItem('userMessage', reqData);
  };

  // 缓存
  const setSesson = () => {
    const _cache = sessionStorage.getItem('userMessage');
    if (_cache !== null) {
      const _cacheJson = JSON.parse(_cache);
      const sprovince = $('#province').find('li.selected').text();
      const scity = $('#city').find('li.selected').text();
      const pcity = $('#post-city').find('li.selected').text();
      const pdistrict = $('#post-district').find('li.selected').text();
      $('#location').find('.p-content').text(`${sprovince} ${scity}`).removeClass('grey');
      $('#number').find('.p-content').text(_cacheJson.numRes.number);
      $('#delivery').find('.p-content').text(`${sprovince} ${pcity} ${pdistrict}`).removeClass('grey');
      $('#captchaText').val(_cacheJson.captcha);
      $('#mobilePhone').val(_cacheJson.certInfo.contractPhone);
      $('#address').val(_cacheJson.post.address);
      $('#captcha').removeClass('grey');
    }
  };
  // 从缓存读取数据
  const loadDataFromCache = () => {
    const _cache = sessionStorage.getItem('ICE_CARD');
    if (!commonCheck.isEmpty(_cache)) {
      const _cacheObject = JSON.parse(_cache);
      if (commonCheck.isEmpty($('#certName').val())) {
        const _certInfo = _cacheObject.certInfo;
        $('#certName').val(_certInfo.certName);
        $('#certNo').val(_certInfo.certId);
        $('#mobilePhone').val(_certInfo.contractPhone);
      }
      const _post = _cacheObject.post;
      const _city = $(`#post-city li[data-code=${_post.webCity}]`);
      if (_city.length === 1) {
        cityChange(_post.webCity, _post.webCounty);
        $('#delivery .p-content').text('请选择区/县').addClass('grey');
        $('#address').val(_post.address);
        req.post = _post;
      }
    }
    setSesson();
  };

  // 页面初始化
  function init(data) {
    setReq(data);
    setProduct();
    setUser();
    setLocation(data);
    setPost();
    setNumberParam(data);
    loadDataFromCache();
    changeRaido();
  }
  // 省份地市弹出层
  $('#location').on('click', (e) => {
    if ($(e.currentTarget).hasClass('error')) {
      $('#location').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
    provinceChange(req.numRes.essProvince, req.numRes.essCity);
    const _mask = $('.mask');
    _mask.show();
    noScroll();
    $('#area').addClass('slip');
    _mask.one('click', () => {
      $('#area').removeClass('slip');
      setTimeout(() => {
        _mask.hide();
        reScroll();
      }, 300);
    });
  });
  // 省份切换
  $('#province').on('click', 'li', (e) => {
    const _this = $(e.currentTarget);
    const _code = _this.data('code');
    _this.addClass('selected').siblings('li').removeClass('selected');
    provinceChange(_code);
  });
  // 地市切换
  $('#city').on('click', 'li', (e) => {
    const _currentP = $('#province li.selected');
    const _this = $(e.currentTarget);
    _this.addClass('selected').siblings('li').removeClass('selected');
    $('#location .p-content').text(`${_currentP.text()} ${_this.text()}`).removeClass('grey');
    $.cookie('mallcity', `${_currentP.data('code')}|${_this.data('code')}`, { expires: 7, path: '/', domain: '.10010.com' });
    req.numRes.essProvince = _currentP.data('code') + '';
    req.numRes.essCity = _this.data('code') + '';
    req.goodsId = `${req.numRes.essProvince}${req.goodsId.substring(2)}`;
    $('#area').removeClass('slip');
    $('#number .p-content').text('');
    $('#delivery-desc').show();
    if (curCity !== _this.text()) {
      $('#delivery .p-content').text('请选择区/县').addClass('grey');
      curCity = _this.text();
    }
    setPost();
    setTimeout(() => {
      $('.mask').unbind('click').hide();
      reScroll();
    }, 300);
    $('.numberTips').hide();
    if ($(e.currentTarget).hasClass('error')) {
      $('#location').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
  });
  // 关闭弹出层
  $('.popup-close').on('click', (e) => {
    const _this = $(e.currentTarget);
    const closeType = _this.attr('data-type');
    $('#refresh').text('换一批');
    setTimeout(() => {
      $('.popup, .mask').hide();
    }, 200);
    reScroll();
    if (closeType === '3') {
      window.history.back(-1);
    }
  });
  // 首月资费弹出
  $('#firstMonth').on('click', () => {
    if ($('#firstMonth').hasClass('error')) {
      $('#firstMonth').removeClass('error');
      $('#top-desc').removeClass('error').text(_topText);
    }
    $('#chooseStyle, .mask').show();
    $('.jifei input:eq(0)').attr('checked', 'checked');
    noScroll();
    changeRaido();
  });
  // 首月资费切换
  $('#chooseStyle .content .jifei').on('click', 'p', () => {
    changeRaido();
  });
  // 号码弹出层
  $('#number').on('click', () => {
    if (commonCheck.CustCheck.checkNumAddress($('#location .p-content').text())) {
      $('#search').data('val', '').val('');
      $('#search-btn').show();
      $('#search-close-btn').hide();
      $('#refresh').removeClass('time-out');
      $('.timeOut').hide();
      setNumber();
      $('#number-popup, .mask').show();
      noScroll();
    }
  });
  // 刷新号码
  $('#refresh').on('click', (e) => {
    $('.timeOut').hide();
    const _this = $(e.currentTarget);
    if (numberParam.current > numberParam.max || _this.hasClass('time-out')) {
      _this.removeClass('time-out');
      // 重新获取号码
      setNumber();
      return;
    }
    listNumber();
  });
  // 延时，刷新号码
  $('#toRefresh').on('click', () => {
    $('.timeOut').hide();
    setNumber();
  });
  // 号码搜索
  $('#search-btn').on('click', () => {
    const _key = $('#search').val().trim();
    if (!commonCheck.isEmpty(_key)) {
      $('#search').data('val', _key);
      $('#search-btn').hide();
      $('#search-close-btn').show();
      setNumber();
    }
  });
  // 关闭搜索
  $('#search-close-btn').on('click', () => {
    $('#search').data('val', '').val('');
    $('#search-btn').show();
    $('#search-close-btn').hide();
    setNumber();
  });
  // 搜索框监控
  $('#search').on('keyup', (e) => {
    const _this = $(e.currentTarget);
    const _preKey = _this.data('val');
    if ('' + _preKey !== _this.val().trim()) {
      $('#search-btn').show();
      $('#search-close-btn').hide();
    }
    if (_this.val().trim() === '') {
      _this.data('val', '');
      setNumber();
    }
  });
  // 选择号码
  $('.number-list').on('click', 'a', (e) => {
    const _number = $(e.currentTarget).text().replace('靓', '');
    const niceRule = $(e.currentTarget).attr('data-niceRule');
    const monthLimit = $(e.currentTarget).attr('data-monthLimit');
    if (!requestFlag) {
      occupyNumber(_number, niceRule, monthLimit);
    }
  });
  // 号码被预占,重新选择号码
  $('.reselect-number').on('click', () => {
    $('#search-btn').show();
    $('#search-close-btn').hide();
    setNumber();
    $('#error').hide();
    $('#number-popup').show();
  });
  // 配送地市弹出层
  $('#delivery').on('click', () => {
    if (commonCheck.CustCheck.checkNumAddress($('#location .p-content').text())) {
      cityChange(req.post.webCity, req.post.webCounty);
      const _mask = $('.mask');
      _mask.show();
      noScroll();
      $('#post').addClass('slip');
      _mask.one('click', () => {
        $('#post').removeClass('slip');
        setTimeout(() => {
          _mask.hide();
          reScroll();
        }, 300);
      });
    }
  });
  // 邮寄地市切换
  $('#post-city').on('click', 'li', (e) => {
    const _this = $(e.currentTarget);
    const _code = _this.data('code');
    _this.addClass('selected').siblings('li').removeClass('selected');
    cityChange(_code);
  });
  // 邮寄区县切换
  $('#post-district').on('click', 'li', (e) => {
    const _currentC = $('#post-city li.selected');
    const _this = $(e.currentTarget);
    _this.addClass('selected').siblings('li').removeClass('selected');
    $('#delivery .p-content').text(`${_currentC.data('province-name')} ${_currentC.text()} ${_this.text()}`).removeClass('grey');
    req.post.webCity = _currentC.data('code') + '';
    req.post.webCounty = _this.data('code') + '';
    $('#post').removeClass('slip');
    setTimeout(() => {
      $('.mask').unbind('click').hide();
      reScroll();
    }, 300);
  });

  // 提交
  $('#submit').on('click', () => {
    if (requestFlag) {
      return;
    }
    if (verify()) {
      requestFlag = true;
      $('#top-desc').text(_topText).removeClass('error');
      preSubmit();
      submit();
      location.href = 'confirm.html';
    }
  });
  // 自适应
  $(window).resize(() => {
    resize();
  });
  // 地址输入
  $('#address').on({
    keydown: (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    },
    input: (e) => {
      const _this = $(e.currentTarget);
      const _address = _this.val();
      const _height = $('#address-temp').text(_address).height();
      _this.css('height', _height);
    },
  });
  // 页面初始化请求
  $.ajax({
    type: 'get',
    url: '/king/kingNumCard/bjlinit',
    data: initParam,
    success: (resp) => {
      if (resp.resultCode === '0000') {
        init(resp);
      } else {
        $('.mask').show();
        $('#fail').show().find('.popup-desc').text(resp.resultMsg);
        noScroll();
      }
    },
    error: () => {
      $('#overtime, .mask').show();
      noScroll();
    },
  });
  $('#mobilePhone').on('keyup', () => {
    const contactNumber = $('#mobilePhone').val();
    if (contactNumber.length === 11) {
      $('.yzm').removeClass('grey');
      $('#apply-phone').removeClass('error');
    } else {
      $('.yzm').addClass('grey');
    }
  });
  // 获取短信验证码校验
  let count = 60;
  let setYzm;
  $('.yzm').on('click', () => {
    $('#apply-yzm').removeClass('error');
    const num = $('#mobilePhone').val();
    const _this = $('.yzm');
    if (commonCheck.CustCheck.checkPhone($('#mobilePhone').val()) && isStatus) {
      isStatus = false;
      if (num !== passedPhone) {
        $('.rightI').hide();
      } else {
        $('.rightI').show();
      }
      $('#apply-phone').removeClass('error');
      $('#top-desc').text(_topText).removeClass('error');
      $.ajax({
        type: 'get',
        url: '/mall-mobile/captchaCheckMessage/send',
        data: {
          phoneVal: num,
          type: '24',
        },
      });
      setYzm = setInterval(() => {
        _this.addClass('grey');
        if (count === 0) {
          clearInterval(setYzm);
          _this.text('重新获取').removeClass('grey');
          count = 60;
          isStatus = true;
        } else {
          _this.text(count + '秒后重发');
          count -= 1;
          isStatus = false;
        }
      }, 1000);
    }
  });

  // 4位验证码校验
  let lastCaptcha = '';
  // 验证码发送请求状态
  let yzmStatus = true;
  $('#captchaText').on('keyup', () => {
    if ($('#captchaText').val().trim().length === 4 && $('#captchaText').val().trim() !== lastCaptcha) {
      const contactNumber = $('#mobilePhone').val().trim();
      if (commonCheck.isEmpty(contactNumber)) {
        commonCheck.error('mobilePhone', '请输入联系电话');
        return;
      }
      if (!commonCheck.checkMobiles(contactNumber)) {
        commonCheck.error('mobilePhone', '您的手机号码格式有误，请重新输入');
        return;
      }
      $('.rightI').hide();
      if (yzmStatus) {
        yzmStatus = false;
        $.ajax({
          url: '/king/kingNumCard/captchaCheck',
          type: 'POST',
          data: {
            phoneVal: $('#mobilePhone').val().trim(),
            captcha: $('#captchaText').val().trim(),
            type: 24,
          },
          success: (data) => {
            lastCaptcha = $('#captchaText').val().trim();
            if (data.RespCode === '0000') {
              passedPhone = $('#mobilePhone').val().trim();
              $('.rightI').show();
              $('#apply-yzm').removeClass('error');
              $('#top-desc').removeClass('error');
              setProduct();
            } else if (data.RespCode === '10001' || data.RespCode === '10002') {
              passedPhone = '';
              commonCheck.error('apply-yzm', data.RespMsg);
            } else if (data.RespCode === '10003') {
              passedPhone = '';
              if (lastCaptcha === '') {
                commonCheck.error('apply-yzm', '请输入验证码！');
              } else {
                commonCheck.error('apply-yzm', data.RespMsg);
              }
            }
            yzmStatus = true;
          },
          error: () => {
            passedPhone = '';
            commonCheck.error('apply-yzm', '验证码错误');
            yzmStatus = true;
          },
        });
      }
    } else if ($('#captchaText').val().trim().length !== 4) {
      lastCaptcha = '';
      $('.rightI').hide();
    }
  });
});
