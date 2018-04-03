/* 公共方法 */
import Vue from 'vue';

Vue.prototype.resize = (width = 320) => {
  const _width = window.screen.width;
  let ratio = _width / width;
  ratio = ratio > 2 ? 2 : ratio;
  document.getElementsByTagName('html')[0].style.fontSize = 16 * ratio + 'px';
};

Vue.prototype.debugConsole = () => {
  ;(function () {
    const src = '//cdn.bootcss.com/eruda/1.4.2/eruda.min.js';
    if (!/debug=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
  })();
}

/* 获取链接里的参数 */
Vue.prototype.getQueryString = function (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0;i < vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return false;
};

/* 随机数 shortid */
Vue.prototype.randomId = function () {
  let shortid = require('shortid');
  return shortid.generate();
};

/* 落地页删除组件,可多次添加 */
Vue.prototype.deleteComponent = function (setComponentsItems, getComponentsItems, index, _state, vuexData, newVuexData) {
  for (let i in setComponentsItems) {
    if (setComponentsItems[i].index === index) {
      setComponentsItems.splice(i, 1);
      break;
    }
  }
  for (let i in getComponentsItems) {
    if (getComponentsItems[i].index === index) {
      getComponentsItems.splice(i, 1);
      break;
    }
  }
  // 删除中间状态里的数据
  let list = '';
  if (_state && vuexData && newVuexData) {
    let state = this.$store.state[_state];
     list = state[vuexData];
    for (let i in list) {
      if (list[i].component_id === index || list[i].index === index) {
        list.splice(i, 1);
        this.$store.commit(newVuexData, list);
        break;
      }
    }
  }
  const dom = document.getElementById('groundPageButton' + index);
  if (dom) {
    dom.classList.remove('is-disabled');
  }
  // 按钮数量
  const setButtonNum = this.arrayInNum(this.setComponentsItems, 'setPageButton');
  const setMapNum = this.arrayInNum(this.setComponentsItems, 'setHeatMap');
  this.$store.commit('newSetButtonNum', setButtonNum);
  this.$store.commit('newSetMapNum', setMapNum);
  const setWordsNum = this.arrayInNum(this.setComponentsItems, 'setPageWords');
  this.$store.commit('newSetWordsNum', setWordsNum);
  const setWordsUrlNum = this.arrayInNum(this.setComponentsItems, 'setPageWordsUrl');
  this.$store.commit('newSetWordsUrlNum', setWordsUrlNum);
};
/* 填写页删除组件,可多次添加 */
Vue.prototype.deleteFillComponent = function (setComponentsItems, getComponentsItems, index, vuexData, newVuexData) {
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
  // 删除中间状态里的数据
  if (vuexData && newVuexData) {
    let list = this.$store.state.fill[vuexData];
    // console.log(vuexData + '、' + newVuexData + '、' + index);
    // console.log(JSON.stringify(list));
    for (let i in list) {
      if (list[i].index === index) {
        list.splice(i, 1);
        this.$store.commit(newVuexData, list);
        // console.log('删除后的:' + JSON.stringify(this.$store.state.fill[vuexData]));
      }
    }
  }
  const dom = document.getElementById(index);
  if (dom) {
    dom.classList.remove('is-disabled');
  }
  // 描述数量
  const setDescribeNum = this.arrayInNum(this.setFillComponentsItems, 'setDescribe');
  this.$store.commit('newSetDescribeNum', setDescribeNum);
};
/* 排序 按照A数组的顺序重新排列B数组, A B 两数组的index相同 */
Vue.prototype.sortAB = function (a, b) {
  let c = [];
  for (let i in a) {
    for (let j in b) {
      if (a[i].index === b[j].index) {
        c.push(b[j]);
        continue;
      }
    }
  }
  return c;
};
/* 失败信息 */
Vue.prototype.failMsg = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'warning'
  });
};
/* 成功信息 */
Vue.prototype.successMsg = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success'
  });
};
// 判断数组里是否含有item组件
Vue.prototype.arrayIn = function (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].component === item) {
      return true;
    }
  }
  return false;
};
// 判断数组里是否含有item组件,返回组件数量
Vue.prototype.arrayInNum = function (arr, item) {
  let n = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].component === item) {
      n++;
    }
  }
  return n;
};
// 判断数组里是否含有item组件,根据索引值返回组件索引
Vue.prototype.arrayInSort = function (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].index === item) {
      return i;
    }
  }
  return false;
};
// 判断数组里是否含有item组件,根据组件名称返回组件索引
Vue.prototype.arrayInNameSort = function (arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].component === item) {
      return i;
    }
  }
  return false;
};
// 判断数组里是否含有某个字段
Vue.prototype.arrayInData = function (arr, key, item) {
  for (let i = 0; i < arr.length; i++) {
    // alert(arr[i][key]);
    if (arr[i][key] === item) {
      return true;
    }
  }
  return false;
};
// 判断数组里是否含有某个元素
Vue.prototype.isInArray = function (arr, key) {
  for (let i = 0; i < arr.length; i++) {
    // alert(arr[i][key]);
    if (arr[i] === key) {
      return true;
    }
  }
  return false;
};
// 去掉数组里的空字段
Vue.prototype.arrayRemoveNull = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    // alert(arr[i]);
    if (arr[i] === null || arr[i] === '' || arr[i] === undefined) {
      arr.splice(i,1);
      i = i-1;
    }
  }
  return arr;
};
Vue.prototype.isUndefine = function (key, value) {
  if (key !== undefined) {
    return key;
  } else {
    return value;
  }
};
// 落地页需要提交的数据
Vue.prototype.scaffoldData = function (categoryId, pageId) {
  // 获取显示的左侧组件,用于判断是否启用了该组件
  const setComponentsItems = this.$store.state.app.setComponentsItems;
  // console.log(' setComponentsItems:' + JSON.stringify(setComponentsItems));
  const pageData = {};
  if (!pageId) {
    pageId = '';
  }
  pageData.page_id = pageId;
  pageData.category_id = categoryId; // 文件夹ID
  pageData.page_title = this.$store.state.topImg.pageTitle;
  pageData.page_alias = this.$store.state.topImg.pageUrl;
  pageData.page_desc_content = this.$store.state.topImg.pageDescContent || '页面描述内容';
  pageData.page_desc_style = ''; // 页面描述样式
  pageData.page_type = 'index';
  pageData.show_top_image = '';
  pageData.img_list = {};
  pageData.anchor_content = '';
  pageData.anchor_style = '';
  pageData.anchor_url = '';
  pageData.create_date = ''; // 创建时间
  pageData.operator = JSON.parse(localStorage.getItem('user')).id; // 操作人 用户id
  let pageContent = {};
  // 判断是否有嵌码
  pageContent.embedCode = {};
  if (this.arrayIn(setComponentsItems, 'setEmbedCode')){
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setEmbedCode');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.embedCode = this.$store.state.topImg.embedCode;
    pageContent.embedCode = obj;
  }
  // 判断页面中是否有背景
  pageContent.page_bg = {};
  if (this.arrayIn(setComponentsItems, 'setPageBg')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setPageBg');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.page_bg_type = this.$store.state.background.pageBg.bgRadio; // 页面背景类型(0-无, 1-纯色, 2-图片)
    if (obj.page_bg_type === 0) {
      obj.page_color = '#ffffff';
      obj.page_img = '';
    }else if (obj.page_bg_type === 1) {
      obj.page_color = this.$store.state.background.pageBg.bgColor;
      obj.page_img = '';
    } else if (obj.page_bg_type === 2) {
      obj.page_color = '#ffffff';
      obj.page_img = this.$store.state.background.pageBg.bgImg;
      // 主字段
      pageData.img_list.backgroundImg = this.$store.state.background.pageBg.bgImg;
    }
    pageContent.page_bg = obj;
  } else {
    pageContent.page_bg.page_color = '#ffffff';
    pageContent.page_bg.page_img = '';
  }
  // 判断有无分享
  pageContent.share = {};
  if (this.arrayIn(setComponentsItems, 'setPageShare')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setPageShare');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.share_title = this.isUndefine(this.$store.state.share.share_title, '');
    obj.share_type = this.isUndefine(this.$store.state.share.share_type, [0]);
    obj.share_desc = this.isUndefine(this.$store.state.share.share_desc, '');
    obj.share_url = this.isUndefine(this.$store.state.share.share_url, '');
    pageContent.share = obj;
  }
  // 判断页面中是否有选项卡
  pageContent.sim_detail = {};
  if (this.arrayIn(setComponentsItems, 'setSwitch')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setSwitch');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.sim_color_check = this.$store.state.button.simObject.simColLA;
    obj.sim_color_uncheck = this.$store.state.button.simObject.simColRA;
    obj.sim_color_checkB = this.$store.state.button.simObject.simColLB;
    obj.sim_color_uncheckB = this.$store.state.button.simObject.simColRB;
    obj.setBorderColor = this.$store.state.options.setBorderColor;
    obj.setBackgroundColor = this.$store.state.options.setBackgroundColor;
    obj.setCheckBgColor = this.$store.state.options.setCheckBgColor;
    obj.setPosition = this.$store.state.options.setPosition;
    obj.tabDefSwitch = this.$store.state.options.tabDefSwitch;
    obj.scaffold_option = [];
    const optionNum = this.$store.state.options.switch_num;
    for (let i = 0; i < optionNum; i++) {
      const option = {};
      if (this.$store.state.options.options['switch_title0' + (i + 1)]) {
        option.option_title = this.$store.state.options.options['switch_title0' + (i + 1)]; // 选项卡标题
        option.option_content = this.$store.state.options.options['switch_content0' + (i + 1)]; // 选项卡内容
        option.productId = this.$store.state.options.options['switch_productId0' + (i + 1)]; // 选项卡内容
        option.switchScale = this.isUndefine(this.$store.state.options.options['switch_scale0' + (i + 1)], ''); // 内容缩放
      } else {
        option.option_title = '';
        option.option_content = '';
        option.switchScale = '';
      }
      obj.scaffold_option.push(option);
      pageContent.sim_detail = obj;
    }
  }
  // 判断页面中是否有选项卡Slide
  pageContent.sim_Slide = {};
  if (this.arrayIn(setComponentsItems, 'setSwitchSlide')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setSwitchSlide');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.radioSwitch = this.$store.state.options.switchSlide.radioSwitch;
    obj.switchShowStyleTwo = this.$store.state.options.switchSlide.switchShowStyleTwo;
    obj.switchShowStyle = this.$store.state.options.switchSlide.switchShowStyle;
    obj.defSwitch = this.$store.state.options.switchSlide.defSwitch;
    obj.radioBackground = this.$store.state.options.switchSlide.radioBackground;
    obj.tabBackgroundColor = this.$store.state.options.switchSlide.tabBackgroundColor;
    obj.isCheckedFont = this.$store.state.options.switchSlide.isCheckedFont;
    obj.checkedFont = this.$store.state.options.switchSlide.checkedFont;
    obj.checkedBackgroundColor = this.$store.state.options.switchSlide.checkedBackgroundColor;
    obj.checkedFontColor = this.$store.state.options.switchSlide.checkedFontColor;
    obj.productPosition = this.$store.state.options.switchSlide.productPosition;
    obj.switchImg = this.$store.state.options.switchSlide.switchImg;
    pageContent.sim_Slide = obj;
  }

  // 判断页面中是否有多图选项卡Image
  pageContent.sim_Image = {};
  if (this.arrayIn(setComponentsItems, 'setSwitchImage')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setSwitchImage');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.switchNum = this.$store.state.options.switchImage.switchNum;
    obj.defSwitch = this.$store.state.options.switchImage.defSwitch;
    obj.setDotColor = this.$store.state.options.switchImage.setDotColor;
    obj.productPosition = this.$store.state.options.switchImage.productPosition;
    obj.switchImg = this.$store.state.options.switchImage.switchImg;
    pageContent.sim_Image = obj;
  }

  // 判断是否有产品参数key值
  if (this.arrayIn(setComponentsItems, 'setSwitchSlide') || this.arrayIn(setComponentsItems, 'setSwitch') || this.arrayIn(setComponentsItems, 'setSwitchImage')) {
    pageContent.productKey = this.$store.state.options.productKey;
  }

  // 判断页面中是否有fixedButton固定位置按钮
  pageContent.fixedButton = {};
  if (this.arrayIn(setComponentsItems, 'setFixedButton')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setFixedButton');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.menu = this.$store.state.button.fixedButton.menu;
    obj.button = this.$store.state.button.fixedButton.button;
    obj.application = this.$store.state.button.fixedButton.application;
    obj.userAgent = this.$store.state.button.fixedButton.userAgent;
    pageContent.fixedButton = obj;
  }

  // 判断页面中是否有按钮
  // console.log(this.$store.state.button.buttons);
  pageContent.button_detail = [];
  const num = this.arrayInNum(setComponentsItems, 'setPageButton');
  if (num) {
    for (let i = 0;i < num; i++) {
      const obj = {};
      obj.component_id = this.$store.state.button.buttons[i].component_id;
      obj.button_Kinds = this.isUndefine(this.$store.state.button.buttons[i].button_Kinds, 0); // 冰激凌王卡按钮状态
      if (this.isUndefine(this.$store.state.button.buttons[i].button_Kinds, 0) === 0) {
        obj.button_width = this.isUndefine(this.$store.state.button.buttons[i].button_width, 280); // 按钮宽度
      } else {
        obj.button_width = this.isUndefine(this.$store.state.button.buttons[i].button_width, 190); // 按钮宽度
      }
      obj.button_name = this.isUndefine(this.$store.state.button.buttons[i].button_name, '请输入按钮文字'); // 按钮文字
      obj.btn_font_type = this.isUndefine(this.$store.state.button.buttons[i].btn_font_type, 0); // 按钮文字类型
      obj.button_font_size = this.isUndefine(this.$store.state.button.buttons[i].button_font_size, 16); // 按钮文字大小
      obj.button_bg_type = this.isUndefine(this.$store.state.button.buttons[i].button_bg_type, 0); // 按钮背景类型
      if (obj.button_bg_type === 0) { // 选择纯色类型
        obj.button_bg_url = '';
        obj.button_color = this.isUndefine(this.$store.state.button.buttons[i].button_color, '#20a0ff'); // 按钮背景颜色
      } else {
        obj.button_color = '#20a0ff';
        obj.button_bg_url = this.isUndefine(this.$store.state.button.buttons[i].button_bg_url, ''); // 按钮背景图片
      }
      obj.button_front_color = this.isUndefine(this.$store.state.button.buttons[i].button_front_color, '#ffffff'); // 按钮文字颜色
      obj.button_radius =this.isUndefine(this.$store.state.button.buttons[i].button_radius, ''); // 按钮圆角
      obj.button_link_way = this.isUndefine(this.$store.state.button.buttons[i].button_link_way, 0); // 链接跳转方式
      obj.button_fill_alias = this.isUndefine(this.$store.state.button.buttons[i].button_fill_alias, ''); // 跳转填写页别名
      obj.clickButton = this.isUndefine(this.$store.state.button.buttons[i].clickButton, 0); // 按钮点击状态
      obj.link_name = this.isUndefine(this.$store.state.button.buttons[i].link_name, '查询订单'); // 文字链文字
      obj.link_color = this.isUndefine(this.$store.state.button.buttons[i].link_color, '#000000'); // 文字链颜色
      obj.link_alias = this.isUndefine(this.$store.state.button.buttons[i].link_alias, ''); // 文字链跳转地址
      obj.btn_margin_left = this.isUndefine(this.$store.state.button.buttons[i].btn_margin_left, 0); // 按钮和左面区域的距离
      obj.btn_margin_top = this.isUndefine(this.$store.state.button.buttons[i].btn_margin_top, 0); // 按钮和上面区域的距离
      obj.btn_margin_bottom = this.isUndefine(this.$store.state.button.buttons[i].btn_margin_bottom, 0); // 按钮和下面区域的距离
      obj.sort = this.arrayInSort(setComponentsItems, obj.component_id);
     // console.log(obj.sort);
      if (obj.sort) {
        pageContent.button_detail.push(obj);
      } else {
        this.failMsg('添加按钮失败,请重新添加');
        return false;
      }
    }
  }
  // 判断页面中是否有热力图
  pageContent.heat_map = [];
  const mapLen = this.arrayInNum(setComponentsItems, 'setHeatMap');
  if (mapLen) {
    for (let i = 0; i < mapLen; i++ ) {
      const obj = {};
      obj.component_id = this.$store.state.detailImg.mapHots[i].component_id;
      obj.map_hot =  this.isUndefine(this.$store.state.detailImg.mapHots[i].map_hot, '');
      obj.img_width =  this.isUndefine(this.$store.state.detailImg.mapHots[i].img_width, '');
      obj.map_id =  this.isUndefine(this.$store.state.detailImg.mapHots[i].map_id, '');
      obj.map_url =  this.isUndefine(this.$store.state.detailImg.mapHots[i].map_url, '');
      obj.sort = this.arrayInSort(setComponentsItems, obj.component_id);
     // console.log(obj.sort)
      if (obj.sort) {
        pageContent.heat_map.push(obj);
      } else {
         return false;
      }
    }
  }
  // 判断页面中是否有文本
  pageContent.word_detail = [];
  const count = this.arrayInNum(setComponentsItems, 'setPageWords');
  // console.log(num);
  if (count != 0) {
    // alert('num: ' + num);
    for (let i = 0; i < count; i++ ) {
      const obj = {};
      obj.component_id = this.$store.state.button.wordsArr[i].index;
      if (this.$store.state.button.wordsArr[i].wordsContent) {
        obj.word_content = this.$store.state.button.wordsArr[i].wordsContent;
        obj.wordScale = this.$store.state.button.wordsArr[i].wordScale;
      } else {
        obj.word_content = '';
        obj.wordScale = '';
      }
      obj.sort = this.arrayInSort(setComponentsItems, obj.component_id);
      // console.log(obj.sort);
      // console.log('描述测试');
      // console.log(JSON.stringify(setFillComponentsItems));
      // console.log(obj.id);
      if (obj.sort) {
        pageContent.word_detail.push(obj);
      } else {
        // return false;
      }
      // console.log(JSON.stringify(fillData.page_content.fill_desc));
    }
  }
  // if (this.arrayIn(setComponentsItems, 'setPageWords')) {
  //   let obj = {};
  //   obj.sort = this.arrayInNameSort(setComponentsItems, 'setPageWords');
  //   obj.component_id = setComponentsItems[obj.sort].index;
  //   obj.word_content = this.$store.state.button.wordsContent;
  //   pageContent.word_detail = obj;
  // }
  // 超文本内容
  pageContent.link_detail = [];
  const number = this.arrayInNum(setComponentsItems, 'setPageWordsUrl');
  // console.log(num);
  if (number != 0) {
    // alert('num: ' + num);
    for (let i = 0; i < number; i++) {
      const obj = {};
      obj.component_id = this.$store.state.button.wordsUrlArr[i].index;
      if (this.$store.state.button.wordsUrlArr[i].wordsContent) {
        obj.link_content = this.$store.state.button.wordsUrlArr[i].wordsContent;
        obj.link_url = this.$store.state.button.wordsUrlArr[i].wordsUrl;
      } else {
        obj.link_content = '';
        obj.link_url = '';
      }
      obj.sort = this.arrayInSort(setComponentsItems, obj.component_id);
      // console.log(obj.sort);
      // console.log('描述测试');
      // console.log(JSON.stringify(setFillComponentsItems));
      // console.log(obj.id);
      if (obj.sort) {
        pageContent.link_detail.push(obj);
      } else {
        // return false;
      }
      // console.log(JSON.stringify(fillData.page_content.fill_desc));
    }
  }
  // if (this.arrayIn(setComponentsItems, 'setPageWordsUrl')) { // 判断页面中是否有超文本
  //   let obj = {};
  //   obj.sort = this.arrayInNameSort(setComponentsItems, 'setPageWordsUrl');
  //   obj.component_id = setComponentsItems[obj.sort].index;
  //   obj.link_content = this.$store.state.button.wordsUrlObject.wordsContent;
  //   obj.link_url = this.$store.state.button.wordsUrlObject.wordsUrl;
  //   pageContent.link_detail = obj;
  // }
  // 头图
  pageContent.top_img_detail = {};
  if (this.arrayIn(setComponentsItems, 'setTopImg')) {
    // let obj = {};
    // obj.sort = this.arrayInNameSort(setComponentsItems, 'setTopImg');
    // obj.component_id = setComponentsItems[obj.sort].index;
    // obj.image_url = this.$store.state.topImg.topImgUrl;
    // obj.image_name = this.$store.state.topImg.topImgName;
    // pageContent.top_img_detail = obj;
    // 头图显示第一张图片
    if (this.$store.state.topImg.topImgFileList.length) {
      pageData.top_img_url = this.$store.state.topImg.topImgFileList[0].image_url;
    }
    // pageData.img_list.topImg = this.$store.state.topImg.topImgUrl;
    // 头图列表
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setTopImg');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.num = this.$store.state.topImg.topImgFileList.length;
    let array = [];
    for (let i = 0; i < obj.num; i++) {
      const topImage = {};
      topImage.image_url = this.$store.state.topImg.topImgFileList[i].image_url; // 图片url
      topImage.image_name = this.$store.state.topImg.topImgFileList[i].name;
      topImage.image_order = i; // 图片展示顺序
      array.push(topImage);
      // put in img_List
      pageData.img_list['topImage' + i] = this.$store.state.topImg.topImgFileList[i].image_url;
    }
    obj.images = array;
    pageContent.top_img_detail = obj;
  }
  // 详情图
  pageContent.detail_img_detail = {};
  if (this.arrayIn(setComponentsItems, 'setDetailImg')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setDetailImg');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.num = this.$store.state.detailImg.detailImgFileList.length;
    let array = [];
    for (let i = 0; i < obj.num; i++) {
      const detailImage = {};
      detailImage.image_url = this.$store.state.detailImg.detailImgFileList[i].image_url; // 图片url
      detailImage.image_name = this.$store.state.detailImg.detailImgFileList[i].name;
      detailImage.image_order = i; // 图片展示顺序
      array.push(detailImage);
      // 主字段
      pageData.img_list['detailImg' + i] = this.$store.state.detailImg.detailImgFileList[i].image_url;
    }
    obj.images = array;
    pageContent.detail_img_detail = obj;
  }
  // 浮窗
  pageContent.floatWindow = {};
  if (this.arrayIn(setComponentsItems, 'setFloatWindow')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setFloatWindow');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.num = this.$store.state.floatImg.floatImgFileList.length;
    obj.image_width = this.$store.state.app.consult[0].width;
    obj.image_height = this.$store.state.app.consult[0].height;
    obj.image_radius = this.$store.state.app.consult[0].radius;
    obj.image_top = this.$store.state.app.consult[0].top;
    obj.image_right = this.$store.state.app.consult[0].right;
    obj.image_hrefUrl = this.$store.state.app.consult[0].hrefUrl;
    let array = [];
    for (let i = 0; i < obj.num; i++) {
      const floatImg = {};
      floatImg.image_url = this.$store.state.floatImg.floatImgFileList[i].image_url; // 图片url
      floatImg.image_name = this.$store.state.floatImg.floatImgFileList[i].name;
      floatImg.image_order = i; // 图片展示顺序
      array.push(floatImg);
    }
    obj.images = array;
    pageContent.floatWindow = obj;
  }
  // app
  pageContent.app_detail = {};
  if (this.arrayIn(setComponentsItems, 'setApplyDownload')) {
    let obj = {};
    obj.sort = this.arrayInNameSort(setComponentsItems, 'setApplyDownload');
    obj.component_id = setComponentsItems[obj.sort].index;
    obj.num = this.$store.state.applyDownload.appliesList.length;
    obj.title = this.$store.state.applyDownload.applyDownloadTitle; // 应用下载主标题
    let array = [];
    for (let i = 0; i < obj.num; i++) {
      const app = {};
      app.app_title = this.$store.state.applyDownload.appliesList[i].appliesTitle; // 应用标题
      app.app_image = this.$store.state.applyDownload.appliesList[i].appliesImgUrl; // 图片Base64
      app.image_name = this.$store.state.applyDownload.appliesList[i].appliesImgName; // 图片名字
      app.button_name = this.$store.state.applyDownload.appliesList[i].appliesButtonText; // 按钮文字
      app.app_url = this.$store.state.applyDownload.appliesList[i].appliesHref; // 链接地址
      app.app_order = ''; // 应用顺序
      array.push(app);
      // 主字段
      pageData.img_list['appImg' + i] = this.$store.state.applyDownload.appliesList[i].appliesImgUrl;

    }
    obj.apps = array;
    pageContent.app_detail = obj;
  }
  let _pageContent = {
    vertical: {},
    horizontal: {}
  };
  if (!localStorage.getItem('projectData')) {
    console.log('增加横竖屏功能后新增页面')
    console.log(this.$store.state.topImg.screenType)
    if (this.$store.state.topImg.screenType === 'vertical' ) {
      _pageContent.vertical = pageContent;
    } else {
      _pageContent.horizontal = pageContent;
    }
  } else {
    console.log('编辑页面')
    console.log(this.$store.state.topImg.screenType)
    let _projectData = JSON.parse(localStorage.getItem('projectData'));
    if (!_projectData.page_content.vertical) {
      console.log('增加横竖屏功能前的装修页面--编辑')
      _pageContent.vertical = pageContent;
    } else {
      console.log('增加横竖屏功能后的新页面--编辑')
      if (this.$store.state.topImg.screenType === 'vertical' ) {
        _pageContent.vertical = pageContent;
        _pageContent.horizontal = _projectData.page_content.horizontal;
      } else {
        _pageContent.horizontal = pageContent;
        _pageContent.vertical = _projectData.page_content.vertical;
      }
    }
  }
  // 横竖屏是否生效
  _pageContent.page_effectH = this.$store.state.topImg.effectH;
  pageData.page_content = _pageContent;
  // console.log(JSON.stringify(pageData.page_content))
  //  console.log(pageData)
  return pageData;
};
// 落地页获取的数据
Vue.prototype.obtainData = function (data) {
 // console.log(JSON.parse(localStorage.getItem('projectData')))
  // console.log(JSON.stringify(data));
  let getComponentsItems = [];
  let setComponentsItems = [{'component': 'setPageTitle', 'index': 0, 'fixed': true}];
 // let setComponentsItems = [];
  this.$store.commit('newPageTitle', data.page_title);
  this.$store.commit('newPageUrl', data.page_alias);
  if (data.page_content && data.page_content.page_effectH) {
    this.$store.commit('newEffectH', data.page_content.page_effectH);
  } else {
    this.$store.commit('newEffectH', 0);
  }
  // this.$store.commit('newPageDescContent', data.page_desc_content);
  //   "page_desc_style": "",
  //   "page_state": "",
  //   "page_type": "",
  let pageContent = {};
  // 判断页面数据中是否有横竖屏标志
  if (data.page_content) {
    if (!data.page_content.vertical) {
      pageContent = data.page_content;
    } else {
      if (this.$store.state.topImg.screenType === 'vertical') {
        pageContent = data.page_content.vertical;
      } else {
        pageContent = data.page_content.horizontal;
      }
    }
  }
  // 判断是否有嵌码
  if(pageContent.embedCode && pageContent.embedCode.sort > 0){
    setComponentsItems[pageContent.embedCode.sort] = {
      'component': 'setEmbedCode',
      'index': pageContent.embedCode.component_id
    };
    this.$store.commit('newEmbedCode', pageContent.embedCode.embedCode);
  } else {
    this.$store.commit('newEmbedCode', {codeUrl: ''});
  }
  // 判断是否有背景
  if (pageContent.page_bg && pageContent.page_bg.sort && pageContent.page_bg.sort > 0) {
    setComponentsItems[pageContent.page_bg.sort] = {
      'component': 'setPageBg',
      'index': pageContent.page_bg.component_id
    };
    let obj = {};
    obj.bgRadio = pageContent.page_bg.page_bg_type;
    obj.bgColor = pageContent.page_bg.page_color;
    obj.bgImg = pageContent.page_bg.page_img;
    this.$store.commit('newPageBg', obj);
  } else {
    this.$store.commit('newPageBg', {bgRadio: 0, bgColor: '#ffffff', bgImg: ''});
  }
  // 判断是否有分享
  if (pageContent.share && pageContent.share.sort > 0) {
    setComponentsItems[pageContent.share.sort] = {
      'component': 'setPageShare',
      'index': pageContent.share.component_id
    };
    getComponentsItems[pageContent.share.sort] = {
      'component': 'getPageShare',
      'index': pageContent.share.component_id
    };
    const share_type = pageContent.share.share_type;
    const share_title = pageContent.share.share_title;
    const share_desc = pageContent.share.share_desc;
    const share_url = pageContent.share.share_url;
    this.$store.commit('newShareType', share_type);
    this.$store.commit('newShareTitle', share_title);
    this.$store.commit('newShareDesc', share_desc);
    this.$store.commit('newShareUrl', share_url);
  } else {
    this.$store.commit('newShareType', [0]);
    this.$store.commit('newShareTitle', '');
    this.$store.commit('newShareDesc', '');
    this.$store.commit('newShareUrl', '');
  }
  // 判断是否有选项卡
  if (pageContent.sim_detail && pageContent.sim_detail.sort > 0) {
    setComponentsItems[pageContent.sim_detail.sort] = {
      'component': 'setSwitch',
      'index': pageContent.sim_detail.component_id
    };
    getComponentsItems[pageContent.sim_detail.sort] = {
      'component': 'getSwitch',
      'index': pageContent.sim_detail.component_id
    };
    let optionColor = {};
    optionColor.simColLA = pageContent.sim_detail.sim_color_check;
    optionColor.simColRA = pageContent.sim_detail.sim_color_uncheck;
    if (pageContent.sim_detail.sim_color_checkB && pageContent.sim_detail.sim_color_uncheckB) {
      optionColor.simColLB = pageContent.sim_detail.sim_color_checkB;
      optionColor.simColRB = pageContent.sim_detail.sim_color_uncheckB;
    } else {
      optionColor.simColLB = '#ffffff';
      optionColor.simColRB = '#ffffff';
    }
    this.$store.commit('newSimObject', optionColor);
    // 加载边框颜色和背景颜色
    if (pageContent.sim_detail.setBorderColor) {
      this.$store.commit('newSetBorderColor', pageContent.sim_detail.setBorderColor);
    } else {
      this.$store.commit('newSetBorderColor', '#cccccc');
    }
    if (pageContent.sim_detail.setBackgroundColor) {
      this.$store.commit('newSetBackgroundColor', pageContent.sim_detail.setBackgroundColor);
    } else {
      this.$store.commit('newSetBackgroundColor', '#ffffff');
    }
    if (pageContent.sim_detail.setCheckBgColor) {
      this.$store.commit('newSetCheckBgColor', pageContent.sim_detail.setCheckBgColor);
    } else {
      this.$store.commit('newSetCheckBgColor', '#ffffff');
    }
    if (pageContent.sim_detail.setPosition) {
      this.$store.commit('newSetPosition', pageContent.sim_detail.setPosition);
    } else {
      this.$store.commit('newSetPosition', 0);
    }
    if (pageContent.sim_detail.tabDefSwitch) {
      this.$store.commit('newTabDefSwitch', pageContent.sim_detail.tabDefSwitch);
    } else {
      this.$store.commit('newTabDefSwitch', 1);
    }
    // 选项卡内容
    let option = {};
    for (let i = 0; i < pageContent.sim_detail.scaffold_option.length; i++) {
      option['switch_title0' + (i + 1)] = pageContent.sim_detail.scaffold_option[i]['option_title'];
      option['switch_content0' + (i + 1)] = pageContent.sim_detail.scaffold_option[i]['option_content'];
      option['switch_productId0' + (i + 1)] = pageContent.sim_detail.scaffold_option[i]['productId'];
      option['switch_scale0' + (i + 1)] = pageContent.sim_detail.scaffold_option[i]['switchScale'];
    }
    this.$store.commit('newSwitchObject', option);
    this.$store.commit('newSwitchNum', pageContent.sim_detail.scaffold_option.length); // 选项卡数量
  } else {
    this.$store.commit('newSimObject', {simColLA: '#ff6600', simColLB: '#ffffff', simColRA: '#cccccc', simColRB: '#ffffff'});
    this.$store.commit('newSetBorderColor', '#cccccc');
    this.$store.commit('newSetBackgroundColor', '#ffffff');
    this.$store.commit('newSetCheckBgColor', '#ffffff');
    this.$store.commit('newSetPosition', 0);
    this.$store.commit('newSwitchObject', {
      switch_title01: '选项卡标题01',
      switch_title02: '选项卡标题02',
      switch_title03: '选项卡标题03',
      switch_productId01: 'product01',
      switch_productId02: 'product02',
      switch_productId03: 'product03',
      switch_content01: '选项卡内容01',
      switch_content02: '选项卡内容02',
      switch_content03: '选项卡内容03',
      switch_scale01: 0.9,
      switch_scale02: 0.9,
      switch_scale03: 0.9
    });
    this.$store.commit('newSwitchNum','2'); // 选项卡数量
  }

  // 判断是否有选项卡Slide
  if(pageContent.sim_Slide){
    if (pageContent.sim_Slide.sort > 0) {
      setComponentsItems[pageContent.sim_Slide.sort] = {
        'component': 'setSwitchSlide',
        'index': pageContent.sim_Slide.component_id
      };
      getComponentsItems[pageContent.sim_Slide.sort] = {
        'component': 'getSwitchSlide',
        'index': pageContent.sim_Slide.component_id
      };
      let obj = {};
      obj.radioSwitch = pageContent.sim_Slide.radioSwitch;
      obj.defSwitch = pageContent.sim_Slide.defSwitch;

      if (pageContent.sim_Slide.switchShowStyleTwo) {
        obj.switchShowStyleTwo = pageContent.sim_Slide.switchShowStyleTwo;
      } else {
        obj.switchShowStyleTwo = 1;
      }
      if (pageContent.sim_Slide.switchShowStyle) {
        obj.switchShowStyle = pageContent.sim_Slide.switchShowStyle;
      } else {
        obj.switchShowStyle = 1;
      }
      if (pageContent.sim_Slide.radioBackground) {
        obj.radioBackground = pageContent.sim_Slide.radioBackground;
      } else {
        obj.radioBackground = 1;
      }
      if (pageContent.sim_Slide.tabBackgroundColor) {
        obj.tabBackgroundColor = pageContent.sim_Slide.tabBackgroundColor;
      } else {
        obj.tabBackgroundColor = '#ffffff';
      }
      if (pageContent.sim_Slide.isCheckedFont) {
        obj.isCheckedFont = pageContent.sim_Slide.isCheckedFont;
      } else {
        obj.isCheckedFont = 1;
      }
      obj.checkedFont = pageContent.sim_Slide.checkedFont;
      obj.checkedBackgroundColor = pageContent.sim_Slide.checkedBackgroundColor;
      obj.checkedFontColor = pageContent.sim_Slide.checkedFontColor;
      if (pageContent.sim_Slide.productPosition) {
        obj.productPosition = pageContent.sim_Slide.productPosition;
      } else {
        obj.productPosition = 0;
      }
      obj.switchImg = pageContent.sim_Slide.switchImg;
      this.$store.commit('newSwitchSlide', obj);
    }
  } else {
    this.$store.commit('newSwitchSlide', {radioSwitch: 1, defSwitch: 1,radioBackground: 1, tabBackgroundColor: '#ffffff',isCheckedFont: 1, checkedFont: '已选', checkedBackgroundColor: '#4ca9d4', checkedFontColor: '#ffffff', productPosition: 0, switchImg: [{id: 1, image: '', productId: '', productName: ''}]});
  }
  // 判断是否有多图选项卡
  if (pageContent.sim_Image && pageContent.sim_Image.sort > 0) {
    setComponentsItems[pageContent.sim_Image.sort] = {
      'component': 'setSwitchImage',
      'index': pageContent.sim_Image.component_id
    };
    getComponentsItems[pageContent.sim_Image.sort] = {
      'component': 'getSwitchImage',
      'index': pageContent.sim_Image.component_id
    };
    let obj = {};
    obj.switchNum = pageContent.sim_Image.switchNum;
    obj.defSwitch = pageContent.sim_Image.defSwitch;
    obj.setDotColor = pageContent.sim_Image.setDotColor;
    obj.productPosition = pageContent.sim_Image.productPosition;
    obj.switchImg = pageContent.sim_Image.switchImg;
    this.$store.commit('newSwitchImage', obj);
  }
    // 判断是否有产品参数key值
  if (pageContent.sim_detail || pageContent.sim_Slide || pageContent.sim_Image) {
    if(pageContent.productKey) {
      this.$store.commit('newProductKey', pageContent.productKey);
    } else {
      this.$store.commit('newProductKey', 'product');
    }
  } else {
    this.$store.commit('newProductKey', 'product');
  }

  // 判断是否有fixedButton固定位置按钮
  if (pageContent.fixedButton && pageContent.fixedButton.sort > 0) {
    setComponentsItems[pageContent.fixedButton.sort] = {
      'component': 'setFixedButton',
      'index': pageContent.fixedButton.component_id
    };
    getComponentsItems[pageContent.fixedButton.sort] = {
      'component': 'getFixedButton',
      'index': pageContent.fixedButton.component_id
    };
    let obj = {};
    obj.menu = pageContent.fixedButton.menu;
    obj.button = pageContent.fixedButton.button;
    obj.application = pageContent.fixedButton.application;
    obj.userAgent = pageContent.fixedButton.userAgent;
    this.$store.commit('newFixedButton', obj);
  }

  // 判断按钮
  let button_detail = pageContent.button_detail;
  let btnArr = [];
  // console.log('before', btnArr);
  if (button_detail instanceof Array && button_detail.length > 0) {
    for (let i = 0; i < button_detail.length; i++) {
      setComponentsItems[button_detail[i].sort] = {
        'component': 'setPageButton',
        'index': button_detail[i].component_id
      };
      getComponentsItems[button_detail[i].sort] = {
        'component': 'getPageButton',
        'index': button_detail[i].component_id
      };
    }
    btnArr = button_detail;
  } else if (button_detail && JSON.stringify(button_detail) !== '{}' && button_detail.length !== 0) {
    setComponentsItems[button_detail.sort] = {
      'component': 'setPageButton',
      'index': button_detail.component_id
    };
    getComponentsItems[button_detail.sort] = {
      'component': 'getPageButton',
      'index': button_detail.component_id
    };
    btnArr.push(button_detail);
   // console.log(button_detail)
  }
  // console.log(btnArr.length)
  this.$store.commit('newSetButtonNum', btnArr.length);
  // console.log(arr);
  this.$store.commit('newButtons', btnArr);
  // 热力图
  let heat_map = pageContent.heat_map;
  let heatArr = [];
  if (heat_map && heat_map.length > 0) {
    for (let i = 0; i < heat_map.length; i++) {
      setComponentsItems[heat_map[i].sort] = {
        'component': 'setHeatMap',
        'index': heat_map[i].component_id
      };
      // getComponentsItems[heat_map[i].sort] = {
      //   'component': 'getPageButton',
      //   'index': heat_map[i].component_id
      // };
    }
    heatArr = heat_map;
  }
  this.$store.commit('newSetMapNum', heatArr.length);
  // console.log('heatArr', heatArr);
  this.$store.commit('newMapHots', heatArr);
  // 文本内容
  if (pageContent.word_detail instanceof Array && pageContent.word_detail.length > 0) {
    this.$store.commit('newSetWordsNum', pageContent.word_detail.length);
    let arr = [];
    for (let i in pageContent.word_detail) {
      const obj = {};
      obj.index = pageContent.word_detail[i].component_id;
      obj.wordsContent = pageContent.word_detail[i].word_content;
      obj.wordScale = pageContent.word_detail[i].wordScale;
      arr.push(obj);
      setComponentsItems[pageContent.word_detail[i].sort] = {
        'component': 'setPageWords',
        'index': pageContent.word_detail[i].component_id
      };
      getComponentsItems[pageContent.word_detail[i].sort] = {
        'component': 'getPageWords',
        'index': pageContent.word_detail[i].component_id
      };
    }
    this.$store.commit('newWordsArr', arr);
    // console.log('描述数据: ' + JSON.stringify(arr));
  } else if (pageContent.word_detail && pageContent.word_detail.sort > 0) {
    setComponentsItems[pageContent.word_detail.sort] = {
      'component': 'setPageWords',
      'index': pageContent.word_detail.component_id
    };
    getComponentsItems[pageContent.word_detail.sort] = {
      'component': 'getPageWords',
      'index': pageContent.word_detail.component_id
    };
    this.$store.commit('newWordsArr', [{
      index: pageContent.word_detail.component_id,
      wordsContent: pageContent.word_detail.word_content,
      wordScale: pageContent.word_detail.wordScale
    }]);
    this.$store.commit('newSetWordsNum', 1);
  } else {
    this.$store.commit('newWordsArr',[]);
    this.$store.commit('newSetWordsNum', 0);
  }
  // if (pageContent.word_detail.sort > 0) {
  //   setComponentsItems[pageContent.word_detail.sort] = {
  //     'component': 'setPageWords',
  //     'index': pageContent.word_detail.component_id
  //   };
  //   getComponentsItems[pageContent.word_detail.sort] = {
  //     'component': 'getPageWords',
  //     'index': pageContent.word_detail.component_id
  //   };
  //   this.$store.commit('newWordsContent', pageContent.word_detail.word_content);
  // }
  // 超文本内容
  if (pageContent.link_detail instanceof Array && pageContent.link_detail.length > 0) {
    this.$store.commit('newSetWordsUrlNum', pageContent.link_detail.length);
    let arr = [];
    for (let i in pageContent.link_detail) {
      const obj = {};
      obj.index = pageContent.link_detail[i].component_id;
      obj.wordsContent = pageContent.link_detail[i].link_content;
      obj.wordsUrl = pageContent.link_detail[i].link_url;
      arr.push(obj);
      setComponentsItems[pageContent.link_detail[i].sort] = {
        'component': 'setPageWordsUrl',
        'index': pageContent.link_detail[i].component_id
      };
      getComponentsItems[pageContent.link_detail[i].sort] = {
        'component': 'getPageWordsUrl',
        'index': pageContent.link_detail[i].component_id
      };
    }
    this.$store.commit('newWordsUrlArr', arr);
  } else if (pageContent.link_detail && pageContent.link_detail.sort > 0) {
    setComponentsItems[pageContent.link_detail.sort] = {
      'component': 'setPageWordsUrl',
      'index': pageContent.link_detail.component_id
    };
    getComponentsItems[pageContent.link_detail.sort] = {
      'component': 'getPageWordsUrl',
      'index': pageContent.link_detail.component_id
    };
    let wordsUrlArr = [{
      index: pageContent.link_detail.component_id,
      wordsContent: pageContent.link_detail.link_content,
      wordsUrl: pageContent.link_detail.link_url
    }];
    this.$store.commit('newWordsUrlArr', wordsUrlArr);
    this.$store.commit('newSetWordsUrlNum', 1);
  } else {
    this.$store.commit('newWordsUrlArr', []);
    this.$store.commit('newSetWordsUrlNum', 0);
  }

  // 判断是否有头图
  if (pageContent.top_img_detail && pageContent.top_img_detail.sort > 0) {
    setComponentsItems[pageContent.top_img_detail.sort] = {
      'component': 'setTopImg',
      'index': pageContent.top_img_detail.component_id
    };
    getComponentsItems[pageContent.top_img_detail.sort] = {
      'component': 'getTopImg',
      'index': pageContent.top_img_detail.component_id
    };
    let topImageList = [];
    for (let i = 0; i < pageContent.top_img_detail.images.length; i++) {
      let fileData = {};
      fileData.name = pageContent.top_img_detail.images[i].image_name;
      fileData.image_url = pageContent.top_img_detail.images[i].image_url;
      fileData.image_order = pageContent.top_img_detail.images[i].image_order;
      topImageList.push(fileData);
    }
    this.$store.commit('newTopImgFileList', topImageList);
    this.$store.commit('newTopImgShow', true);
  } else {
    this.$store.commit('newTopImgFileList', []);
    this.$store.commit('newTopImgShow', false);
  }
  // 判断是否有详情图
  if (pageContent.detail_img_detail && pageContent.detail_img_detail.sort > 0) {
    setComponentsItems[pageContent.detail_img_detail.sort] = {
      'component': 'setDetailImg',
      'index': pageContent.detail_img_detail.component_id
    };
    getComponentsItems[pageContent.detail_img_detail.sort] = {
      'component': 'getDetailImg',
      'index': pageContent.detail_img_detail.component_id
    };
    let detailImageList = [];
    for (let i = 0; i < pageContent.detail_img_detail.images.length; i++) {
      let fileData = {};
      fileData.name = pageContent.detail_img_detail.images[i].image_name;
      fileData.image_url = pageContent.detail_img_detail.images[i].image_url;
      fileData.image_order = pageContent.detail_img_detail.images[i].image_order;
      detailImageList.push(fileData);
    }
    this.$store.commit('newDetailImgFileList', detailImageList);
    this.$store.commit('newDetailImgShow', true);
  } else {
    this.$store.commit('newDetailImgFileList', []);
    this.$store.commit('newDetailImgShow', false);
  }
  // 判断是否有浮窗
  if (pageContent.floatWindow && pageContent.floatWindow.sort > 0) {
    setComponentsItems[pageContent.floatWindow.sort] = {
      'component': 'setFloatWindow',
      'index': pageContent.floatWindow.component_id
    };
    getComponentsItems[pageContent.floatWindow.sort] = {
      'component': 'getFloatWindow',
      'index': pageContent.floatWindow.component_id
    };
    let floatImageList = [];
    for (let i = 0; i < pageContent.floatWindow.images.length; i++) {
      let fileData = {};
      fileData.name = pageContent.floatWindow.images[i].image_name;
      fileData.image_url = pageContent.floatWindow.images[i].image_url;
      fileData.image_order = pageContent.floatWindow.images[i].image_order;
      floatImageList.push(fileData);
    }
    let floatImgArray = [];
    let floatImgObj = {};
    floatImgObj.width = pageContent.floatWindow.image_width;
    floatImgObj.height = pageContent.floatWindow.image_height;
    floatImgObj.radius = pageContent.floatWindow.image_radius;
    floatImgObj.top = pageContent.floatWindow.image_top;
    floatImgObj.right = pageContent.floatWindow.image_right;
    floatImgObj.hrefUrl = pageContent.floatWindow.image_hrefUrl;
    floatImgArray.push(floatImgObj);
    this.$store.commit('newFloatImgFileList', floatImageList);
    this.$store.commit('newConsult', floatImgArray);
    this.$store.commit('newFloatImgShow', true);
  } else {
    this.$store.commit('newFloatImgFileList', []);
    this.$store.commit('newFloatImgShow', false);
  }

  // 判断是否有应用下载
  if (pageContent.app_detail && pageContent.app_detail.sort > 0) {
    setComponentsItems[pageContent.app_detail.sort] = {
      'component': 'setApplyDownload',
      'index': pageContent.app_detail.component_id
    };
    getComponentsItems[pageContent.app_detail.sort] = {
      'component': 'getApplyDownload',
      'index': pageContent.app_detail.component_id
    };
    this.$store.commit('newApplyDownloadTitle', pageContent.app_detail.title); // 应用下载主标题
    let app = [];
    for (let i = 0; i < pageContent.app_detail.apps.length; i++) {
      let obj = {};
      obj.appliesTitle = pageContent.app_detail.apps[i].app_title;
      obj.appliesImgUrl = pageContent.app_detail.apps[i].app_image;
      obj.appliesImgName = pageContent.app_detail.apps[i].image_name;
      obj.appliesButtonText = pageContent.app_detail.apps[i].button_name;
      obj.appliesHref = pageContent.app_detail.apps[i].app_url;
      obj.app_order = pageContent.app_detail.apps[i].app_order;
      app.push(obj);
    }
    this.$store.commit('newApplies', app);
  } else {
    this.$store.commit('newApplyDownloadTitle', '应用下载');
    this.$store.commit('newApplies', []);
  }
  setComponentsItems = this.arrayRemoveNull(setComponentsItems);
  getComponentsItems = this.arrayRemoveNull(getComponentsItems);
  this.$store.commit('newSetComponentsItems', setComponentsItems);
  this.$store.commit('newGetComponentsItems', getComponentsItems);
  // console.log(' setComponentsItems: ' + JSON.stringify(setComponentsItems) + ' getComponentsItems: ' + JSON.stringify(getComponentsItems));
};
// 重置vuex的状态
Vue.prototype.resetVuex = function () {
  /* vuex --> app.js */
  let getComponentsItems = [];
  let setComponentsItems = [{'component': 'setPageTitle', 'index': 0, 'fixed': true}];
 // let setComponentsItems = [];
  this.$store.commit('newSetComponentsItems', setComponentsItems);
  this.$store.commit('newGetComponentsItems', getComponentsItems);
  this.$store.commit('newPageData', {});
  /* vuex --> applyDownload.js */
  this.$store.commit('newApplyDownloadTitle', '应用下载');
  this.$store.commit('newApplies', []);
  /* vuex --> button.js */
  // 按钮
  // let buttonObject = {buttonFont: '请输入按钮文字', buttonColor: '#4ca9d4',buttonRadius: 0, jumpFillAlias: '', clickButton: 0};
  // this.$store.commit('newPagebuttonObject', buttonObject);
  let buttons = [];
  this.$store.commit('newButtons', buttons);
  this.$store.commit('newSetButtonNum', 0);
  // 文本
  let wordsArr = [];
  this.$store.commit('newWordsArr', wordsArr);
  this.$store.commit('newSetWordsNum', 0);
  // 超链接文本
  let wordsUrlArr = [];
  this.$store.commit('newWordsUrlArr', wordsUrlArr);
  this.$store.commit('newSetWordsUrlNum', 0);
  // 热力图
  let mapHotsArr = [];
  this.$store.commit('newMapHots', mapHotsArr);
  this.$store.commit('newSetMapNum', 0);
  // sim卡颜色
  let simObject = {simColLA: '#ff6600', simColLB: '#ffffff', simColRA: '#cccccc', simColRB: '#ffffff'};
  this.$store.commit('newSimObject', simObject);
  /* vuex --> detailImg.js */
  this.$store.commit('newDetailImgShow', false);
  this.$store.commit('newDetailImgFileList', []);
  /* vuex --> options.js */
  this.$store.commit('newSwitchNum', 2);
  let options = {
    switch_title01: '选项卡标题01',
    switch_title02: '选项卡标题02',
    switch_title03: '选项卡标题03',
    switch_content01: '选项卡内容01',
    switch_content02: '选项卡内容02',
    switch_content03: '选项卡内容03',
    switch_productId01: 'product01',
    switch_productId02: 'product02',
    switch_productId03: 'product03',
    switch_scale01: 0.9,
    switch_scale02: 0.9,
    switch_scale03: 0.9
  };
  this.$store.commit('newSwitchObject', options);
  this.$store.commit('newSetBorderColor', '#cccccc');
  this.$store.commit('newSetBackgroundColor', '#ffffff');
  this.$store.commit('newSetCheckBgColor', '#ffffff');
  this.$store.commit('newSetPosition', 0);
  let optionsSlide = {
    radioSwitch: 1,
    switchShowStyleTwo: 1,
    switchShowStyle: 1,
    defSwitch: 1,
    radioBackground: 1,
    tabBackgroundColor: '#ffffff',
    isCheckedFont: 1,
    checkedFont: '已选',
    checkedBackgroundColor: '#4ca9d4',
    checkedFontColor: '#ffffff',
    productPosition: 0,
    switchImg: [{id: 1, image: '', productId: '', productName: ''}]
  };
  this.$store.commit('newSwitchSlide', optionsSlide);
  let switchImage = {
    switchNum: 3,
    defSwitch: 1,
    setDotColor: '#555555',
    productPosition: 0,
    switchImg: [{id: 1, image: '', productId: '', productName: ''}]
  };
  this.$store.commit('newSwitchImage', switchImage);
  // 产品参数key值
  this.$store.commit('newProductKey', 'product');

  /* vuex --> project.js */
  this.$store.commit('newProjectList', []);
  this.$store.commit('newFolderList', []);
  this.$store.commit('newInnerProjectList', []);
  this.$store.commit('newActiveState', 'work');
  this.$store.commit('newContainerShow', true);
  /* vuex --> topImg.js */
  this.$store.commit('newPageTitle', '标题');
  this.$store.commit('newPageUrl', '');
  this.$store.commit('newScreenType', 'vertical');
  this.$store.commit('newEffectH', 0);
  this.$store.commit('newSaveShowModal', false);
 // this.$store.commit('newPageDescContent', '');
  this.$store.commit('newTopImgShow', false);
  this.$store.commit('newTopImgFileList', []);
  this.$store.commit('newTopImgName', '');
  this.$store.commit('newEmbedCode', {codeUrl: ''});
  /* vuex --> background.js */
  this.$store.commit('newPageBg', {bgRadio: 0, bgColor: '#ffffff', bgImg: ''});
  /* vuex --> 填写页 fill.js */
  let getFillComponentsItems = [];
  let setFillComponentsItems = [{'component': 'setPageTitle', 'index': 0, 'fixed': true}];
  this.$store.commit('newSetFillComponentsItems', setFillComponentsItems);
  this.$store.commit('newGetFillComponentsItems', getFillComponentsItems);
  this.$store.commit('newPageNature', [{pageTitle: '填写页', pageUrl: '', pageDesc: '', majorColor: '#666', initUrl: '', submitUrl: '', submitField: ''}]);
  this.$store.commit('newListTitles', []);
  this.$store.commit('newPersonInfo', {radioPerInfo: 1, moduleTitle: '个人信息', moduleTitleShow: 1, moduleDesc: '', isCardLi: 1});
  this.$store.commit('newChooseTel', {moduleTitle: '选择手机号', moduleTitleShow: 1,occupyFlag: 1, moduleDesc: '', optFlag: 2});
  this.$store.commit('newDeliveryAddress', {moduleTitle: '收货地址信息', moduleDesc: '', moduleTitleShow: 1,listTitle: '所在地区'});
  this.$store.commit('newFirstMonth', {moduleTitle: '首月资费', moduleDesc: ''});
  this.$store.commit('newDescribes', []);
  this.$store.commit('newButton', [{buttonFont: '请输入按钮文字', buttonRadius: 0, buttonColor: '#4ca9d4', isMajorColor: '1'}]);
  this.$store.commit('newProtocol', [{protocolFlag: true, protocolFont: '请输入协议名称', protocolColor: '#4ca9d4',isProtocolUrl: '1', protocolUrl: ''}]);
  // this.$store.commit('newSuccContent', [{successFlag: true, simTitleHtml: '提交成功', succDes: '您好'}]);
  this.$store.commit('newSuccContent', {title: '恭喜您获得XX卡', isLogistics: 1, image: '', hasContent: '', noContent: '', isPopButton: '1',isTimer: '1', popButton: '我知道了', popButtonRadius: 0, isJump: '1', jumpUrl: ''});
  this.$store.commit('newIsFetch', true);

  this.$store.commit('newProtocol', [{protocolFont: '请输入协议名称', protocolColor: '#4ca9d4', isMajorColor: '1', protocolContent: '', isProtocolUrl: '1', protocolUrl: ''}]);
  this.$store.commit('newChooseArea', [{curProvinceCode: 110000, curProvinceName: '北京', curCityCode: '', curCityName: ''}]);
  this.$store.commit('newChooseDisArea', [{curCityCode: '', curCityName: '', curDistrictCode: '', curDistrictName: ''}]);
  /* vuex --> 链接传参 options.js */
  this.$store.commit('newUrlParam', '');
  /* vuex --> fixedButton 模块设置  button.js  */
  this.$store.commit('newFixedButton', {menu: [], button: [], application: 0, userAgent: ''});

};
// 填写页数据
Vue.prototype.submitFillData = function (categoryId, pageId) {
  // 获取显示的左侧组件,用于判断是否启用了该组件
  const setFillComponentsItems = this.$store.state.fill.setFillComponentsItems;
  // console.log('右侧模块: ' + JSON.stringify(setFillComponentsItems));
  if (!pageId) {
    pageId = '';
  }
  const fillData = {};
  fillData.category_id = categoryId; // 文件夹ID
  fillData.fill_id = pageId;
  fillData.fill_title =  this.$store.state.fill.pageNature[0].pageTitle;
  fillData.fill_alias =  this.$store.state.fill.pageNature[0].pageUrl;
  fillData.fill_description =  this.$store.state.fill.pageNature[0].pageDesc;
  fillData.page_color =  this.$store.state.fill.pageNature[0].majorColor;
  fillData.init_url =  this.$store.state.fill.pageNature[0].initUrl;
  fillData.submit_url =  this.$store.state.fill.pageNature[0].submitUrl;
  fillData.submit_field =  this.$store.state.fill.pageNature[0].submitField;
  fillData.page_pop_success_detail =  ''; // 没用
  // fillData.create_date = '';
  fillData.operator = JSON.parse(localStorage.getItem('user')).id; // 操作人 用户id
  fillData.page_type = 'fill';
  // 描述模块 可以多次添加的
  fillData.page_content = {};
  fillData.page_content.fill_desc = [];
  const num = this.arrayInNum(setFillComponentsItems, 'setDescribe');
  // console.log(num);
  if (num != 0) {
    // alert('num: ' + num);
    for (let i = 0; i < num; i++ ) {
      const obj = {};
      obj.id = this.$store.state.fill.describes[i].index;
      if (this.$store.state.fill.describes[i].describe) {
        obj.text = this.$store.state.fill.describes[i].describe;
        obj.scale = this.$store.state.fill.describes[i].scale;
      } else {
        obj.text = '';
        obj.scale = '';
      }
      obj.sort = this.arrayInSort(setFillComponentsItems, obj.id);
      // console.log(obj.sort);
      // console.log('描述测试');
      // console.log(JSON.stringify(setFillComponentsItems));
      // console.log(obj.id);
      if (obj.sort) {
        fillData.page_content.fill_desc.push(obj);
      } else {
        this.failMsg('添加描述失败,请重新添加');
        return false;
      }
      // console.log(JSON.stringify(fillData.page_content.fill_desc));
    }
  }
  // 个人信息模块
  fillData.page_content.fill_personInfo = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setPersonInfo')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setPersonInfo');
    obj.radioPerInfo = this.$store.state.fill.personInfo.radioPerInfo;
    obj.moduleTitle = this.$store.state.fill.personInfo.moduleTitle;
    obj.moduleTitleShow = this.$store.state.fill.personInfo.moduleTitleShow;
    obj.moduleDesc = this.$store.state.fill.personInfo.moduleDesc;
    obj.isCardLi = this.$store.state.fill.personInfo.isCardLi;
    obj.id = setFillComponentsItems[obj.sort].index;
    fillData.page_content.fill_personInfo = obj;
  }
  // 选择手机号模块
  fillData.page_content.fill_chooseTel = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setChooseTel')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setChooseTel');
    obj.moduleTitle = this.$store.state.fill.chooseTel.moduleTitle;
    obj.moduleTitleShow = this.$store.state.fill.chooseTel.moduleTitleShow;
    obj.occupyFlag = this.$store.state.fill.chooseTel.occupyFlag;
    obj.moduleDesc = this.$store.state.fill.chooseTel.moduleDesc;
    obj.optFlag = this.$store.state.fill.chooseTel.optFlag;
    obj.id = setFillComponentsItems[obj.sort].index;
    fillData.page_content.fill_chooseTel = obj;
  }
  // 首月资费模块
  fillData.page_content.fill_firstMonth = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setFirstMonth')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setFirstMonth');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.moduleTitle = this.$store.state.fill.firstMonth.moduleTitle;
    obj.moduleDesc = this.$store.state.fill.firstMonth.moduleDesc;
    fillData.page_content.fill_firstMonth = obj;
  }
  // 收货地址模块
  fillData.page_content.fill_deliveryAdd = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setDeliveryAddress')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setDeliveryAddress');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.moduleTitle = this.$store.state.fill.deliveryAddress.moduleTitle;
    obj.moduleDesc = this.$store.state.fill.deliveryAddress.moduleDesc;
    obj.moduleTitleShow = this.$store.state.fill.deliveryAddress.moduleTitleShow;
    obj.listTitle = this.$store.state.fill.deliveryAddress.listTitle;
    fillData.page_content.fill_deliveryAdd = obj;
  }
  // 王卡宽带模块
  fillData.page_content.fill_kingBroad = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setKingBroad')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setKingBroad');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.radioPerInfo = this.$store.state.fill.kingBroad.radioPerInfo;
    fillData.page_content.fill_kingBroad = obj;
  }
  // 协议模块
  fillData.page_content.fill_protocol = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setProtocol')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setProtocol');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.protocolFont = this.$store.state.fill.protocol[0].protocolFont;
    obj.protocolColor = this.$store.state.fill.protocol[0].protocolColor;
    obj.isMajorColor = this.$store.state.fill.protocol[0].isMajorColor;
    obj.isProtocolUrl = this.$store.state.fill.protocol[0].isProtocolUrl;
    obj.protocolUrl = this.$store.state.fill.protocol[0].protocolUrl;
    obj.protocolContent = this.$store.state.fill.protocol[0].protocolContent;
    obj.activityType = this.$store.state.fill.protocol[0].activityType;
    fillData.page_content.fill_protocol = obj;
  }
  // 按钮模块
  fillData.page_content.fill_button = {};
  // 成功弹框设置
  fillData.page_content.fill_success = {};
  if (this.arrayInNameSort(setFillComponentsItems, 'setButton')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setButton');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.buttonFont = this.$store.state.fill.button[0].buttonFont;
    obj.buttonRadius = this.$store.state.fill.button[0].buttonRadius;
    obj.buttonColor = this.$store.state.fill.button[0].buttonColor;
    obj.isMajorColor = this.$store.state.fill.button[0].isMajorColor;
    fillData.page_content.fill_button = obj;
    // 成功弹框
    const successObj = {};
    // successObj.successFlag =  this.$store.state.fill.succContent.successFlag;
    successObj.title =  this.$store.state.fill.succContent.title;
    successObj.isLogistics =  this.$store.state.fill.succContent.isLogistics;
    successObj.image =  this.$store.state.fill.succContent.image;
    successObj.hasContent =  this.$store.state.fill.succContent.hasContent;
    successObj.noContent =  this.$store.state.fill.succContent.noContent;
    successObj.isPopButton =  this.$store.state.fill.succContent.isPopButton;
    successObj.isTimer =  this.$store.state.fill.succContent.isTimer;
    successObj.popButton =  this.$store.state.fill.succContent.popButton;
    successObj.popButtonRadius =  this.$store.state.fill.succContent.popButtonRadius;
    successObj.isJump =  this.$store.state.fill.succContent.isJump;
    successObj.jumpUrl = this.$store.state.fill.succContent.jumpUrl;
    fillData.page_content.fill_success = successObj;
  }
  // console.log('填写页传数据: ' + JSON.stringify(fillData));
  return fillData;
};
// 获取填写页数据
Vue.prototype.obtainFillData = function (data) {
  // console.log('进入获取数据函数' + JSON.stringify(data));
  let getFillComponentsItems = [];
  let setFillComponentsItems = [{'component': 'setPageTitle', 'index': 0, 'fixed': true}];
  let index_arr = [];
  let index = {};
  index.pageTitle = data.fill_title;
  index.pageUrl = data.fill_alias;
  index.pageDesc = data.fill_description;
  index.majorColor = data.page_color;
  index.initUrl = data.init_url;
  index.submitUrl = data.submit_url;
  index.submitField = data.submit_field;
  index_arr.push(index);
  this.$store.commit('newPageNature', index_arr);
  const v = data.page_content;
  // 判断是否有描述
  if (v.fill_desc.length > 0) {
    this.$store.commit('newSetDescribeNum', v.fill_desc.length);
    let arr = [];
    for (let i in v.fill_desc) {
      const obj = {};
      obj.index = v.fill_desc[i].id;
      obj.describe = v.fill_desc[i].text;
      obj.scale = v.fill_desc[i].scale;
      arr.push(obj);
      getFillComponentsItems[v.fill_desc[i].sort] = {
        'component': 'getDescribe',
        'index': v.fill_desc[i].id
      };
      setFillComponentsItems[v.fill_desc[i].sort] = {
        'component': 'setDescribe',
        'index': v.fill_desc[i].id
      };
    }
    this.$store.commit('newDescribes', arr);
    // console.log('描述数据: ' + JSON.stringify(arr));
  }
  // 判断是否有个人信息
  if (v.fill_personInfo.sort > 0) {
    let obj = {};
    obj.radioPerInfo = v.fill_personInfo.radioPerInfo;
    if (v.fill_personInfo.moduleTitle) {
      obj.moduleTitle = v.fill_personInfo.moduleTitle;
    } else {
      obj.moduleTitle = '个人信息';
    }
    if (v.fill_personInfo.moduleTitleShow) {
      obj.moduleTitleShow = v.fill_personInfo.moduleTitleShow;
    } else {
      obj.moduleTitleShow = 1;
    }
    if (v.fill_personInfo.moduleDesc) {
      obj.moduleDesc = v.fill_personInfo.moduleDesc;
    } else {
      obj.moduleDesc = '';
    }
    obj.isCardLi = this.isUndefine(v.fill_personInfo.isCardLi, 1);
    this.$store.commit('newPersonInfo', obj);
    getFillComponentsItems[v.fill_personInfo.sort] = {
      'component': 'getPersonInfo',
      'index': v.fill_personInfo.id
    };
    setFillComponentsItems[v.fill_personInfo.sort] = {
      'component': 'setPersonInfo',
      'index': v.fill_personInfo.id
    };
  }
  // 判断是否有选择手机号
  if (v.fill_chooseTel.sort > 0) {
    let obj = {};
    if (v.fill_chooseTel.moduleTitle) {
      obj.moduleTitle = v.fill_chooseTel.moduleTitle;
    } else {
      obj.moduleTitle = '选择手机号';
    }
    if (v.fill_chooseTel.moduleTitleShow) {
      obj.moduleTitleShow = v.fill_chooseTel.moduleTitleShow;
    } else {
      obj.moduleTitleShow = 1;
    }
    obj.occupyFlag = this.isUndefine(v.fill_chooseTel.occupyFlag, 1);
    obj.optFlag = this.isUndefine(v.fill_chooseTel.optFlag, 2);
    if (v.fill_chooseTel.moduleDesc) {
      obj.moduleDesc = v.fill_chooseTel.moduleDesc;
    } else {
      obj.moduleDesc = '';
    }
    this.$store.commit('newChooseTel', obj);

    getFillComponentsItems[v.fill_chooseTel.sort] = {
      'component': 'getChooseTel',
      'index': v.fill_chooseTel.id
    };
    setFillComponentsItems[v.fill_chooseTel.sort] = {
      'component': 'setChooseTel',
      'index': v.fill_chooseTel.id
    };
  }
  // 判断是否有选择首月资费
  if (v.fill_firstMonth.sort > 0) {
    let obj = {};
    if (v.fill_firstMonth.moduleTitle) {
      obj.moduleTitle = v.fill_firstMonth.moduleTitle;
    } else {
      obj.moduleTitle = '首月资费';
    }
    if (v.fill_firstMonth.moduleDesc) {
      obj.moduleDesc = v.fill_firstMonth.moduleDesc;
    } else {
      obj.moduleDesc = '';
    }
    this.$store.commit('newFirstMonth', obj);
    getFillComponentsItems[v.fill_firstMonth.sort] = {
      'component': 'getFirstMonth',
      'index': v.fill_firstMonth.id
    };
    setFillComponentsItems[v.fill_firstMonth.sort] = {
      'component': 'setFirstMonth',
      'index': v.fill_firstMonth.id
    };
  }
  // 判断是否有添加收货地址
  if (v.fill_deliveryAdd.sort > 0) {
    let obj = {};
    if (v.fill_deliveryAdd.moduleTitle) {
      obj.moduleTitle = v.fill_deliveryAdd.moduleTitle;
    } else {
      obj.moduleTitle = '收货地址信息';
    }
    if (v.fill_deliveryAdd.moduleDesc) {
      obj.moduleDesc = v.fill_deliveryAdd.moduleDesc;
    } else {
      obj.moduleDesc = '';
    }
    obj.moduleTitleShow = this.isUndefine(v.fill_deliveryAdd.moduleTitleShow, 1);
    obj.listTitle = this.isUndefine(v.fill_deliveryAdd.listTitle, '所在地区');
    this.$store.commit('newDeliveryAddress', obj);
    getFillComponentsItems[v.fill_deliveryAdd.sort] = {
      'component': 'getDeliveryAddress',
      'index': v.fill_deliveryAdd.id
    };
    setFillComponentsItems[v.fill_deliveryAdd.sort] = {
      'component': 'setDeliveryAddress',
      'index': v.fill_deliveryAdd.id
    };
  }
  // 判断是否有王卡宽带模块
  if (v.fill_kingBroad && v.fill_kingBroad.sort > 0) {
    let obj = {};
    obj.radioPerInfo = this.isUndefine(v.fill_kingBroad.radioPerInfo, 1);
    this.$store.commit('newKingBroad', obj);
    getFillComponentsItems[v.fill_kingBroad.sort] = {
      'component': 'getKingBroad',
      'index': v.fill_kingBroad.id
    };
    setFillComponentsItems[v.fill_kingBroad.sort] = {
      'component': 'setKingBroad',
      'index': v.fill_kingBroad.id
    };
  }
  // 判断是否有添加协议
  if (v.fill_protocol.sort > 0) {
    let arr = [];
    let obj = {};
    obj.protocolFont = v.fill_protocol.protocolFont;
    obj.protocolColor = v.fill_protocol.protocolColor;
    obj.isMajorColor = v.fill_protocol.isMajorColor;
    obj.isProtocolUrl = v.fill_protocol.isProtocolUrl;
    obj.protocolUrl = v.fill_protocol.protocolUrl;
    obj.protocolContent = v.fill_protocol.protocolContent;
    obj.activityType = v.fill_protocol.activityType;
    arr.push(obj);
    getFillComponentsItems[v.fill_protocol.sort] = {
      'component': 'getProtocol',
      'index': v.fill_protocol.id
    };
    setFillComponentsItems[v.fill_protocol.sort] = {
      'component': 'setProtocol',
      'index': v.fill_protocol.id
    };
    this.$store.commit('newProtocol', arr);
  }
  // 判断是否有按钮
  if (v.fill_button.sort > 0) {
    let arr = [];
    let obj = {};
    obj.buttonFont = v.fill_button.buttonFont;
    obj.buttonRadius = v.fill_button.buttonRadius;
    obj.buttonColor = v.fill_button.buttonColor;
    obj.isMajorColor = v.fill_button.isMajorColor;
    arr.push(obj);
    getFillComponentsItems[v.fill_button.sort] = {
      'component': 'getButton',
      'index': v.fill_button.id
    };
    setFillComponentsItems[v.fill_button.sort] = {
      'component': 'setButton',
      'index': v.fill_button.id
    };
    this.$store.commit('newButton', arr);
    // 成功弹框
    let successObj = {};
    // successObj.successFlag = v.fill_success.successFlag;
    if (v.fill_success) {
      successObj.title = v.fill_success.title;
      if (v.fill_success.isLogistics) {
        successObj.isLogistics = v.fill_success.isLogistics;
      } else {
        successObj.isLogistics = 1;
      }
      successObj.image = v.fill_success.image;
      successObj.hasContent = v.fill_success.hasContent;
      successObj.noContent = v.fill_success.noContent;
      successObj.isPopButton = v.fill_success.isPopButton;
      successObj.isTimer = v.fill_success.isTimer;
      successObj.popButton = v.fill_success.popButton;
      if (v.fill_success.popButtonRadius) {
        successObj.popButtonRadius = v.fill_success.popButtonRadius;
      } else {
        successObj.popButtonRadius = 0;
      }
      if (v.fill_success.isJump) {
        successObj.isJump = v.fill_success.isJump;
      } else {
        successObj.isJump = '1';
      }
      if (v.fill_success.jumpUrl) {
        successObj.jumpUrl = v.fill_success.jumpUrl;
      } else {
        successObj.jumpUrl = '';
      }
    } else {
      successObj.title = '';
      successObj.image = '';
      successObj.hasContent = '';
      successObj.noContent = '';
      successObj.isPopButton = '1';
      successObj.isTimer = '1';
      successObj.popButton = '';
      successObj.isJump = '1';
      successObj.jumpUrl = '';
    }
    this.$store.commit('newSuccContent', successObj);
  }
  setFillComponentsItems = this.arrayRemoveNull(setFillComponentsItems);
  getFillComponentsItems = this.arrayRemoveNull(getFillComponentsItems);
  this.$store.commit('newSetFillComponentsItems', setFillComponentsItems);
  this.$store.commit('newGetFillComponentsItems', getFillComponentsItems);
  // console.log('setFillComponentsItems: ' + JSON.stringify(setFillComponentsItems));
  // console.log('getFillComponentsItems: ' + JSON.stringify(getFillComponentsItems));
};
// 重置填写页提交逻辑数据
Vue.prototype.resetFillSubmitVuex = function () {
  this.$store.commit('newGoodsId', '');
  this.$store.commit('newProduct', '');
  this.$store.commit('newCertName', '');
  this.$store.commit('newCertId', '');
  this.$store.commit('newContractPhone', '');
  this.$store.commit('newEssProvince', '');
  this.$store.commit('newEssCity', '');
  this.$store.commit('newNumber', '');
  this.$store.commit('newFirstMonth', '');
  this.$store.commit('newWebProvince', '');
  this.$store.commit('newWebCity', '');
  this.$store.commit('newWebCounty', '');
  this.$store.commit('newAddress', '');
  this.$store.commit('newSelfFetchCode', '');

};

// 立即生效接口
 Vue.prototype.hasEffect = function(path) {
  this.$confirm('此操作将在导出页面生效该文件内容, 是否继续?', '提示(生产环境请谨慎操作)', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.loading = true;
    this.$ajax({
      method: 'get',
      url: path
    }).then((res) => {
      if (res.data.data.ret_code === '0000') {
        this.$message({
          type: 'success',
          message: '大约5分钟，可导出查看修改内容!'
        });
      }
      this.showModal = false;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.failMsg('服务器错误');
      this.loading = false;
    });
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消文件立即生效'
    });
  });
 }
