import Mock from 'mockjs';

let allList = Mock.mock('allList', 'get', function (options) {
  // 传入userId
  let data = {};
  data.state = true;
  data.folder_total = 2;
  data.project_total = 1;
  data.folders = [{
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    project_num: 1,
    id: 'folder_01',
    name: '文件夹1',
    userId: 111
  }, {
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    project_num: 0,
    id: 'folder_02',
    name: '文件夹22',
    userId: 111
  }, {
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    project_num: 0,
    id: 'folder_03',
    name: '文件夹22',
    userId: 111
  }, {
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    project_num: 0,
    id: 'folder_04',
    name: '文件夹22',
    userId: 111
  }, {
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    project_num: 0,
    id: 'folder_05',
    name: '文件夹22',
    userId: 111
  }, {
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    project_num: 0,
    id: 'folder_06',
    name: '文件夹22',
    userId: 111
  }];
  data.projects = [{
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    name: '我的作品,哈哈哈',
    coverImg: '../template/images/king_map_top.png',
    id: 'projects_01',
    url: ''
  }, {
    creatTime: '2017-10-10 12:25:54',
    updateTime: '2017-10-10 12:25:54',
    name: '我的作品2222',
    coverImg: '../template/images/king_map_top.png',
    id: 'projects_01',
    url: ''
  }];
  return data;
});

let folderInnerList = Mock.mock('folderInnerList', 'get', function (options) {
  // 传入folder id
  // alert(JSON.stringify(options));
  let bodyData = JSON.parse(options.body);
  let data = {};
  data.state = true;
  data.project_total = 2;
  data.projects = [];
  if (bodyData.id === 'folder_01') {
    data.projects = [{
      creatTime: '2017-10-10 12:25:54',
      updateTime: '2017-10-10 12:25:54',
      name: 'folder_01我的作品3,哈哈哈',
      coverImg: '../template/images/king_map_top.png',
      id: 'projects_01',
      url: ''
    }, {
      creatTime: '2017-10-10 12:25:54',
      updateTime: '2017-10-10 12:25:54',
      name: 'folder_01我的作品5555',
      coverImg: '../template/images/king_map_top.png',
      id: 'projects_01',
      url: ''
    }];
  } else
  if (bodyData.id === 'folder_02') {
    data.projects = [{
      creatTime: '2017-10-10 12:25:54',
      updateTime: '2017-10-10 12:25:54',
      name: 'folder_02我的作品8',
      coverImg: '../template/images/king_map_top.png',
      id: 'projects_01',
      url: ''
    }];
  }
  return data;
});

export default {
  allList,
  folderInnerList
};
