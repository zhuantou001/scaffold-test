<template>
  <div>
    <div id="myModal" class="modal">
      <div class="modal-content" :style="{width: width + 'px'}">
        <div class="modal-header">
          <span class="close" @click="$emit('closeModal')">×</span>
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    data () {
      return {
      };
    },
    props: ['showModal', 'width'],
    computed: {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content:center;
  }
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border-radius:6px;
    border: 1px solid #888;
    width: 400px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }

  /* 添加动画 */
  @-webkit-keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }

  @keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }

  /* 关闭按钮 */
  .close {
    color: #999;
    float: right;
    font-size: 28px;
  }

  .close:hover,
  .close:focus {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    padding: 2px 16px;
    height:50px;
    line-height: 50px;
    border-bottom:1px solid #ddd;
  }

  .modal-body {padding: 2px 16px;}

  .modal-footer {
    padding: 10px 16px;
    text-align: center;
  }

</style>
