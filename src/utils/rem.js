/**
 * 动态改变rem基准值.
 */
function init () {
  let docEl = document.documentElement;
  let fontEl = document.createElement('style');
  let metaEl = document.querySelector('meta[name="viewport"]');

  let dpr = window.devicePixelRatio || 1;
  let rem = docEl.clientWidth * dpr / 10;
  let scale = 1 / dpr;

  // 设置viewport，进行缩放(解决 border: 1px 问题)
  metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

  // 设置data-dpr属性，留作的css hack之用(如根据不同的 dpr 设置不同的 font-size)
  docEl.setAttribute('data-dpr', dpr);

  // 动态写入样式
  fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
  docEl.firstElementChild.appendChild(fontEl);

  // 给js调用的，某一dpr下rem和px之间的转换函数
  window.rem2px = function (r) {
    r = parseFloat(r);
    return r * rem;
  };
  window.px2rem = function (p, base) {
    let r = p / (base || 75);
    return r.toFixed(6);
  };
  window.jspx = function (r) {
    r = parseFloat(r / 75.0);
    return r * rem;
  };
}

export default {
  init
};
