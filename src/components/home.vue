<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h3><login></login></h3>
    <router-link to="/scaffold">新建落地页</router-link> |
    <router-link to="/project">我的作品管理</router-link>
  </div>
</template>

<script>
import login from './login/login';

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to SCAFFOLD'
    };
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
