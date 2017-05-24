<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <router-link to="/scaffold">Go to SCAFFOLD</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to SCAFFOLD'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
