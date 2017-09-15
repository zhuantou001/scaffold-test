/* 公共方法 */
import Vue from 'vue';
/* 随机数 shortid */
Vue.prototype.randomId = function () {
  let shortid = require('shortid');
  return shortid.generate();
};

/* 落地页删除组件,仅能添加一次 */
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
/* 填写页删除组件,可多次添加 */
Vue.prototype.deleteFillComponent = function (setComponentsItems, getComponentsItems, index, vuexData, newVuexData) {
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
  // 删除中间状态里的数据
  if (vuexData && newVuexData) {
    let list = this.$store.state.fill[vuexData];
    for (let i in list) {
      if (list[i].index === index) {
        list.splice(i, 1);
        this.$store.commit(newVuexData, list);
        // console.log('删除后的:' + JSON.stringify(this.$store.state.fill[vuexData]));
      }
    }
  }
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
// 落地页需要提交的数据
Vue.prototype.scaffoldData = function (categoryId, pageId) {
  // 获取显示的左侧组件,用于判断是否启用了该组件
  const setComponentsItems = this.$store.state.app.setComponentsItems;
  // console.log(' setComponentsItems:' + JSON.stringify(setComponentsItems));
  const pageData = {};
  pageData.scaffold_index = [];
  const index = {};
  index.category_id = categoryId; // 文件夹ID
  index.page_id = pageId;
  index.page_title = this.$store.state.topImg.pageTitle;
  index.page_alias = this.$store.state.topImg.pageUrl;
  index.page_desc_content = this.$store.state.topImg.pageDescContent;
  index.page_desc_style = ''; // 页面描述样式
  index.page_bg_type = this.$store.state.background.radioSwitchBg; // 页面背景类型(0-无, 1-纯色, 2-图片)
  if (index.page_bg_type == 0) { // 页面背景
    index.page_bg = '';
  }else if (index.page_bg_type == 1) {
    index.page_bg = this.$store.state.background.page_color;
  }else if (index.page_bg_type == 2) {
    index.page_bg = this.$store.state.background.bgImgUrl;
  }
  index.show_top_image = ''; // 头图是否展示(Y-展示, N-不展示)
  if (this.arrayIn(setComponentsItems, 'setSwitch')) { // 判断页面中是否有选项卡
    index.sim_color_check = this.$store.state.button.simObject.simColLA; // 选项卡选中时SIM颜色
    index.sim_color_uncheck = this.$store.state.button.simObject.simColRA; // 选项卡未选中时SIM颜色
    index.sim_desc_check = this.$store.state.button.simObject.simColLB; //
    index.sim_desc_uncheck = this.$store.state.button.simObject.simColRB; //
    // console.log(index.sim_color_check + '    ' + index.sim_color_uncheck + '    ' + index.sim_desc_check + '    ' + index.sim_desc_uncheck);
  } else {
    index.sim_color_check = '';
    index.sim_color_uncheck = '';
    index.sim_desc_check = '';
    index.sim_desc_uncheck = '';
  }
  if (this.arrayIn(setComponentsItems, 'setPageButton')) { // 判断页面中是否有按钮
    index.button_name = this.$store.state.button.buttonObject.buttonFont; // 按钮文字
    index.button_color = this.$store.state.button.buttonObject.buttonColor; // 按钮颜色
  } else {
    index.button_name = '';
    index.button_color = '';
  }
  if (this.arrayIn(setComponentsItems, 'setPageWordsUrl')) { // 判断页面中是否有按钮
    index.anchor_content = this.$store.state.button.descLinkObject.wordsContent; // 埋点文字内容
    index.anchor_style = this.$store.state.button.descLinkObject.wordsColor; // 埋点文字样式
    index.anchor_url = this.$store.state.button.descLinkObject.wordsUrl; // 埋点链接
  } else {
    index.anchor_content = ''; // 埋点文字内容
    index.anchor_style = ''; // 埋点文字样式
    index.anchor_url = ''; // 埋点链接
  }
  index.app_main_title = this.$store.state.applyDownload.applyDownloadTitle; // 应用下载主标题
  index.create_date = ''; // 创建时间
  index.operator = JSON.parse(localStorage.getItem('user')).id; // 操作人 用户id
  pageData.scaffold_index.push(index);
  pageData.scaffold_option = [];
  if (this.arrayIn(setComponentsItems, 'setSwitch')) {
    const optionNum = this.$store.state.options.switch_num;
    for (let i = 0; i < optionNum; i++) {
      const option = {};
      option.page_catalog = 'index'; // 页面分类, index-首页, fill-填写页
      if (this.$store.state.options.options['switch_title0' + (i + 1)]) {
        option.option_title = this.$store.state.options.options['switch_title0' + (i + 1)]; // 选项卡标题
      } else {
        option.option_title = '';
      }
      if (this.$store.state.options.options['switch_title0' + (i + 1)]) {
        option.option_content = this.$store.state.options.options['switch_content0' + (i + 1)]; // 选项卡内容
      } else {
        option.option_content = '';
      }
      pageData.scaffold_option.push(option);
    }
  }
  pageData.scaffold_image = [];
  if (this.arrayIn(setComponentsItems, 'setTopImg')) {
    const topImage = {};
    topImage.page_type = 1; // 图片类型(1-头图, 2-详情图)
    topImage.page_catalog = 'index'; // 页面分类, index-首页, fill-填写页
    topImage.image_url = this.$store.state.topImg.topImgUrl;
    topImage.image_name = this.$store.state.topImg.topImgName;
    topImage.image_order = ''; // 图片展示顺序
    pageData.scaffold_image.push(topImage);
  }
  const detailImgnum = this.$store.state.detailImg.detailImgFileList.length;
  for (let i = 0; i < detailImgnum; i++) {
    const detailImage = {};
    detailImage.page_type = 2; // 图片类型(1-头图, 2-详情图)
    detailImage.page_catalog = 'index'; // 页面分类, index-首页, fill-填写页
    detailImage.image_url = this.$store.state.detailImg.detailImgFileList[i].image_url; // 图片url
    detailImage.image_name = this.$store.state.detailImg.detailImgFileList[i].name;
    detailImage.image_order = i; // 图片展示顺序
    pageData.scaffold_image.push(detailImage);
  }
  pageData.scaffold_app = [];
  const appLenght = this.$store.state.applyDownload.appliesList.length;
  for (let i = 0; i < appLenght; i++) {
    const app = {};
    app.app_title = this.$store.state.applyDownload.appliesList[i].appliesTitle; // 应用标题
    app.app_image = this.$store.state.applyDownload.appliesList[i].appliesImgUrl; // 图片Base64
    app.image_name = this.$store.state.applyDownload.appliesList[i].appliesImgName; // 图片名字
    app.button_name = this.$store.state.applyDownload.appliesList[i].appliesButtonText; // 按钮文字
    app.app_url = this.$store.state.applyDownload.appliesList[i].appliesHref; // 链接地址
    app.app_order = ''; // 应用顺序
    pageData.scaffold_app.push(app);
  }
  return pageData;
};

Vue.prototype.obtainData = function (data) {
  console.log(JSON.stringify(data));
  let getComponentsItems = [];
  let setComponentsItems = [{'component': 'setPageTitle', 'index': 0}];
  this.$store.commit('newPageTitle', data.scaffold_index[0].page_title);
  this.$store.commit('newPageUrl', data.scaffold_index[0].page_alias);
  this.$store.commit('newPageDescContent', data.scaffold_index[0].page_desc_content);
  //   "page_desc_style": "",
  //   "page_bg_type": "",
  //   "page_bg": "",
  // 判断背景类型
  this.$store.commit('newSwitchBgNum', data.scaffold_index[0].page_bg_type);
  if (data.scaffold_index[0].page_bg_type == 1) {
    setComponentsItems.push({component: 'setPageBg', index: 8});
    this.$store.commit('newPageColor', data.scaffold_index[0].page_bg);
  }else if (data.scaffold_index[0].page_bg_type == 2) {
    setComponentsItems.push({component: 'setPageBg', index: 8});
    this.$store.commit('newImgUrl', data.scaffold_index[0].page_bg);
  }
  // 判断是否有选项卡
  if (data.scaffold_option.length > 0) {
    setComponentsItems.push({component: 'setSwitch', index: 2});
    getComponentsItems.push({component: 'getSwitch', index: 2});
    // 选项卡内容
    let option = {};
    for (let i = 0; i < data.scaffold_option.length; i++) {
      option['switch_title0' + (i + 1)] = data.scaffold_option[i]['option_title'];
      option['switch_content0' + (i + 1)] = data.scaffold_option[i]['option_content'];
    }
    this.$store.commit('newSwitchObject', option);
    // 选项卡颜色 目前只传选中颜色和没选中颜色
    let optionColor = {};
    optionColor.simColLA = data.scaffold_index[0].sim_color_check;
    optionColor.simColRA = data.scaffold_index[0].sim_color_uncheck;
    optionColor.simColLB = data.scaffold_index[0].sim_desc_check;
    optionColor.simColRB = data.scaffold_index[0].sim_desc_uncheck;
    // console.log(optionColor.simColLA + '    ' + optionColor.simColRA + '    ' + optionColor.simColLB + '    ' + data.scaffold_index[0].sim_desc_uncheck);

    this.$store.commit('newSimObject', optionColor);
    this.$store.commit('newSwitchNum', data.scaffold_option.length); // 选项卡数量
  }
  // 判断按钮
  if (data.scaffold_index[0].button_name) {
    setComponentsItems.push({component: 'setPageButton', index: 3});
    getComponentsItems.push({component: 'getPageButton', index: 3});
    let button = {};
    button.buttonFont = data.scaffold_index[0].button_name;
    button.buttonColor = data.scaffold_index[0].button_color;
    this.$store.commit('newPagebuttonObject', button);
  }
  // 判断瞄点文字
  if (data.scaffold_index[0].anchor_content) {
    setComponentsItems.push({component: 'setPageWordsUrl', index: 5});
    getComponentsItems.push({component: 'getPageWordsUrl', index: 5});
    let text = {};
    text.wordsContent = data.scaffold_index[0].anchor_content;
    text.wordsColor = data.scaffold_index[0].anchor_style;
    text.wordsUrl = data.scaffold_index[0].anchor_url;
    this.$store.commit('newWordsUrlObject', text);
  }
  // 判断是否有应用下载
  if (data.scaffold_app.length > 0) {
    this.$store.commit('newApplyDownloadTitle', data.scaffold_index[0].app_main_title); // 应用下载主标题
    setComponentsItems.push({component: 'setApplyDownload', index: 7});
    getComponentsItems.push({component: 'getApplyDownload', index: 7});
    let app = [];
    for (let i = 0; i < data.scaffold_app.length; i++) {
      let obj = {};
      obj.appliesTitle = data.scaffold_app[i].app_title;
      obj.appliesImgUrl = data.scaffold_app[i].app_image;
      obj.appliesImgName = data.scaffold_app[i].image_name;
      obj.appliesButtonText = data.scaffold_app[i].button_name;
      obj.appliesHref = data.scaffold_app[i].app_url;
      obj.app_order = data.scaffold_app[i].app_order;
      app.push(obj);
    }
    this.$store.commit('newApplies', app);
  }
  // 判断是否有图
  if (data.scaffold_image.length > 0) {
    let detailImageList = [];
    for (let i = 0; i < data.scaffold_image.length; i++) {
      if (data.scaffold_image[i].page_type === '1' || data.scaffold_image[i].page_type === 1) {
        // 有头图
        if (!this.arrayIn(setComponentsItems, 'setTopImg')) {
          setComponentsItems.push({component: 'setTopImg', index: 1});
        }
        this.$store.commit('newTopImgUrl', data.scaffold_image[i].image_url);
        this.$store.commit('newTopImgShow', true);
      }
      if (data.scaffold_image[i].page_type === '2' || data.scaffold_image[i].page_type === 2) {
        // 有详情图
        if (!this.arrayIn(setComponentsItems, 'setDetailImg')) {
          setComponentsItems.push({component: 'setDetailImg', index: 6});
        }
        let fileData = {};
        fileData.name = data.scaffold_image[i].image_name;
        fileData.image_url = data.scaffold_image[i].image_url;
        detailImageList.push(fileData);
        this.$store.commit('newDetailImgFileList', detailImageList);
        this.$store.commit('newDetailImgShow', true);
      }
      // alert(this.arrayInData(data.scaffold_image, 'page_type', '1'));
      // 没有头图
      if (!this.arrayInData(data.scaffold_image, 'page_type', '1')) {
        this.$store.commit('newTopImgUrl', '');
        this.$store.commit('newTopImgShow', false);
      }
      // 没有详情图
      if (!this.arrayInData(data.scaffold_image, 'page_type', '2')) {
        this.$store.commit('newDetailImgFileList', []);
        this.$store.commit('newDetailImgShow', false);
      }
    }
  } else {
    // 没有任何图
    this.$store.commit('newTopImgUrl', '');
    this.$store.commit('newTopImgShow', false);
    this.$store.commit('newDetailImgFileList', []);
    this.$store.commit('newDetailImgShow', false);
  }
  // alert(' setComponentsItems: ' + JSON.stringify(setComponentsItems) + ' getComponentsItems: ' + JSON.stringify(getComponentsItems));
  this.$store.commit('newSetComponentsItems', setComponentsItems);
  this.$store.commit('newGetComponentsItems', getComponentsItems);
};

// 重置vuex的状态
Vue.prototype.resetVuex = function () {
  /* vuex --> app.js */
  let getComponentsItems = [];
  let setComponentsItems = [{'component': 'setPageTitle', 'index': 0}];
  this.$store.commit('newSetComponentsItems', setComponentsItems);
  this.$store.commit('newGetComponentsItems', getComponentsItems);
  /* vuex --> applyDownload.js */
  this.$store.commit('newApplyDownloadTitle', '应用下载');
  this.$store.commit('newApplies', []);
  /* vuex --> background.js */
  this.$store.commit('newSwitchNum', 0);
  this.$store.commit('newPageColor', '#ffffff');
  this.$store.commit('newImgUrl', '');
  /* vuex --> button.js */
  // 按钮
  let buttonObject = {buttonFont: '请输入按钮文字', buttonColor: '#4ca9d4'};
  this.$store.commit('newPagebuttonObject', buttonObject);
  // 文本
  let wordsObject = {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center'};
  this.$store.commit('newWordsObject', wordsObject);
  // 超链接文本
  let descLinkObject = {wordsContent: '页面文本内容', wordsColor: '#4ca9d4', wordsPara: 'center', wordsUrl: ''};
  this.$store.commit('newWordsUrlObject', descLinkObject);
  // sim卡颜色
  let simObject = {simColLA: '#ff6600', simColLB: '#ffffff', simColRA: '#cccccc', simColRB: '#ffffff'};
  this.$store.commit('newSimObject', simObject);
  /* vuex --> detailImg.js */
  this.$store.commit('newDetailImgShow', false);
  this.$store.commit('newDetailImgFileList', []);
  /* vuex --> options.js */
  this.$store.commit('newSwitchNum', 2);
  let options = {switch_title01: '选项卡标题01', switch_title02: '选项卡标题02', switch_title03: '选项卡标题03', switch_content01: '选项卡内容01', switch_content02: '选项卡内容02', switch_content03: '选项卡内容03'};
  this.$store.commit('newSwitchObject', options);
  /* vuex --> project.js */
  this.$store.commit('newProjectList', []);
  this.$store.commit('newFolderList', []);
  this.$store.commit('newInnerProjectList', []);
  this.$store.commit('newActiveState', 'work');
  this.$store.commit('newContainerShow', true);
  /* vuex --> topImg.js */
  this.$store.commit('newPageTitle', '标题');
  this.$store.commit('newPageUrl', '');
  this.$store.commit('newPageDescContent', '');
  this.$store.commit('newTopImgShow', false);
  this.$store.commit('newTopImgUrl', '');
  this.$store.commit('newTopImgName', '');
  /* vuex --> 填写页 fill.js */
  let getFillComponentsItems = [];
  let setFillComponentsItems = [{'component': 'setPageTitle', 'index': 0, 'fixed': true}];
  this.$store.commit('newSetFillComponentsItems', setFillComponentsItems);
  this.$store.commit('newGetFillComponentsItems', getFillComponentsItems);
  this.$store.commit('newPageNature', [{pageTitle: '填写页', pageUrl: '', pageDesc: '', majorColor: '#4ca9d4'}]);
  this.$store.commit('newListTitles', []);
  this.$store.commit('newPersonInfo', [{radioPerInfo: 1}]);
  this.$store.commit('newDescribes', []);
  this.$store.commit('newButton', [{buttonFont: '请输入按钮文字', buttonColor: '#4ca9d4'}]);
  this.$store.commit('newProtocol', [{protocolFlag: true, protocolFont: '请输入协议名称', protocolColor: '#4ca9d4'}]);
  this.$store.commit('newSuccContent', [{successFlag: false, succDes: '您好'}]);
  this.$store.commit('newProtocol', [{protocolFont: '请输入协议名称', protocolColor: '#4ca9d4'}]);
  this.$store.commit('newChooseArea', [{curProvinceCode: 110000, curProvinceName: '北京', curCityCode: '', curCityName: ''}]);
  this.$store.commit('newChooseDisArea', [{curCityCode: '', curCityName: '', curDistrictCode: '', curDistrictName: ''}]);

};
// 填写页数据
Vue.prototype.submitFillData = function (categoryId, pageId) {
  // 获取显示的左侧组件,用于判断是否启用了该组件
  const setFillComponentsItems = this.$store.state.fill.setFillComponentsItems;
  console.log(JSON.stringify(setFillComponentsItems));
  const fillData = {};
  fillData.fill_index = [];
  const index = {};
  index.category_id = categoryId; // 文件夹ID
  index.page_id = pageId;
  index.page_type = 'fill';
  index.page_title =  this.$store.state.fill.pageNature[0].pageTitle;
  index.page_alias =  this.$store.state.fill.pageNature[0].pageUrl;
  index.page_desc =  this.$store.state.fill.pageNature[0].pageDesc;
  index.page_color =  this.$store.state.fill.pageNature[0].majorColor;
  index.page_pop_success_detail =  this.$store.state.fill.succContent[0].succDes;
  fillData.fill_index.push(index);
  // 描述模块 可以多次添加的
  fillData.fill_desc = [];
  const num = this.arrayInNum(setFillComponentsItems, 'setDescribe');
  if (num != 0) {
    // alert('num: ' + num);
    for (let i = 0; i < num; i++ ) {
      // alert('i: ' + i);
      const obj = {};
      obj.id = this.$store.state.fill.describes[i].index;
      if (this.$store.state.fill.describes[i].describe) {
        obj.text = this.$store.state.fill.describes[i].describe;
      } else {
        obj.text = '';
      }
      obj.sort = this.arrayInSort(setFillComponentsItems, obj.id);
      fillData.fill_desc.push(obj);
    }
  }
  // 个人信息模块
  fillData.fill_personInfo = [];
  if (this.arrayInNameSort(setFillComponentsItems, 'setPersonInfo')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setPersonInfo');
    obj.radioPerInfo = this.$store.state.fill.personInfo[0].radioPerInfo;
    obj.id = setFillComponentsItems[obj.sort].index;
    fillData.fill_personInfo.push(obj);
  }
  // 选择手机号模块
  fillData.fill_chooseTel = [];
  if (this.arrayInNameSort(setFillComponentsItems, 'setChooseTel')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setChooseTel');
    obj.id = setFillComponentsItems[obj.sort].index;
    fillData.fill_chooseTel.push(obj);
  }
  // 首月资费模块
  fillData.fill_firstMonth = [];
  if (this.arrayInNameSort(setFillComponentsItems, 'setFirstMonth')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setFirstMonth');
    obj.id = setFillComponentsItems[obj.sort].index;
    fillData.fill_firstMonth.push(obj);
  }
  // 收货地址模块
  fillData.fill_deliveryAdd = [];
  if (this.arrayInNameSort(setFillComponentsItems, 'setDeliveryAddress')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setDeliveryAddress');
    obj.id = setFillComponentsItems[obj.sort].index;
    fillData.fill_deliveryAdd.push(obj);
  }
  // 协议模块
  fillData.fill_protocol = [];
  if (this.arrayInNameSort(setFillComponentsItems, 'setProtocol')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setProtocol');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.protocolFlag = this.$store.state.fill.protocol[0].protocolFlag;
    obj.protocolFont = this.$store.state.fill.protocol[0].protocolFont;
    obj.protocolColor = this.$store.state.fill.protocol[0].protocolColor;
    fillData.fill_protocol.push(obj);
  }
  // 按钮模块
  fillData.fill_button = [];
  if (this.arrayInNameSort(setFillComponentsItems, 'setButton')) {
    const obj = {};
    obj.sort = this.arrayInNameSort(setFillComponentsItems, 'setButton');
    obj.id = setFillComponentsItems[obj.sort].index;
    obj.buttonFont = this.$store.state.fill.button[0].buttonFont;
    obj.buttonColor = this.$store.state.fill.button[0].buttonColor;
    fillData.fill_button.push(obj);
  }
  console.log(JSON.stringify(fillData));
  return fillData;
};
// 获取填写页数据
Vue.prototype.obtainFillData = function (data) {
  // console.log(JSON.stringify(data));
  console.log('进入获取数据函数');
  let getFillComponentsItems = [];
  let setFillComponentsItems = [{'component': 'setPageTitle', 'index': 0, 'fixed': true}];
  if (data.fill_index.length > 0) {
    let index_arr = [];
    let index = {};
    index.pageTitle = data.fill_index[0].page_title;
    index.pageUrl = data.fill_index[0].page_alias;
    index.pageDesc = data.fill_index[0].page_desc;
    index.majorColor = data.fill_index[0].page_color;
    index_arr.push(index);
    this.$store.commit('newPageNature', index_arr);
    // 成功弹框
    let pop_arr = [];
    let pop = {
      successFlag: false,
      succDes: data.fill_index[0].page_pop_success_detail
    };
    pop_arr.push(pop);
    this.$store.commit('newSuccContent', pop_arr);
  }
  // 判断是否有描述
  if (data.fill_desc.length > 0) {
    let arr = [];
    for (let i in data.fill_desc) {
      const obj = {};
      obj.index = data.fill_desc[i].id;
      obj.describe = data.fill_desc[i].text;
      arr.push(obj);
      getFillComponentsItems[data.fill_desc[i].sort] = {
        'component': 'getDescribe',
        'index': data.fill_desc[i].id
      };
      setFillComponentsItems[data.fill_desc[i].sort] = {
        'component': 'setDescribe',
        'index': data.fill_desc[i].id
      };
    }
    this.$store.commit('newDescribes', arr);
    console.log('描述数据: ' + JSON.stringify(arr));
  }
  // 判断是否有个人信息
  if (data.fill_personInfo.length > 0) {
    let arr = [];
    let obj = {};
    obj.radioPerInfo = data.fill_personInfo[0].radioPerInfo;
    arr.push(obj);
    this.$store.commit('newPersonInfo', arr);
    getFillComponentsItems[data.fill_personInfo[0].sort] = {
      'component': 'getPersonInfo',
      'index': data.fill_personInfo[0].id
    };
    setFillComponentsItems[data.fill_personInfo[0].sort] = {
      'component': 'setPersonInfo',
      'index': data.fill_personInfo[0].id
    };
    this.$store.commit('newPersonInfo', arr);
  }
  // 判断是否有选择手机号
  if (data.fill_chooseTel.length > 0) {
    getFillComponentsItems[data.fill_chooseTel[0].sort] = {
      'component': 'getChooseTel',
      'index': data.fill_chooseTel[0].id
    };
    setFillComponentsItems[data.fill_chooseTel[0].sort] = {
      'component': 'setChooseTel',
      'index': data.fill_chooseTel[0].id
    };
  }
  // 判断是否有选择首月资费
  if (data.fill_firstMonth.length > 0) {
    getFillComponentsItems[data.fill_firstMonth[0].sort] = {
      'component': 'getFirstMonth',
      'index': data.fill_firstMonth[0].id
    };
    setFillComponentsItems[data.fill_firstMonth[0].sort] = {
      'component': 'setFirstMonth',
      'index': data.fill_firstMonth[0].id
    };
  }
  // 判断是否有添加收货地址
  if (data.fill_deliveryAdd.length > 0) {
    getFillComponentsItems[data.fill_deliveryAdd[0].sort] = {
      'component': 'getDeliveryAddress',
      'index': data.fill_deliveryAdd[0].id
    };
    setFillComponentsItems[data.fill_deliveryAdd[0].sort] = {
      'component': 'setDeliveryAddress',
      'index': data.fill_deliveryAdd[0].id
    };
  }
  // 判断是否有添加协议
  if (data.fill_protocol.length > 0) {
    let arr = [];
    let obj = {};
    obj.protocolFlag = data.fill_protocol[0].protocolFlag;
    obj.protocolFont = data.fill_protocol[0].protocolFont;
    obj.protocolColor = data.fill_protocol[0].protocolColor;
    arr.push(obj);
    getFillComponentsItems[data.fill_protocol[0].sort] = {
      'component': 'getProtocol',
      'index': data.fill_protocol[0].id
    };
    setFillComponentsItems[data.fill_protocol[0].sort] = {
      'component': 'setProtocol',
      'index': data.fill_protocol[0].id
    };
    this.$store.commit('newProtocol', arr);
  }
  // 判断是否有按钮
  if (data.fill_button.length > 0) {
    let arr = [];
    let obj = {};
    obj.buttonFont = data.fill_button[0].buttonFont;
    obj.buttonColor = data.fill_button[0].buttonColor;
    arr.push(obj);
    getFillComponentsItems[data.fill_button[0].sort] = {
      'component': 'getButton',
      'index': data.fill_button[0].id
    };
    setFillComponentsItems[data.fill_button[0].sort] = {
      'component': 'setButton',
      'index': data.fill_button[0].id
    };
    this.$store.commit('newButton', arr);
  }
  setFillComponentsItems = this.arrayRemoveNull(setFillComponentsItems);
  getFillComponentsItems = this.arrayRemoveNull(getFillComponentsItems);
  this.$store.commit('newSetFillComponentsItems', setFillComponentsItems);
  this.$store.commit('newGetFillComponentsItems', getFillComponentsItems);
  console.log('setFillComponentsItems: ' + JSON.stringify(setFillComponentsItems));
  console.log('getFillComponentsItems: ' + JSON.stringify(getFillComponentsItems));
};
