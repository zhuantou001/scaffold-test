<template>
  <span>
    <section v-show="showBottomBox" class="popup">
      <div class='content'>
        底部底部底部
      </div>
    </section>
    <div class="mask" v-show="showBottomBox" @click="$emit('close')"></div>
  </span>
</template>

<script>
  import {Config, ROUTES} from '../../common/api';
  export default {
    data() {
      return {
      };
    },
    props: ["showBottomBox"],
    mounted () {
    },
    watch: {
    },
    methods: {
    },
    computed: {
    },
    components: {
    }
  };
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.7);
  }
  .popup {
    width: 100%;
    padding: 0 12px;
    background-color: transparent;
    z-index: 1003;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  .content {
    background-color: #fff;
    padding: 5px 0 20px 0;
    border-radius: 5px;
    position: relative;
  }
  .popup-close {
    display: block;
    position: fixed;
    bottom: -56px;
    left: 50%;
    margin-left: -13px;
    width: 26px;
    height: 26px;
    background: url(../../../assets/closeImg.png) no-repeat;
    background-size: 26px;
  }
  }
</style>
