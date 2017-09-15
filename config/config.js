var Env = require('./env');

var httpRoots = {
  dev: 'http://10010.com:7070/scaffold/',
  test: 'http://demo.mall.10010.com:8104/scaffold/',
  pro: 'http://m.10010.com/scaffold/'
};

function parse (config) {
  switch (Env.env) {
    case 'production':
      return config.pro;
    case 'test':
      return config.test;
    default:
      return config.dev;
  }
}

module.exports = {
  httpRoot () {
    return parse(httpRoots);
  }
};
