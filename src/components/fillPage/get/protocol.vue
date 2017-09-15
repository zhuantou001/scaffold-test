<template>
  <div class="pro_section">
    <p class="protocol agree" id="protocol">
      <el-checkbox v-model="checked" >
        我已阅读并同意
        <a href="javascript:;" :style="{color: protocolColor}" id="go-protocol">{{protocolFont}}</a>
      </el-checkbox>
    </p>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        checked: true
      };
    },
    props: ['index'],
    methods: {
    },
    mounted () {
      let checkboxInner = document.getElementsByClassName("el-checkbox__inner");
      checkboxInner[0].style.backgroundColor = this.protocolColor;
      checkboxInner[0].style.borderColor = this.protocolColor;
    },
    watch: {
      checked: function () {
        let checkboxInner = document.getElementsByClassName("el-checkbox__inner");
        if (this.checked) {
          checkboxInner[0].style.backgroundColor = this.protocolColor;
          checkboxInner[0].style.borderColor = this.protocolColor;
        }else {
          checkboxInner[0].style.backgroundColor = '#fff';
          checkboxInner[0].style.borderColor = '#bfcbd9';
        }
      },
      protocolColor: function(){
        let checkboxInner = document.getElementsByClassName("el-checkbox__inner");
        checkboxInner[0].style.backgroundColor = this.protocolColor;
        checkboxInner[0].style.borderColor = this.protocolColor;
      }
    },
    computed: {
      protocolFont () {
        return this.$store.state.fill.protocol[0].protocolFont;
      },
      protocolColor () {
        return this.$store.state.fill.protocol[0].protocolColor;
      }
    }
  };
</script>

<style lang="scss">
  .pro_section {
    padding: 15px 0;
    background:none;
  .protocol {
    position: relative;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #787878;
    padding-left: 26px;
    white-space: nowrap;
  a {
    display: inline-block;
    text-decoration: none;
  }
  .el-checkbox__inner{
    border-radius:50%;
  }
  }
  }

</style>
