var Env = require('./env');

var httpRoots = {
  dev: 'http://127.0.0.1:8888/scaffold/',
  test: 'https://demo.mall.10010.com:8108/scaffold/',
  pro: 'https://res.mall.10010.cn/mall/scaffold/',
  gray: 'http://10.142.160.144:8101/mall/scaffold-gray/'
};

var httpShowRoots = {
  dev: 'http://127.0.0.1:8001/scaffold-show/prew/',
  test: 'https://demo.mall.10010.com:8108/scaffold-show/prew/',
  pro: 'https://m.10010.com/scaffold-show/prew/',
  gray: 'http://10.142.160.144:8101/mall/scaffold-show-gray/prew/'
};
// 新增预览链接
var httpShowProRoots = {
  dev: 'http://127.0.0.1:8001/scaffold-show/',
  test: 'https://demo.mall.10010.com:8108/scaffold-show/',
  pro: 'https://m.10010.com/scaffold-show/',
  gray: 'http://10.142.160.144:8101/mall/scaffold-show-gray/'
};

var serverRoots = {
  dev: 'http://192.168.1.130:3002',
  test: 'https://demo.mall.10010.com:8108/scaffold-app',
  pro: 'https://m.10010.com/scaffold-app',
  gray: 'http://10.142.145.152:3003'
};


var imgBaseUrls = {
  dev: 'https://demo.mall.10010.com:8108/scaffold-img',
  test: 'https://demo.mall.10010.com:8108/scaffold-img',
  pro: 'https://res.mall.10010.cn/mall/scaffold-img',
  gray: 'http://10.142.160.144:8101/mall/scaffold-img-gray'
};

var imgPrevUrls = {
  dev: 'https://demo.mall.10010.com:8108/scaffold-img',
  test: 'https://demo.mall.10010.com:8108/scaffold-img',
  pro: 'https://m.10010.com/scaffold-img-prev',
  gray: 'http://10.142.160.144:8101/mall/scaffold-img-gray'
};

function parse (config) {
  switch (Env.env) {
    case 'production':
      return config.pro;
    case 'test':
      return config.test;
    case 'gray':
      return config.gray;
    default:
      return config.dev;
  }
}

module.exports = {
  httpRoot () {
    return parse(httpRoots);
  },
  httpShowRoot () {
    return parse(httpShowRoots);
  },
  httpShowProRoot () {
    return parse(httpShowProRoots);
  },
  serverRoot () {
    return parse(serverRoots);
  },
  imgBaseUrl () {
    return parse(imgBaseUrls);
  },
  imgPrevUrl () {
    return parse(imgPrevUrls);
  }
};
