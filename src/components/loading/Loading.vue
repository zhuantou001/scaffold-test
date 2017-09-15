<template>
  <span>
    <transition name="scaffold-fade-mask" mode="out-in">
      <div v-if="show" class="scaffold-mask">
        <div class="scaffold-loading-hud">
          <img class="ccs-loading" src="./loading-sunny.gif">
          <p>{{label}}</p>
        </div>
      </div>
    </transition>
  </span>
</template>

<style>
  .scaffold-loading-hud {
    position: fixed;
    text-align: center;
    top: 50%;
    left: 50%;
    width: 240px;
    height: 240px;
    margin: -120px 0 0 -120px;
    background-color: black;
    opacity: 0.8;
    border-radius: 20px;
    z-index: 20005;
  }

  .scaffold-loading-hud img {
    width: 76px;
    height: 76px;
    padding-top: 60px;
    z-index: 20002;
  }

  .scaffold-loading-hud p {
    font-size: 26px;
    margin-top: -10px;
    color: white;
    z-index: 20002;
  }
</style>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: '加载中...'
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
