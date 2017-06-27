<template>
  <div class="hello">
    <h5>{{ msg }}</h5>
    <demo :links="link1"></demo>
    <h2>Ecosystem</h2>
    <demo :links="link2"></demo>
  </div>
</template>

<script>
import Demo from '../components/demo/Demo';
import { mapState } from 'vuex';
export default {
  data () {
    return {
    };
  },
  components: {
    Demo
  },
  computed: {
    msg () {
      return this.$store.state.app.msg;
    },
    ...mapState({
      link1: state => state.demo.link1,
      link2: state => state.demo.link2
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
