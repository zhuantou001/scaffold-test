import Mock from 'mockjs';

export default Mock.mock('login', {

  'users': [
    {
      'id': 1,
      'username': 'aaa',
      'password': 'aaa'
    },
    {
      'id': 2,
      'username': 'bbb',
      'password': 'bbb'
    },
    {
      'id': 3,
      'username': 'ccc',
      'password': 'ccc'
    }
  ]

});
