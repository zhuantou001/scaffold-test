<template>
  <div>
    <div class="login" @click="openModal">登录</div>
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
      <div slot="footer"></div>
    </modalBox>
  </div>
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
      submit () {
        this.$ajax({
          method: 'post',
          url: 'login',
          data: {
            username: this.name,
            password: this.pwd
          }
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

</style>
