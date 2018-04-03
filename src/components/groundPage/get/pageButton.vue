<template>
  <div class="buttonBox">
    <div v-show="buttonKinds === 0" class="btnBox" :style="{'margin-left': btnMarginLeft, 'margin-top': btnMarginTop, 'margin-bottom': btnMarginBottom}">
      <a v-show="clickButton === 0" @click="jumpPage" class="btn" target="_blank" :style="{'width': buttonWidth,background: buttonBg,backgroundSize: '100% 100%',color: buttonFrontColor,borderRadius: buttonRadius,'font-size': btnFontSize,'text-decoration': btnFontType}">{{buttonFont}}</a>
      <a v-show="clickButton === 1" @click="jumpPage" class="btn" target="_blank" style="background:#aaa;" :style="{'width': buttonWidth,color: buttonFrontColor,borderRadius: buttonRadius,'font-size': btnFontSize, 'text-decoration': btnFontType}">{{buttonFont}}</a>
      <a v-show="clickButton === 2" class="btn" :style="{'width': buttonWidth,color: buttonFrontColor,borderRadius: buttonRadius,'font-size': btnFontSize, 'text-decoration': btnFontType}" style="cursor:not-allowed;background:#aaa;">{{buttonFont}}</a>
    </div>
    <div v-show="buttonKinds === 1" class="noBlock">
      <a v-show="clickButton === 0" @click="jumpPage" class="btn" target="_blank" :style="{'width': buttonWidth,background: buttonBg,backgroundSize: '100% 100%',color: buttonFrontColor,borderRadius: buttonRadius,'font-size': btnFontSize,'text-decoration': btnFontType,'margin-left': btnMarginLeft, 'margin-top': btnMarginTop, 'margin-bottom': btnMarginBottom}">{{buttonFont}}</a>
      <a v-show="clickButton === 1" @click="jumpPage" class="btn" target="_blank" style="background:#aaa;" :style="{'width': buttonWidth,color: buttonFrontColor,borderRadius: buttonRadius,'font-size': btnFontSize, 'text-decoration': btnFontType, 'margin-left': btnMarginLeft, 'margin-top': btnMarginTop, 'margin-bottom': btnMarginBottom}">{{buttonFont}}</a>
      <a v-show="clickButton === 2" class="btn" :style="{'width': buttonWidth,color: buttonFrontColor,borderRadius: buttonRadius,'font-size': btnFontSize, 'text-decoration': btnFontType, 'margin-left': btnMarginLeft, 'margin-top': btnMarginTop, 'margin-bottom': btnMarginBottom}" style="cursor:not-allowed;background:#aaa;">{{buttonFont}}</a>
      <a class="check" :href="linkAlias" :style="{color: linkColor}">{{linkFont}}</a>
    </div>
  </div>
</template>


<script>
import {Config} from '../../common/api';
  export default {
    data () {
      return {
      };
    },
    props: ['index'],
    methods: {
      jumpPage () {
        this.failMsg('请先导出页面再尝试点击按钮');
//        if (this.buttonFillAlias) {
//          if (this.buttonLinkWay == 0 ) { // 相对路径
//            if (this.urlParam) {
//              if (this.buttonFillAlias.indexOf('?') > -1) {
//                this.$router.push('/fill/' + this.buttonFillAlias + '&' + this.productKey+ '=' + this.product_id + '&' +this.urlParam);
//              } else if (this.buttonFillAlias.indexOf('?') === -1) {
//                this.$router.push('/fill/' + this.buttonFillAlias + '?' + this.productKey+ '=' + this.product_id + '&' +this.urlParam);
//              }
//            } else {
//              if (this.buttonFillAlias.indexOf('?') > -1) {
//                this.$router.push('/fill/' + this.buttonFillAlias + '&' + this.productKey+ '=' + this.product_id);
//              } else if (this.buttonFillAlias.indexOf('?') === -1) {
//                this.$router.push('/fill/' + this.buttonFillAlias + '?' + this.productKey+ '=' + this.product_id);
//              }
//            }
//            localStorage.setItem("product_name", this.product_name);
//          } else { // 绝对路径
//            if (this.urlParam) {
//              if (this.buttonFillAlias.indexOf('?') > -1) {
//                location.href = this.buttonFillAlias + '&' + this.productKey+ '=' + this.product_id + '&' +this.urlParam;
//              } else if (this.buttonFillAlias.indexOf('?') === -1) {
//                location.href = this.buttonFillAlias + '?' + this.productKey+ '=' + this.product_id + '&' +this.urlParam;
//              }
//            } else {
//              if (this.buttonFillAlias.indexOf('?') > -1) {
//                location.href = this.buttonFillAlias + '&' + this.productKey+ '=' + this.product_id;
//              } else if (this.buttonFillAlias.indexOf('?') === -1) {
//                location.href = this.buttonFillAlias + '?' + this.productKey+ '=' + this.product_id;
//              }
//            }
//          }
//        } else {
//          this.failMsg('请先设置需要跳转的填写页链接');
//        }
      },
      commonGet(key, value) {
        // alert(value);
       // console.log(this.index)
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
              // console.log(arr[i])
            if (arr[i][key] !== undefined) {
              return arr[i][key];
            } else {
             //   console.log(value)
              return value;
            }
          }
        }
      }
    },
    watch: {

    },
    computed: {
      productKey () {
//        alert('productKey: ' + this.$store.state.options.productKey);
        return this.$store.state.options.productKey;
      },
      // 按钮样式
      buttonFont () {
        return this.commonGet('button_name', '请输入按钮文字');
      },
      buttonFrontColor () {
        return this.commonGet('button_front_color', '#ffffff');
      },
      btnFontSize () {
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
            if (arr[i].button_font_size !== undefined) {
              return arr[i].button_font_size / 16 + 'rem';
            } else {
              return '1rem';
            }
          }
        }
      },
      buttonRadius () {
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
            if (arr[i].button_radius !== undefined) {
              return arr[i].button_radius / 16 + 'rem';
            } else {
              return '0rem';
            }
          }
        }
      },
      buttonBgType () {
        return this.commonGet('button_bg_type', 0);
      },
      buttonBg () {
        if (this.buttonBgType === 0) {
          return this.buttonColor;
        } else {
          if (this.buttonBgUrl) {
            if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
              return 'url(' + Config.image_url + this.buttonBgUrl + ')';
            } else {
              return 'url(' + Config.img_prev_url + this.buttonBgUrl + ')';
            }
          }
        }
      },
      btnFontType () {
        if (this.commonGet('btn_font_type', 0) === 0) {
          return 'none';
        } else {
          return 'underline';
        }
      },
      buttonColor () {
        return this.commonGet('button_color', '#20a0ff');
        // return this.$store.state.button.buttonObject.button_color;
      },
      buttonBgUrl () {
        return this.commonGet('button_bg_url', '');
      },
      buttonLinkWay () {
        return this.commonGet('button_link_way', 0);
        // return this.$store.state.button.buttonObject.button_link_way;
      },
      buttonFillAlias () {
        return this.commonGet('button_fill_alias', '');
        // return this.$store.state.button.buttonObject.button_fill_alias;
      },
      clickButton () {
        return this.commonGet('clickButton', 0);
        // return this.$store.state.button.buttonObject.clickButton;
      },
      // 带有文字链按钮样式
      linkFont () {
        return this.commonGet('link_name', '查询订单');
        // return this.$store.state.button.linkObject.link_name;
      },
      linkColor () {
        return this.commonGet('link_color', '#000000');
        // return this.$store.state.button.linkObject.link_color;
      },
      linkAlias () {
        return this.commonGet('link_alias', '');
        // return this.$store.state.button.linkObject.link_alias;
      },
      // 按钮种类
      buttonKinds () {
        return this.commonGet('button_Kinds', 0);
        // return this.$store.state.button.button_Kinds;
      },
      // 按钮和左面区域的距离
      btnMarginLeft () {
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
            if (arr[i].btn_margin_left !== undefined) {
              return arr[i].btn_margin_left / 16 + 'rem';
            } else {
              return 0;
            }
          }
        }
      },
      // 按钮和上面区域的距离
      btnMarginTop () {
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
            if (arr[i].btn_margin_top !== undefined) {
              return arr[i].btn_margin_top / 16 + 'rem';
            } else {
              return 0;
            }
          }
        }
      },
      // 按钮和下面区域的距离
      btnMarginBottom () {
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
            if (arr[i].btn_margin_bottom !== undefined) {
              return arr[i].btn_margin_bottom / 16 + 'rem';
            } else {
              return 0;
            }
          }
        }
      },
      // 按钮宽度
      buttonWidth () {
        let arr = this.$store.state.button.buttons;
        for (let i in arr) {
          if (arr[i].component_id === this.index) {
            if (arr[i].button_width !== undefined) {
              return arr[i].button_width / 16 + 'rem';
            } else {
              if (this.commonGet('button_Kinds', 0) === 0) {
                return '17.5rem';
              } else {
                return '11.875rem';
              }
            }
          }
        }
      },
      product_id () {
        return localStorage.getItem("product_id");
      },
      product_name () {
        return localStorage.getItem("product_name");
      },
      urlParam () {
        return this.$store.state.options.urlParam;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .buttonBox {
    display: inline-block;
    .btnBox {
      display: inline-block;
      padding: 10px 0;
     // overflow: hidden;
      .btn {
        display: inline-block;
        width: 17.5rem;
        overflow: hidden;
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        color: #fff;
        text-align: center;
        text-decoration: none;
        -webkit-border-radius: .1875rem;
        -moz-border-radius: .1875rem;
        border-radius: .1875rem;
        background-size: 100% 100% !important;
        // &:link{
        //    color: #FFF!important;
        //  }
        // &:visited{
        //    color: #FFF!important;
        //  }
        // &:hover{
        //    color: #FFF!important;
        //  }
        // &:active {
        //    color: #FFF!important;
        //  }
      }
      .disable{
        background-color: #c6c6c6;
        color: #c6c6c6;
        // &:link{
        //    color: #fff!important;
        //  }
        // &:visited{
        //    color: #fff!important;
        //  }
        // &:hover{
        //    color: #fff!important;
        //  }
        // &:active {
        //    color: #fff!important;
        //    background-color: #c6c6c6!important;
        //  }
      }
    }
    .noBlock{
      overflow: hidden;
      padding: 10px 0;
      display: inline-block;
      .btn{
        display: inline-block;
        margin-top: .625rem;
        text-align: center;
        vertical-align: bottom;
        width: 11.875rem;
        height: 3.125rem;
        background: #fffa74;
        color: #21a47b;
        // font-size: 1.75rem;
        font-size: 1.4rem;
        -webkit-border-radius: 3.125rem;
        -moz-border-radius: 3.125rem;
        border-radius: 3.125rem;
        line-height: 3.125rem;
        text-decoration: none;
      }
      .check{
        font-size: .9375rem;
        color: #fff;
        margin-left: .625rem;
        // position: relative;
        // top: .5rem;
        text-decoration: underline;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }
</style>
