<template>
  <span>
    <section v-show="showQRCodeBox" class="popup">
      <div class='content'>
        <div class="title"
             :style="{fontSize:QRCodeData.fontSize/16 + 'rem',color:QRCodeData.color}"
        >
          {{QRCodeData.title}}
        </div>
        <div class="codeImg"><img :src="imageDefault" /></div>
        <div class="save" @click="saveQR">保存下单码</div>
      </div>
    </section>
    <div class="mask" v-show="showQRCodeBox" @click="$emit('close')"></div>
  </span>
</template>

<script>
  import {Config, ROUTES} from '../../common/api';
  import DefImg from '../../../assets/defaultImg.png'; // 默认展示图片
  export default {
    data() {
      return {
        imageDefault: DefImg,
      };
    },
    props: ['showQRCodeBox','QRCodeData'],
    mounted () {
      this.initQRCode();
    },
    watch: {
    },
    methods: {
      initQRCode () {
      },
      saveQR () {
      }
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
    width: 85%;
    padding: 1rem;
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
    .title {
      margin:1.5rem auto;
    }
    .codeImg {
      width:75%;
      margin: 1rem auto;
      img{
        width:100%;
      }
    }
    .save {
      font-size: 0.8rem;
    }
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
