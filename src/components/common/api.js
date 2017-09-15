/*  Config */

export const Config = {
  // API接口地址本地
  api_url: 'http://192.168.1.149:3001',
  // 图片服务器地址
  image_url: 'http://192.168.1.149:3001'
  // 测试环境
  // api_url: 'http://demo.mall.10010.com:8104/scaffold-app',
  // 图片服务器地址
  // image_url: 'http://demo.mall.10010.com:8104/test/mall/scaffold-app/public'

};

/*  Routes */
export const ROUTES = {
  // 登录
  signin: '/users/signin',
  // 文件夹操作
  queryFileList: '/index/queryFileList',
  addFolders: '/index/insertFolders',
  updateFolders: '/index/updateFolders',
  deleteFolders: '/index/deleteFolders',
  // 文件夹里查询页面 传category_id
  queryCategoryFile: '/scaffold/queryCategoryFile',
  // 保存数据
  addScaffolOption: '/scaffold/addScaffolOption',
  // 获取页面数据 传page_id
  queryPageidData: '/scaffold/queryPageidData',
  // 删除页面 传page_id
  deleteScaffolOption: '/scaffold/deleteScaffolOption',
  // 更新 传page_id
  updateScaffolOption: '/scaffold/updateScaffolOption',
  // app图片
  appImgUpload: '/scaffold/appImgUpload',
  // 头图图片
  headImgUpload: '/scaffold/headImgUpload',
  // 详情图图片
  detailImgUpload: '/scaffold/detailImgUpload',
    // 背景图图片
  bgImgUpload: '/scaffold/bgImgUpload',
  // 通过别名查询页面全部数据
  queryPageAliasData: '/scaffold/queryPagealiasData'

};
