<template>
  <a class="back" href='javascript:void(0);' @click='backToTop' title='回到顶部' :class='{show:scrollTop>200}'>
  </a>
</template>

<script>
  export default {
    data: function () {
      return {
        scrollTop: ''
      };
    },
    computed: {},
    mounted() {
      window.addEventListener('scroll', this.getScrollTop);  //滚动事件监听
    },
    methods: {
      getScrollTop() {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      },
      backToTop() {
        var target = 0;
        clearInterval(timer);
        var timer = setInterval(function () {
          target = document.documentElement.scrollTop || document.body.scrollTop;
          target -= Math.ceil(target / 10);//做减速运动
          window.scrollTo(0, target);
          if (target == 0) {
            clearInterval(timer);
          }
        }, 10);
      }
    },
    components: {}
  };
</script>

<style lang="scss" scoped>
  .back {
    opacity: 0;
    position: absolute;
    width: 32px;
    height: 32px;
    bottom: 15px;
    right: 20px;
    background: url('../../assets/goTop.png') no-repeat;
    // transition: .5s opacity linear;
    background-size: 100%; 
    z-index: 9999;
  }

  // .back:hover {
  //   background: url('../../assets/backTop.png') no-repeat 0 -65px;
  // }

  .hide {
    opacity: 0;
  }

  .show {
    opacity: 1;
  }
</style>
