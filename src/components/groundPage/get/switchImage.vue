<template>
  <div class="switch-slide" :style="{marginTop: productPosition/16 + 'rem'}">
    <div class="charge-desc">
      <ul class="img-list">
        <li class="option" :class="{'checked':item.id === defSwitch}" v-for="(item, index) in imgItems" :key="item.id" :id="item.id" @click="tabChange(index)">
          <img :src="item.image" ref="img">
        </li>
      </ul>
      <ul class="img-dot">
        <li class="dot" :class="{'checked':item.id === defSwitch}" :style="{background: setDotColor}" v-for="(item, index) in imgItems" :key="item.id" :id="item.id" ></li>
      </ul>
    </div>
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
      imageUrl: DefImg
    };
  },
  directives: {},
  watch: {
    defSwitch () {
      const index = this.defSwitch - 1;
      this.resetStyle(index);
      this.setTab(index);
    },
    switchNum () {
      this.$nextTick(function(){
        const index = this.defSwitch - 1;
        this.resetStyle(index);
        this.setTab(index);
      });
    }
  },
  mounted() {
    const index = this.defSwitch - 1;
    this.setTab(index);

    // 取选项卡图片大小
    this.imageSize();
  },
  methods: {
    tabChange (index) {
      this.resetStyle(index);
      this.setTab(index);
      this.localStorageData(index);
    },
    setTab (index) {
      const dom = document.getElementsByClassName('option');
      for (var i = 0; i < dom.length; i++) {
        if (index === i) {
          // 默认选中之前的卡位置
          for (var j = i, n = 0; j >= 1; j--,n++) {
//            console.log('j:' + j);
            if (j > 0) {
              dom[j-1].style.transform = 'translateX('+ 120*(-n-1) +'%)';
              dom[j-1].style.webkitTransform = 'translateX('+ 120*(-n-1) +'%)';
            } else if (j === 0) {
              dom[this.switchNum-1].style.transform = 'translateX('+ 120*(-n-1) +'%)';
              dom[this.switchNum-1].style.webkitTransform = 'translateX('+ 120*(-n-1) +'%)';
            }
          }
          // 默认选中之后的卡位置
          for (let j = i, n = 0; j < this.switchNum; j++,n++) {
//            console.log('j:' + j);
            if (j < this.switchNum-1) {
              dom[j+1].style.transform = 'translateX('+ 120*(n+1) +'%)';
              dom[j+1].style.webkitTransform = 'translateX('+ 120*(n+1) +'%)';
            }
          }
        }
      }
      const domDot = document.getElementsByClassName('dot');
      for (var i = 0; i < domDot.length; i++) {
        domDot[i].classList.remove('checked');
        if (index === i) {
          domDot[i].classList.add('checked');
        }
      }
    },
    resetStyle (index) {
      // class和style都清空
      const dom = document.getElementsByClassName('option');
      for (var i = 0; i < dom.length; i++) {
        if (dom[i].className.indexOf('checked')){
          dom[i].classList.remove('checked');
        }
        if (dom[i].hasAttribute('style')) {
          dom[i].removeAttribute('style');
        }
      }
      dom[index].classList.add('checked');
    },
    styleBuild (n) {
      return 'transform: translateX('+ 120*n +'%);-webkit-transform: translateX('+ 120*n +'%);'
    },
    localStorageData (index) {
      const array = this.switchImage.switchImg;
      localStorage.setItem("product_id", array[index].productId);
      localStorage.setItem("product_name", array[index].productName);
      if (array[index].addParam) {
        localStorage.setItem("product_Add", JSON.stringify(array[index].addParam));
      } else {
        localStorage.setItem("product_Add", []);
      }
    },
    imageSize () {
      setTimeout(function () {
        if (document.getElementsByClassName('img-list')[0] && document.getElementsByClassName('img-list')[0].getElementsByClassName('checked')[0] && document.getElementsByClassName('img-list')[0].getElementsByClassName('checked')[0].children[0]) {
          const imgHeight = document.getElementsByClassName('img-list')[0].getElementsByClassName('checked')[0].children[0].height * 1.1;
          if (imgHeight) {
            document.getElementsByClassName('img-list')[0].style.height = imgHeight + 'px';
          }
        }
      }, 300);
    }
  },
  computed: {
    switchImage () {
      return this.$store.state.options.switchImage;
    },
    switchNum () {
      return this.$store.state.options.switchImage.switchNum;
    },
    defSwitch () {
      // 默认第几个选项卡
      this.localStorageData(this.$store.state.options.switchImage.defSwitch-1);
      return this.$store.state.options.switchImage.defSwitch;
    },
    setDotColor () {
      return this.$store.state.options.switchImage.setDotColor;
    },
    productPosition () {
      return this.$store.state.options.switchImage.productPosition;
    },
    imgItems () {
      let array = [];
      if (this.switchImage.switchImg) {
        for (let i = 0; i<this.switchNum; i++) {
          const obj = {};
          if (this.switchImage.switchImg[i]) {
            if (this.switchImage.switchImg[i].id) {
              obj.id = this.switchImage.switchImg[i].id;
            } else {
              obj.id = (i + 1);
            }
            if (this.switchImage.switchImg[i].image) {
              obj.image = Config.img_prev_url + this.switchImage.switchImg[i].image;
            } else {
              obj.image = DefImg;
            }
          } else {
            obj.id = (i + 1);
            obj.image = DefImg;
          }
          array.push(obj);
        }
//        console.log('getImg: ' + JSON.stringify(array));
        return array;
      }
    },
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
    }
  }
  ul{
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-start: 0;
  }
  .img-list {
    text-align:center;
    position:relative;
    margin-top:1.2rem;
    height: 5.2rem;
    li {
      width: 50%;
      position:absolute;
      top:0;
      left:50%;
      margin-left:-25%;
      opacity:0.5;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
      -webkit-transition: all .5s;
      transition: all .5s;
      &>img {
        width: 100%;
      }
    &.checked {
       opacity:1;
       -webkit-transform: scale(1.3) translateX(0);
       transform: scale(1.3) translateX(0);
     }
    }
  }
  .img-dot{
    &>li{
        display: inline-block;
        height:0.125rem;
        width:0.8rem;
        margin:0 0.16rem;
        background: #555;
        opacity:0.4;
      &.checked{
         opacity:1;
       }
    }
  }
</style>
