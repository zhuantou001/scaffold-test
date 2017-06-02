/**
 * Created by Glacier on 16/11/8.
 */
import FastClick from 'fastclick';
import './index.scss';
import { resize } from '../../../common/js/commonUtils';

$(() => {
  FastClick.attach(document.body);
  // url参数解析
  function getUrlParam() {
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
  }
  // 初始化参数
  const initParam = getUrlParam();
  // 获取channel
  const channel = initParam.channel;
  // 获取手机号
  const mobile = initParam.mobile;
  resize();
  const hotArea = (obj, initS) => {
    let htm = '';
    for (let i = 0; i < obj.length; i += 1) {
      if (i === (obj.length - 1)) {
        htm += obj[i] * initS;
      } else {
        htm += obj[i] * initS;
        htm += ',';
      }
    }
    return htm;
  };
  const imgSizeS = 640;// 图片元素尺寸
  const mapHot = [410, 503, 588, 522];
  // 设置链接热点
  const setHot = (imgSize, defaultSize, hot, id) => {
    $(id).find('area').attr('coords', hotArea(hot, defaultSize / imgSize));
  };
  setHot(imgSizeS, $(document.body).width(), mapHot, '#planetmap');
  // 卡类型切换
  let product = '0';
  $('.switch li').on('click', (e) => {
    const _this = $(e.currentTarget);
    _this.addClass('checked').siblings('li').removeClass('checked');
    const _type = _this.data('type');
    let _feeTips;

    if (_type === 0) {
      _feeTips = '（非腾讯专属流量：省内1元500MB，省外2元500MB）';
      product = '0';
    } else {
      _feeTips = '（包含大王卡所有优惠，另增加500分钟国内通话时长）';
      product = '3';
    }
    $(`#fee${_type}`).show().siblings('.fee').hide();
    $('#fee-tips').text(_feeTips);
  });
  function setCenter() {
    const _width = $('.charge-desc').width();
    const _widthTips = $('.charge-desc').find('.tips').width();
    const maleft = _width - _widthTips;
    $('.charge-desc').find('.tips').css('margin-left', (maleft / 2) + 'px');
  }
  setCenter();
  // 返回顶部
  $('#go-top').on('click', () => {
    $('body').scrollTop(0);
  });
  // 跳转填写页
  $('#apply').on('click', () => {
    if (initParam.channel === undefined) {
      location.href = `fill.html?product=${product}&mobile=${mobile}`;
    } else {
      location.href = `fill.html?product=${product}&channel=${channel}&mobile=${mobile}`;
    }
  });
  // 自适应
  $(window).resize(() => {
    resize();
    setHot(imgSizeS, $(document.body).width(), mapHot, '#planetmap');
  });
});
