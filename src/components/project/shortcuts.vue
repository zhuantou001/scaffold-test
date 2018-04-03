<template>
  <div class="shortcuts-box">
    <a href="javscript:;" class='backTop' title='回到顶部' @click='backTop'></a>
    <a href="javscript:;" class='backBottom' title='回到底部' @click='backBottom'></a>
  </div>
</template>


<script>
export default {
  name: "shortcuts-box",
  data() {
    return {};
  },
  methods: {
    backTop() {
      const elem = document.getElementsByClassName("container")[0];
      // let osTop = '';
      let oSpeed = 20;
      let timer = null;
      timer = setInterval(function() {
        // osTop = elem.scrollTop;
        // oSpeed = Math.ceil(osTop / 5); //滚动速度
        // elem.scrollTop = osTop - oSpeed;
        // if (osTop == 0) {
        //   clearInterval(timer);
        // }
        elem.scrollTop -= oSpeed;
        if (elem.scrollTop == 0) {
          clearInterval(timer);
        }
      }, 10);
    },
    backBottom() {
      const elem = document.getElementsByClassName("container")[0];
      let oSpeed = 20;
      let timer = null;
      timer = setInterval(function() {
        elem.scrollTop += oSpeed;
        if (elem.scrollHeight - elem.scrollTop === elem.clientHeight) {
          clearInterval(timer);
        }
      }, 10);
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.shortcuts-box {
  position: fixed;
  bottom: 10px;
  right: 10px;
  a {
    display: inline-block;
    background-color: #ddd;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    &:hover {
      background-color: #20a0ff;
    }
    &.backTop {
      display: block;
      border-bottom: none;
      margin-bottom: 1px;
    }
    &.backTop::after {
      content: "";
      display: inline-block;
      height: 15px;
      width: 15px;
      -webkit-transform: rotateY(45deg);
      border: 1px solid #fff;
      transform: rotate(45deg);
      border-right: none;
      border-bottom: none;
      margin-bottom: -6px;
    }
    &.backBottom::after {
      content: "";
      display: inline-block;
      height: 15px;
      width: 15px;
      -webkit-transform: rotateY(45deg);
      border: 1px solid #fff;
      transform: rotate(45deg);
      border-left: none;
      border-top: none;
      margin-bottom: 3px;
    }
  }
}
</style>
