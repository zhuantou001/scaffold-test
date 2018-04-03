/*  Config */
import config from '../../../config/config';

export const Config = {
  // API接口地址本地
  // api_url: 'http://127.0.0.1:3002',
  // API接口地址本地
  // api_url: 'http://192.168.1.103:3001',
  // 图片服务器地址
  // image_url: 'http://192.168.1.103:3001'
  // 测试环境
  // api_url: 'http://demo.mall.10010.com:8104/scaffold-app',
  api_url: config.serverRoot(),
  // 图片服务器地址
  image_url: config.imgBaseUrl(),
  // 图片预览服务器地址
  img_prev_url: config.imgPrevUrl(),
  // 导出页面主机地址
  http_show_url: config.httpShowRoot(),
  http_show_url_pro: config.httpShowProRoot(),

};

/*  Routes */
export const ROUTES = {
  // 登录
  signin: '/users/signin',
  // 文件夹操作  scaffold_image 查询所有填写页列表  scaffold_index 查询所有文件夹 scaffold_option 查询所有落地页
  queryFileList: '/index/queryFileList',
  addFolders: '/index/insertFolders',
  updateFolders: '/index/updateFolders',
  deleteFolders: '/index/deleteFolders',
  // 文件夹里查询页面 传category_id  scaffold_index 查询所有文件夹里面的填写页列表  scaffold_option 查询所有文件夹里面的落地页
  queryCategoryFile: '/scaffold/queryCategoryFile',
  // 保存落地页数据
  addScaffolOption: '/scaffold/addScaffolOption',
  // 获取落地页页面数据 传page_id
  queryPageidData: '/scaffold/queryPageidData',
  // 删除页面 传page_id
  deleteScaffolOption: '/scaffold/deleteScaffolOption',
  // 更新 传page_id
  updateScaffolOption: '/scaffold/updateScaffolOption',
  updateScaffolProOption: '/scaffold/updateScaffolProOption',
  updateScaffoldPro: '/scaffold/updateScaffoldPro',
  // app图片
  appImgUpload: '/scaffold/appImgUpload',
  // 头图图片
  headImgUpload: '/scaffold/headImgUpload',
  // 详情图图片
  detailImgUpload: '/scaffold/detailImgUpload',
  // 删除详情图
  deleteDetailImg: '/scaffold/deleteDetailImg',
    // 背景图图片
  bgImgUpload: '/scaffold/bgImgUpload',
  // 通过别名查询页面全部数据--预览
  queryPageAliasData: '/scaffold/queryPagealiasData',
  // 通过别名查询页面全部数据--正式
  queryPagealiasProData: '/scaffold/queryPagealiasProData',
  // 背景图图片
  successUpload: '/scaffold/alertImgUpload',
  // 选项卡图片
  optionImgUpload: '/scaffold/optionImgUpload',
  // 按钮图片
  btnImgUpload: '/scaffold/otherImgUpload',
  /**
   * 填写页
   * **/
  // 新建填写页 POST
  addFillOption: '/fill/addFillOption',
  // 查询填写页数据 POST
  queryFillidData: '/fill/queryFillidData',
  // 删除填写页 POST
  deleteFillOption: '/fill/deleteFillOption',
  // 编辑填写页 POST
  updateFillOption: '/fill/updateFillOption',
  // 通过别名查询填写页 POST
  queryFillaliasData: '/fill/queryFillaliasData',
  // 获取用户列表
  getUserList: '/index/getUserList',
  // 获取当前用户被其他用户授权的其他用户列表
  queryAuthList: '/index/queryAuthList',
  // 添加用户授权
  addUserAuth: '/index/addUserAuth',
  // 删除用户授权
  delUserAuth: '/index/delUserAuth',
  // 落地页修改立即生效
  refreshCdnPage: '/index/refreshCdnPage',
  // 填写页修改立即生效
  refreshCdnFill: '/index/refreshCdnFill'

};
