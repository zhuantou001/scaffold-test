<template>
  <transition name="scaffold-fade-mask" mode="out-in">
    <div v-if="show">
      <div class="scaffold-toast-hud">
        <p class="scaffold-toast-label">{{label}}</p>
      </div>
    </div>
  </transition>
</template>

<style>
  .scaffold-toast-hud {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin: -100px 0 0 -100px;
    background-color: black;
    opacity: 0.7;
    border-radius: 20px;
    z-index: 20001;
    padding: 0 10px;
  }

  .scaffold-toast-label {
    position: relative;
    text-align: center;
    margin-top: 80px;
    font-size: 26px;
    color: white;
    z-index: 20002;
  }
</style>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false,
        twoWay: true
      },
      duration: {
        type: Number,
        default: 2000
      },
      dismissCallback: {
        type: Function,
        required: false
      }
    },
    watch: {
      show (val, oldVal) {
        if (this._timeout) clearTimeout(this._timeout);
        if (val && this.duration > 0) {
          this._timeout = setTimeout(function () {
            // 调用 dismiss callback
            this.dismissCallback();
          }.bind(this), this.duration);
        }
      }
    }
  };
</script>
