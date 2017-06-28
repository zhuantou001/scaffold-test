<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <section v-show="!isLogin">
      <h4>您好,请 <login></login></h4>
    </section>
    <section v-show="isLogin">
      <h4>欢迎 {{loginMsg.username}}</h4>
      <router-link to="/scaffold">新建落地页</router-link> |
      <router-link to="/project">我的作品管理</router-link>
    </section>
  </div>
</template>

<script>
import login from './login/login';

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to SCAFFOLD',
      isLogin: false
    };
  },
  methods: {
  },
  computed: {
    loginMsg () {
      let obj = {};
      // 先从vuex里取值,没有的话从localStorage取值
      // 设置从Vuex是为了登录状态改变时立即更新页面DOM元素
      if (this.$store.state.app.user === '{}') {
        obj = this.$store.state.app.user;
        console.log('store:' + JSON.stringify(obj));
      } else if (localStorage.getItem('user')) {
        obj = JSON.parse(localStorage.getItem('user'));
        console.log('localStorage:' + JSON.stringify(obj));
      }
      if (obj.username) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      return obj;
    }
  },
  components: {
    login
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

</style>
