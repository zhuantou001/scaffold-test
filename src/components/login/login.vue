<template>
  <span>
    <span class="login" @click="openModal">登录</span>
    <modalBox v-if="showModal" @closeModal="showModal=false" :width="400">
      <div slot="header">登录</div>
      <div slot="body">
        <form class="loginForm">
          <div>
            <el-input type="text" class="loginInput" v-model="name" placeholder="请输入账号(手机号、邮箱)"></el-input>
          </div>
          <div>
            <el-input type="password" class="loginInput" v-model="pwd" placeholder="请输入密码(6个字符以上)"></el-input>
          </div>
          <div>
            <el-button type="primary" class="loginBtn" @click="submit">登录</el-button>
          </div>
        </form>
      </div>
      <div slot="footer">
        <span class="footer-tips">(提示:用户名:admin 密码:admin)</span>
      </div>
    </modalBox>
  </span>
</template>

<script>
  import modalBox from '../common/modalBox';
  import loginData from '../../mock/login';
  export default {
    name: 'login',
    data () {
      return {
        showModal: false,
        name: '',
        pwd: '',
        error: ''
      };
    },
    methods: {
      openModal () {
        this.showModal = true;
      },
      successMsg (msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      failMsg (msg) {
        this.$message.error(msg);
      },
      submit () {
        let self = this;
        this.$ajax({
          method: 'post',
          url: 'login',
          data: {
            username: this.name,
            password: this.pwd
          }
        }).then(function (res) {
          if (res.data.state) {
            self.successMsg('登录成功');
            let object = {};
            object.username = res.data.username;
            object.id = res.data.id;
            // 用户信息存入localStorage
            localStorage.setItem('user', JSON.stringify(object));
            // 用户信息存入store
            self.$store.commit('newUser', object);
            console.log(localStorage.getItem('user'));
            // 关闭模态框
            setTimeout(function () {
              self.showModal = false;
            }, 1500);
          } else {
            self.failMsg('用户名或密码错误');
          }
          console.log(res.data);
        }).catch(function (err) {
          console.log(err);
          self.failMsg('服务器错误');
        });
      }
    },
    components: {
      modalBox,
      loginData
    }
  };
</script>

<style lang="scss" scoped>
  .login{
    cursor:pointer;
    font-size: 20px;
    color:#0b97c4;
  }
  .loginForm{
    margin:20px auto;
    .loginInput{
      margin:10px auto;
      width:80%;

    }
    .loginBtn{
      margin:20px auto;
      width:160px;
    }
  }
  .footer-tips{
    font-size: 12px;
  }

</style>
