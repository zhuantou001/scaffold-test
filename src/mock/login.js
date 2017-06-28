import Mock from 'mockjs';

export default Mock.mock('login', 'post', function (options) {
  let bodyData = JSON.parse(options.body);
  let msg = {};
  if (bodyData.username === 'admin' && bodyData.password === 'admin') {
    msg.state = true;
    msg.username = bodyData.username;
    msg.id = 111;
  } else {
    msg.state = false;
  }
  return msg;
});

