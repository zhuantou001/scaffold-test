<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <section v-show="!isLogin"> -->
    <section>
      <!-- <h4>您好,请 <login></login></h4> -->
      <login></login>
    </section>
    <!-- <section v-show="isLogin">
      <h4>欢迎 {{loginMsg.username}}</h4>
      <span @click="toScaffold('ground')" style="cursor:pointer;">新建落地页</span> |
      <span @click="toScaffold('fill')" style="cursor:pointer;">新建填写页</span> |
      <router-link to="/project">我的作品管理</router-link>
    </section> -->
    <!--<loadingIcon></loadingIcon>-->

    <!--<snailIcon :v_id="testId" :v_color="testColor"></snailIcon>-->
    <!--<sorryIcon :v_id="testId1" :v_color="testColor1"></sorryIcon>-->
    <!--<timeOutIcon :v_id="testId2" :v_color="testColor2"></timeOutIcon>-->
    <!--<successIcon :v_id="testId3" :v_color="testColor3"></successIcon>-->

    <!--<backToTopWhole></backToTopWhole>-->

  </div>
</template>

<script>
import login from './login/login';
import {resetVuex} from './common/common';
import './common/reset.scss';
import snailIcon from './tabImg/snailIcon';
import sorryIcon from './tabImg/sorryIcon';
import timeOutIcon from './tabImg/timeOutIcon';
import successIcon from './tabImg/successIcon';
import loadingIcon from './tabImg/loadingIcon';
import backToTopWhole from './common/backToTopWhole';

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to SCAFFOLD',
      isLogin: false,
      testId: 'snailId',
      testColor: {"colorA":"#f39800"},
      testId1: 'sorryId',
      testColor1: {"colorA":"#f00"},
      testId2: 'timeOutId',
      testColor2: {"colorA":"#f39800"},
      testId3: 'successId',
      testColor3: {"colorA":"#f39800"}
    };
  },
  mounted () {
    document.getElementsByTagName("title")[0].text = '装修工程';
    console.log("%c嗯,还可以", "text-align:center;font-size:10px;color: rgb(32, 160, 255);");
    let userObj = {};
    if (localStorage.getItem('user')) {
        userObj = JSON.parse(localStorage.getItem('user'));
      }
    if (userObj) {
      if (userObj.username) {
        this.$router.push('/project');
      }
    }
  },
  methods: {
    toScaffold (style) {
      // 清空
      // alert(style);
      localStorage.setItem('projectData', '');
      localStorage.setItem('singleFillData', '');
      this.resetVuex();
      this.$router.push('/scaffold/' + style);
    }
  },
  computed: {
    loginMsg () {
      let obj = {};
      // 先从vuex里取值,没有的话从localStorage取值
      // 设置从Vuex是为了登录状态改变时立即更新页面DOM元素
      if (this.$store.state.app.user === '{}') {
        obj = this.$store.state.app.user;
      } else if (localStorage.getItem('user')) {
        obj = JSON.parse(localStorage.getItem('user'));
      }
      if (obj) {
        if (obj.username) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      } else {
        this.isLogin = false;
      }
      return obj;
    }
  },
  components: {
    login,
    resetVuex,
    snailIcon,
    sorryIcon,
    timeOutIcon,
    successIcon,
    loadingIcon,
    backToTopWhole
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

</style>
