/**
 * 设置cookies
 *
 */
export const setCookie = (name, value) => {
  const Days = 7;
  const exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};

/**
 * 获取cookies
 *
 */
export const getCookie = (name) => {
  const strCookie = document.cookie;//获取cookie字符串
  const arrCookie = strCookie.split("; ");//分割
  //遍历匹配
  for ( var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0] == name){
      return decodeURIComponent(arr[1]);
    }
  }
  return "";
};
