<template>
  <div>
    <div class="fixedBox" v-show="showFixedBox">
      <span
        class="menu"
        :style="{color:item.menuFontColor,background:item.menuColor,fontSize:item.menuFontSize/16 + 'rem'}"
        v-for="item in renderMenuItems"
        @click="openSubMenuUl(item.key)"
      >
        <img :src="item.absoluteImgUrl" />
        {{item.menuFont}}
        <ul v-show="item.subMenuNum != 0" class="subMenuUl" style="display: none;">
          <li
            v-for="subItem in item.subMenu"
            :style="{color:subItem.subMenuFontColor,fontSize:subItem.subMenuFontSize/16 + 'rem'}"
            @click.stop="openSubMenuLi(item.key, subItem.subkey, subItem.clickEffect)"
          >
            {{subItem.subMenuFont}}
          </li>
        </ul>
      </span>
      <span
        class="button"
        :style="{color:item.buttonFontColor,background:item.buttonColor,fontSize:item.buttonFontSize/16 + 'rem'}"
        v-for="item in renderButtonItems"
      >
        {{item.buttonFont}}
      </span>
    </div>
    <!--{{fixedButton}}-->
    <bottomBox :showBottomBox="showBottomBox" @close="closeBox('showBottomBox')"></bottomBox>
    <QRCodeBox :showQRCodeBox="showQRCodeBox" :QRCodeData="QRCodeData" @close="closeBox('showQRCodeBox')"></QRCodeBox>
  </div>
</template>


<script>
  import {Config, ROUTES} from '../../common/api';
  import DefImg from '../../../assets/defaultImg.png'; // 默认展示图片
  import QRCodeBox from "../common/QRCodeBox";
  import bottomBox from "../common/bottomBox";
  export default {
    data () {
      return {
        imageDefault: DefImg,
        showBottomBox: false,
        showQRCodeBox: false,
        showFixedBox: true,
        QRCodeData: {},
        shareData: {}
      };
    },
    mounted () {
//      console.log('获取数据: ' + JSON.stringify(this.fixedButton));
      this.initButton();
    },
    watch: {
      application () {
        this.initButton();
      }
    },
    methods: {
      initButton () {
        // 指定某终端专用时, 终端下fixedButton 显示,buttonBox 隐藏, 其他页面fixedButton 隐藏,buttonBox 显示
        const buttonDom = document.getElementsByClassName('buttonBox');
        const domApply = document.getElementsByClassName('apply')[0];
        this.showFixedBox = true;
        // 给底部空间,防止被浮动按钮遮挡
        domApply.style.paddingBottom = 3.2 + 'rem';
        if (buttonDom) {
          for (let i=0; i<buttonDom.length; i++) {
            buttonDom[i].style.display = 'block';
          }
        }
      },
      openSubMenuUl (key) {
        const dom = document.getElementsByClassName('subMenuUl');
        const domApply = document.getElementsByClassName('apply')[0];
        // 点击其他区域关闭子菜单
        domApply.addEventListener('touchstart', function(){
          for (let i = 0; i<dom.length; i++) {
            dom[i].style.display = 'none';
          }
        }, true);
        for (let i = 0; i<dom.length; i++) {
          if (dom[i].style.display === 'block') {
            if (i === key - 1) {
              dom[key - 1].style.display = 'none';
              return false;
            }
            dom[i].style.display = 'none';
          }
        }
        dom[key-1].style.display = 'block';
      },
      openSubMenuLi (key, subkey, clickEffect) {
//        console.log('点击第' + key + '个菜单, 第' + subkey + '个子菜单');
        if (clickEffect === 0) {
          // 居中弹框
          this.showQRCodeBox = true;
          // 禁止页面滚动
          this.$store.commit('newIsScroll', true);
          let QRCode = this.fixedButton.menu[key-1].subMenu[subkey-1].QRCode;
          let QRUrl = window.location.href;
          if (QRUrl.indexOf('?') > -1) {
            QRUrl = QRUrl + '&' + QRCode.paramKey + '=' + QRCode.paramValue;
          } else {
            QRUrl = QRUrl + '?' + QRCode.paramKey + '=' + QRCode.paramValue;
          }
          QRCode.text = QRUrl;
          this.QRCodeData = QRCode;
//          console.log('向二维码弹框发送的数据: ' + JSON.stringify(this.QRCodeData));
        } else if (clickEffect === 1) {
          // 底部弹框
          this.shareData = this.fixedButton.menu[key-1].subMenu[subkey-1].share;
          let shareUrl = window.location.href;
          if (shareUrl.indexOf('?') > -1) {
            shareUrl = shareUrl + '&' + this.shareData.paramKey + '=' + this.shareData.paramValue;
          } else {
            shareUrl = shareUrl + '?' + this.shareData.paramKey + '=' + this.shareData.paramValue;
          }
          console.log('分享参数数据: ' + JSON.stringify(this.shareData));
          console.log('分享链接: ' + shareUrl);
//          void AGXB.share({
//            "content":this.shareData.content,
//            "image":this.shareData.absoluteImgUrl,
//            "url":shareUrl,
//            "title":this.shareData.title
//          });
        }
      },
      closeBox (name) {
        this[name] = false;
        // 解除禁止页面滚动
        this.$store.commit('newIsScroll', false);
      },
    },
    computed: {
      getComponentsItems () {
        return this.$store.state.app.getComponentsItems;
      },
      fixedButton () {
        return this.$store.state.button.fixedButton;
      },
      application () {
        return this.$store.state.button.fixedButton.application;
      },
      renderButtonItems () {
        const array = this.fixedButton.button;
        return array;
      },
      renderMenuItems () {
        const array = this.fixedButton.menu;
        if (array.length > 0) {
          for (let i = 0; i<array.length; i++) {
            array[i].key = i + 1;
            if (array[i].image) {
              array[i].absoluteImgUrl = Config.img_prev_url + array[i].image;
            } else {
              array[i].absoluteImgUrl = DefImg;
            }
          }
        }
        return array;
      },
      productKey () {
        return this.$store.state.options.productKey;
      },
    },
    components: {
      DefImg,
      Config,
      bottomBox,
      QRCodeBox
    }
  };
</script>

<style lang="scss" scoped>
  .fixedBox{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    height:2.8rem;
    background: #fdd5ff;
    /*border-top:1px solid #eef1f6;*/
    /*border-bottom:1px solid #eef1f6;*/
    text-align: center;
    display: flex;
    z-index:10;
    &>span{
      display: inline-block;
      cursor:pointer;
      }
    &>span.menu{
      position: relative;
      border-left:1px solid #eef1f6;
      width:3.2rem;
      &>img {
          width:1.1rem;
          height:1.1rem;
          margin:0.5rem auto 0.2rem auto;
          display: block;
        }
        &>ul {
            display: none;
            position: absolute;
            bottom:3.2rem;
            left:0.5rem;
            background: #fff;
            border-radius:0.2rem;
            box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.3);
            z-index:11;
            &::after {
               content: "";
               width: 0;
               height: 0;
               border-top: 0.4rem solid;
               border-color: #fff;
               border-left: 0.34rem solid transparent;
               border-right: 0.34rem solid transparent;
               border-bottom: 0;
               position: absolute;
               left:0.8rem;
               bottom: -0.34rem;
             }
             &>li{
                 min-width:5rem;
                 max-width:10rem;
                line-height: 2.5rem;
                border-top:1px solid #ccc;
                 text-align: center;
                 white-space:nowrap;
                  padding:0 0.5rem;
               }
              &>li:first-child{
                  border-top:none;
                }
          }
    }
    &>span.button{
      flex:1;
      line-height: 2.8rem;
    }
    &>span.menu:first-child{
      border:none;
    }
  }

</style>
