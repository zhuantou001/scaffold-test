<template>
  <div>
    <p class="top-desc" v-html="describe"></p>
    <!--<pre>{{describe}}</pre>-->
  </div>
</template>


<script>
  export default {
    data () {
      return {
      };
    },
    props: ['index'],
    methods: {
    },
    computed: {
      describe () {
        let arr = this.$store.state.fill.describes;
        for (let i in arr) {
          if (arr[i].index === this.index) {
            return arr[i].describe;
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  $error: #ff3021;
  $theme: #40c9b3;
  .top-desc{
    border-bottom:1px solid #ddd;
    padding:8px 0;
    font-size: 12px;
    margin:0 10px;
    color: #888;
  p{
    margin:0;
  }
  &.error {
     color: $error;
   }
  }
</style>
