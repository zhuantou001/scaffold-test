<template>
  <div class="switch-slide" :style="{background: backgroundShow, marginTop: switchSlide.productPosition/16 + 'rem'}">
    <div
      class="charge-desc"
      :class="{
      one: radioSwitch === 1,
      twoFirst:radioSwitch === 2 && switchShowStyleTwo === 1,
      twoSecond:radioSwitch === 2 && (switchShowStyleTwo === 2 || switchShowStyleTwo === 3),
      threeFirst: radioSwitch === 3 && switchShowStyle === 1,
      threeSecond: radioSwitch === 3 && switchShowStyle === 2,
      threeThird: radioSwitch === 3 && (switchShowStyle === 3 || switchShowStyle === 4)}"
      v-touchLeft="imageSlideLeft"
      v-touchRight="imageSlideRight"
    >
        <li class="option" :class="{'change':item.id === defSwitch}" v-for="(item, index) in imgItems" :key="item.id" :id="item.id" @click="switchTab(index)">
        <!--<img :src="item.image" ref="img"><span v-show="checkedFontShow" class="checkedTip" :class="{'show':item.id === defSwitch}" :style="{color:switchSlide.checkedFontColor, backgroundColor:switchSlide.checkedBackgroundColor}">{{switchSlide.checkedFont}}</span>-->
        <img :src="item.image" ref="img">
        <span class="checkedTipCanvas" :class="{'show':item.id === defSwitch}" v-show="checkedFontShow">
        <checkedIcon :v_id="item.canvasId" :v_color="item.canvasColor"></checkedIcon>
          <i :style="{color:switchSlide.checkedFontColor}">{{switchSlide.checkedFont}}</i>
        </span>
      </li>
    </div>
    <div class="slide-content"

       :class="{'show':(radioSwitch === 3 && switchShowStyle === 4 && item.id === defSwitch) || (radioSwitch === 2 && switchShowStyleTwo === 3 && item.id === defSwitch)}"
       v-for="(item, index) in imgItems" :key="item.id"
       v-html="item.productContent"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {Config, ROUTES} from '../../common/api';
import DefImg from '../../../assets/defaultImg.png'; // 默认展示图片
import checkedIcon from "../../tabImg/checkedIcon";
import '../../common/extendedEvent';
export default {
  data() {
    return {
    };
  },
  directives: {},
  watch: {
    radioSwitch () {
//      this.resetClass();
      this.setSwitchThree(this.defSwitch);
      document.getElementById(this.defSwitch).classList.add('change');
      document.getElementById(this.defSwitch).getElementsByTagName('span')[0].classList.add('show');
    },
    defSwitch () {
      this.resetClass();
      this.setSwitchThree(this.defSwitch);
    },
    switchShowStyleTwo () {
    },
    switchShowStyle () {
      this.resetClass();
      this.setSwitchThree(this.defSwitch);
      document.getElementById(this.defSwitch).classList.add('change');
      document.getElementById(this.defSwitch).getElementsByTagName('span')[0].classList.add('show');
    },
    radioBackground () {
      if (this.radioBackground === 1) {
        this.backgroundShow = 'none';
      } else if (this.radioBackground === 2) {
        this.backgroundShow = (this.switchSlide.tabBackgroundColor);
      }
    }
  },
  mounted() {
    this.setSwitchThree(this.defSwitch);
  },
  methods: {
    switchTab (index) {
      const dom = document.getElementsByClassName('option');
      if (this.radioSwitch === 2) {
        for (var i = 0; i < dom.length; i++) {
          if(dom[i].className.indexOf('change')){
            dom[i].getElementsByTagName('span')[0].classList.remove('show');
            dom[i].classList.remove('change');
          }
        }
      } else if (this.radioSwitch === 3) {
        this.resetClass();
        this.setSwitchThree(index + 1);
      }

      dom[index].classList.add('change');
      dom[index].getElementsByTagName('span')[0].classList.add('show');
      this.localStorageData(index);
      this.indexC = index + 1;
      // 详情文字显示
      if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
        const domContent = document.getElementsByClassName('slide-content');
        for (var i = 0; i < domContent.length; i++) {
          if(domContent[i].className.indexOf('show')){
            domContent[i].classList.remove('show');
          }
        }
        domContent[index].classList.add('show');
      }
    },
    imageSlideLeft () {
//      console.log('左滑');
      if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
//        console.log('不执行');
        return false;
      }
      if (this.indexC === 3){
        if (this.radioSwitch === 3 && this.switchShowStyle === 2) {
          this.indexC = 0;
        }
      }
      if (this.indexC < this.radioSwitch) {
        const array = this.imgItems;
        const productId = array[this.indexC].productId;
        const productName = array[this.indexC].productName;
//        console.log(productId + '/' + productName + '/' + this.indexC + '/' + array.length);
        this.switchTab(this.indexC);
      }
    },
    imageSlideRight () {
//      console.log('右滑');
      if ((this.radioSwitch === 2 && this.switchShowStyleTwo === 3) || (this.radioSwitch === 3 && this.switchShowStyle === 4)) {
//        console.log('不执行');
        return false;
      }
      if (this.indexC === 1){
        if (this.radioSwitch === 3 && this.switchShowStyle === 2) {
          this.indexC = 4;
        }
      }
      if (this.indexC > 1) {
        const array = this.imgItems;
        const productId = array[(this.indexC - 2)].productId;
        const productName = array[(this.indexC - 2)].productName;
//        console.log(productId + '/' + productName + '/' + this.indexC + '/' + array.length);
        this.switchTab(this.indexC - 2);
      }
    },
    resetClass () {
      const dom = document.getElementsByClassName('option');
      for (var i = 0; i < dom.length; i++) {
        if(dom[i].className.indexOf('change')){
          dom[i].getElementsByTagName('span')[0].classList.remove('show');
          dom[i].classList.remove('change');
        }
        if(dom[i].className.indexOf('small')){
          dom[i].classList.remove('small');
        }
        if(dom[i].className.indexOf('mid1')){
          dom[i].classList.remove('mid1');
        }
        if(dom[i].className.indexOf('mid2')){
          dom[i].classList.remove('mid2');
        }
        if(dom[i].className.indexOf('left')){
          dom[i].classList.remove('left');
        }
        if(dom[i].className.indexOf('right')){
          dom[i].classList.remove('right');
        }
        if(dom[i].className.indexOf('down')){
          dom[i].classList.remove('down');
        }
      }
      const domContent = document.getElementsByClassName('slide-content');
      for (var i = 0; i < domContent.length; i++) {
        if(domContent[i].className.indexOf('show')){
          domContent[i].classList.remove('show');
        }
      }
    },
    setSwitchThree (index) {
      const dom = document.getElementsByClassName('option');
      if (this.radioSwitch === 3 && this.switchShowStyle === 2) {
        this.$nextTick(function(){
          if (index === 1) {
            dom[1].classList.add('right');
            dom[2].classList.add('left');
            dom[2].classList.add('down');
          } else if (index === 2) {
            dom[0].classList.add('down');
            dom[0].classList.add('left');
            dom[2].classList.add('right');
          } else if (index === 3) {
            dom[0].classList.add('down');
            dom[0].classList.add('right');
            dom[1].classList.add('left');
          }
        });
      } else if (this.radioSwitch === 3 && this.switchShowStyle === 1) {
        this.$nextTick(function(){
          if (index === 1) {
            dom[1].classList.add('mid1');
            dom[2].classList.add('small');
          } else if (index === 3) {
            dom[1].classList.add('mid2');
            dom[0].classList.add('small');
          }
        });
      }
    },
    localStorageData (index) {
      const array = this.switchSlide.switchImg;
      localStorage.setItem("product_id", array[index].productId);
      localStorage.setItem("product_name", array[index].productName);
      if (array[index].addParam) {
        localStorage.setItem("product_Add", JSON.stringify(array[index].addParam));
      } else {
        localStorage.setItem("product_Add", []);
      }
    },
  },
  computed: {
    switchSlide () {
      return this.$store.state.options.switchSlide;
    },
    checkedBackgroundColor () {
      return this.$store.state.options.switchSlide.checkedBackgroundColor;
    },
    switchShowStyleTwo () {
      return this.$store.state.options.switchSlide.switchShowStyleTwo;
    },
    switchShowStyle () {
      return this.$store.state.options.switchSlide.switchShowStyle;
    },
    defSwitch () {
      // 默认第几个选项卡
      const n = this.$store.state.options.switchSlide.defSwitch;
      const imgArray = this.$store.state.options.switchSlide.switchImg;
      this.localStorageData(n-1);
      this.indexC = n;
      // 取图片大小
      this.$nextTick(function(){
        setTimeout(function () {
          if(document.getElementsByClassName('charge-desc')[0]) {
            if (document.getElementsByClassName('charge-desc')[0].childNodes[(n-1)]) {
              if (document.getElementsByClassName('charge-desc')[0].childNodes[(n-1)].children[0]) {
                const image = document.getElementsByClassName('charge-desc')[0].childNodes[(n-1)].children[0];
                const imgHeight = image.height * 1.34629;
                if (imgHeight) {
                  document.getElementsByClassName('charge-desc')[0].style.height = imgHeight + 'px';
                }
              }
            }
          }
        }, 500);
      });

      return this.$store.state.options.switchSlide.defSwitch;
    },
    radioSwitch () {
      return this.$store.state.options.switchSlide.radioSwitch;
    },
    radioBackground () {
      return this.$store.state.options.switchSlide.radioBackground;
    },
    imgItems () {
      let array = [];
      if (this.switchSlide.switchImg) {
        for (let i = 0; i<this.radioSwitch; i++) {
            const obj = {};
            if (this.switchSlide.switchImg[i]) {
              if (this.switchSlide.switchImg[i].id) {
                obj.id = this.switchSlide.switchImg[i].id;
              } else {
                obj.id = (i + 1);
              }
              if (this.switchSlide.switchImg[i].productId) {
                obj.productId = this.switchSlide.switchImg[i].productId;
              } else {
                obj.productId = (i + 1);
              }
              if (this.switchSlide.switchImg[i].productName) {
                obj.productName = this.switchSlide.switchImg[i].productName;
              } else {
                obj.productName = (i + 1);
              }
              if (this.switchSlide.switchImg[i].productContent) {
                obj.productContent = this.switchSlide.switchImg[i].productContent;
              } else {
                obj.productContent = '请输入内容';
              }
              if (this.switchSlide.switchImg[i].image) {
                obj.image = Config.img_prev_url + this.switchSlide.switchImg[i].image;
              } else {
                obj.image = DefImg;
              }
            } else {
              obj.id = (i + 1);
              obj.productId = (i + 1);
              obj.productName = (i + 1);
              obj.productContent = '请输入内容';
              obj.image = DefImg;
            }
            // canvas 配置
            obj.canvasId = 'canvasId' + (i + 1);
            let objColor = {};
            objColor.colorA = this.switchSlide.checkedBackgroundColor;
            objColor.fontA = this.switchSlide.checkedFont;
            objColor.fontColorA = this.switchSlide.checkedFontColor;
            obj.canvasColor = objColor;
            array.push(obj);
        }
//        console.log('getImg: ' + JSON.stringify(array));
        return array;
      }
    },
    checkedFontShow () {
      if (this.switchSlide.isCheckedFont === 2) {
        return false;
      } else {
        return true;
      }
    },
    backgroundShow () {
      if (this.radioBackground === 1) {
        return 'none';
      } else if (this.radioBackground === 2) {
        return this.switchSlide.tabBackgroundColor;
      }
    }
  },
  components: {
    DefImg,
    checkedIcon
  }
};
</script>


<style lang="scss" scoped>
  .switch-slide {
    padding: 0.3rem 1.2rem 0.3rem 1.2rem;
    position: relative;
  .charge-desc {
    width: 100%;
    position: relative;
    height:7rem;
    top:1rem;
  }
  }
  .charge-desc.one>li{
    margin: 0 auto;
    width: 55%;
    box-sizing: border-box;
    transform-origin: center;
    -webkit-transform-origin: center;
    transform: scale(1.34629);
    -webkit-transform: scale(1.34629);
  }
  .charge-desc.twoFirst>li{
    position: absolute;
    width: 45%;
    box-sizing: border-box;
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
    transition:all 0.3s;
    -webkit-transition:all 0.3s;
  }
  .charge-desc.twoFirst>li:first-child{
    top:0;
    left:0;
    z-index: 4;
  }
  .charge-desc.twoFirst>li:first-child.change {
    top:0;
    left:0;
    z-index: 5;
    -webkit-transform-origin: left;
    -moz-transform-origin: left;
    -ms-transform-origin: left;
    -o-transform-origin: left;
    transform-origin: left;
    -webkit-transform: scale(1.34629);
    -moz-transform: scale(1.34629);
    -ms-transform: scale(1.34629);
    -o-transform: scale(1.34629);
    transform: scale(1.34629);
  }
  .charge-desc.twoFirst>li:last-child{
    top:0;
    right:0;
  }
  .charge-desc.twoFirst>li:last-child.change {
    top:0;
    right: 0;
    z-index: 5;
    -webkit-transform-origin: right;
    -moz-transform-origin: right;
    -ms-transform-origin: right;
    -o-transform-origin: right;
    transform-origin: right;
    -webkit-transform: scale(1.34629);
    -moz-transform: scale(1.34629);
    -ms-transform: scale(1.34629);
    -o-transform: scale(1.34629);
    transform: scale(1.34629);
  }
  /**
 twoSecond start
 **/
  .charge-desc.twoSecond>li{
    position: absolute;
    width: 47%;
    -webkit-filter: grayscale(100%) brightness(120%);
    filter: grayscale(100%) brightness(120%);
  }
  .charge-desc.twoSecond>li:first-child{
    top:0;
    left:0;
  }
  .charge-desc.twoSecond>li:last-child{
    top:0;
    right:0;
  }
  .charge-desc.twoSecond>li.change {
    -webkit-filter: none;
    filter: none;
  }
  /**
 twoSecond end
 **/

  .charge-desc.threeFirst>li{
    position: absolute;
    width: 45%;
    box-sizing: border-box;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
  }
  .charge-desc.threeFirst>li:nth-child(1){
    top:0;
    left:0;
    z-index: 3;
  }
  .charge-desc.threeFirst>li:nth-child(2){
    top:0;
    left:50%;
    margin-left:-22.5%;
    z-index: 3;
  }
  .charge-desc.threeFirst>li:nth-child(2).mid1{
    margin-left:-15%;
    z-index: 4;
  }
  .charge-desc.threeFirst>li:nth-child(2).mid2{
    margin-left:-30%;
    z-index: 4;
  }
  .charge-desc.threeFirst>li:nth-child(3){
    top:0;
    right:0;
    z-index: 3;
  }
  .charge-desc.threeFirst>li.small{
    width: 35%;
    top:10px;
    z-index: 2;
  }
  .charge-desc.threeFirst>li:nth-child(1).change {
    top:0;
    left:0;
    z-index: 5;
    -webkit-transform-origin: left;
    transform-origin: left;
    -webkit-transform: scale(1.34629);
    transform: scale(1.34629);
  }
  .charge-desc.threeFirst>li:nth-child(2).change {
    top:0;
    left:50%;
    margin-left:-22.5%;
    z-index: 5;
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: scale(1.34629);
    transform: scale(1.34629);
  }
  .charge-desc.threeFirst>li:nth-child(3).change {
    top:0;
    right:0;
    z-index: 5;
    -webkit-transform-origin: right;
    transform-origin: right;
    -webkit-transform: scale(1.34629);
    transform: scale(1.34629);
  }
  /**
  threeSecond start
  **/
  .charge-desc.threeSecond>li{
    position: absolute;
    width: 45%;
    box-sizing: border-box;
    left:50%;
    margin-left:-22.5%;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    -webkit-transition: all .5s;
    transition: all .5s;
  }
  .charge-desc.threeSecond>li.left{
    top:0;
    z-index: 4;
    opacity:0.6;
    -webkit-transform:translateX(-60%);
    transform:translateX(-60%);
  }
  .charge-desc.threeSecond>li.change {
    top:0;
    z-index: 5;
    -webkit-transform: scale(1.34629) translateX(0);
    transform: scale(1.34629) translateX(0);
    opacity:1;
  }
  .charge-desc.threeSecond>li.right{
    top:0;
    -webkit-transform:translateX(60%);
    transform:translateX(60%);
    z-index: 4;
    opacity:0.6;
  }
  .charge-desc.threeSecond>li.down{
    z-index: 3;
  }
  /**
  threeSecond end
  **/
  .charge-desc.threeThird>li{
    position: absolute;
    width: 31%;
    -webkit-filter: grayscale(100%) brightness(120%);
    filter: grayscale(100%) brightness(120%);
  }
  .charge-desc.threeThird>li:nth-child(1){
    left:0;
  }
  .charge-desc.threeThird>li:nth-child(2){
    left:50%;
    margin-left:-15.5%;
  }
  .charge-desc.threeThird>li:nth-child(3){
    right:0;
  }
  .charge-desc.threeThird>li.change{
    -webkit-filter: none;
    filter: none;
  }
  /**
  threeThird end
  **/
  .charge-desc>li>img{
    width:100%;
  }
  .switch-slide .charge-desc li .checkedTip {
    display: none;
    position: absolute;
    top:4px;
    left:-1.5px;
    width:30px;
    color:#fff;
    font-size: 10px;
    text-align: center;
    line-height: 20px;
    background: #00f;
    transform: rotate(315deg) scale(0.8);
    -webkit-transform: rotate(315deg) scale(0.8);
    /*transform: rotate(315deg);*/
    /*-webkit-transform: rotate(315deg);*/

  }
  .switch-slide .charge-desc li .checkedTip.show {
    display: inline-block;
  }
  .switch-slide .charge-desc li .checkedTipCanvas {
    display: none;
    position: absolute;
    z-index: 6;
    width:0;
    height:0;
    top:38px;
    left:-33px;
    color:#fff;
    text-align: center;
    transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
    /*transform: rotate(315deg) scale(0.5);*/
    /*-webkit-transform: rotate(315deg) scale(0.5);*/
  }
  .switch-slide .charge-desc li .checkedTipCanvas>i{
    font-style: normal;
    position: absolute;
    z-index: 7;
    width:60px;
    top: 5px;
    left:20px;
    font-size: 10px;
    font-weight: bold;
    overflow: hidden;
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
  }
  .switch-slide .charge-desc li .checkedTipCanvas.show {
    display: inline-block;
  }
  .switch-slide .charge-desc li .checkedTipCanvas canvas {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
  }
  .slide-content{
    display: none;
    font-size:0.8rem;
    text-align:left;
    padding-top:10px;
    &.show{
      display: block;
    }
  }

</style>
