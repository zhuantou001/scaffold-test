import Mock from 'mockjs';

let login = Mock.mock('login', 'post', function (options) {
  let bodyData = JSON.parse(options.body);
  let msg = {};
  if (bodyData.tel === '1500008888' && bodyData.password === '123456') {
    msg.ret_code = 0;
    msg.username = bodyData.username;
    msg.id = 111;
  } else {
    msg.ret_code = 1;
  }
  return msg;
});

export default {
  login
};
