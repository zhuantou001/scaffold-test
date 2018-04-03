<template>
  <div class="shortcuts-box">
    <a href="javascript:;" class='sortBox' :class="{sortButtonActive: isSort}" @click="openSort">{{sortButtonFont}}</a>
    <a href="javscript:;" class='btn backTop' @click='backTop'></a>
    <a href="javscript:;" class='btn backBottom' @click='backBottom'></a>
  </div>
</template>


<script>
export default {
  name: "shortcuts-box",
  data() {
    return {
      // isSort: false, // 是否开启排序
      sortButtonFont: "开启排序" // 开启排序文案
    };
  },
  methods: {
    backTop() {
      const elem = document.getElementsByClassName("right-space")[0];
      let oSpeed = 20;
      let timer = null;
      timer = setInterval(function() {
        elem.scrollTop -= oSpeed;
        if (elem.scrollTop == 0) {
          clearInterval(timer);
        }
      }, 10);
    },
    backBottom() {
      const elem = document.getElementsByClassName("right-space")[0];
      let oSpeed = 20;
      let timer = null;
      timer = setInterval(function() {
        elem.scrollTop += oSpeed;
        if (elem.scrollHeight - elem.scrollTop === elem.clientHeight) {
          clearInterval(timer);
        }
      }, 10);
    },
    openSort(event) {
      if (this.isSort) {
        this.$store.commit('newSort', false);
        this.sortButtonFont = "开启排序";
      } else {
        this.$store.commit('newSort', true);
        this.sortButtonFont = "关闭排序";
      }
    }
  },
  computed: {
    isSort () {
      return this.$store.state.project.sort;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.shortcuts-box {
  position: fixed;
  bottom: 10px;
  right: 10px;
  .sortButtonActive {
    border-color: #13ce66 !important;
    color: #13ce66 !important;
  }
  .btn {
    display: inline-block;
    background-color: #ddd;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    transition: all 0.2s ease-in;
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
  .sortBox {
    width: 20px;
    padding: 9px;
    color: #333;
    text-decoration: none;
    display: inline-block;
    line-height: 20px;
    border: 1px solid #c4c4c4;
    margin-bottom: 1px;
    position: relative;
    z-index: 100;
    background-color: #ffffff;
    &::before {
      content: "";
      position: absolute;
      width: 54px;
      height: 50px;
      right: -10px;
      top: -39px;
      background: url(../../assets/greeting.png) no-repeat;
      background-size: cover;
    }
  }
}
</style>
