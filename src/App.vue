<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    let allowBack = this.$store.state.app.forbidHistory;
    window.onpopstate = () => {
      if (!allowBack) {
        history.go(1);
      }
    };
  }
};
</script>
