<template>
  <div class="switch-box" :style="{marginTop: setPosition/16 + 'rem'}">
    <div class="switch-area" :style="{background: setBackgroundColor, borderColor: setBorderColor}">
      <ul class="switch" :style="{borderColor: setBorderColor}">
        <li class="switch-tab" v-for="item in tabTitleItems" :class="{'checked':item.tab_checked}" :style="{borderColor: setBorderColor}" @click="switchTab(item.key, $event)" :product_id="item.product_id">
          <a href="javascript:;">
            <tabsL :v_id="item.tabSim_id" :v_color="item.tabSim_color"></tabsL>
            <span :style="item.font_style">{{item.font_content}}<span style="color:#f00; display:none;">{{item.product_id}}</span></span></a>
        </li>
      </ul>
      <div class="charge-desc">
        <p v-for="item in tabDescItems" :style="item.scale_style" :class="{'show':item.tab_show, 'hide':!item.tab_show}" class="fee" v-html="item.desc_content"></p>
        </div>
    </div>
  </div>
</template>

<script>
import tabsL from "../../tabImg/tabsL.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow1: true,
      isShow2: false,
      isShow3: false
    };
  },
  directives: {},
  watch: {
    // 设置选中小三角的边框样式,伪类暂时只能重写
    setBorderColor() {
      this.reTirBorder();
    },
    // 设置选中小三角的背景样式,伪类暂时只能重写
    setBackgroundColor() {
      const dom = document.getElementsByClassName("switch-tab");
      for (let i = 0; i < dom.length; i++) {
        dom[i].style.backgroundColor = this.setBackgroundColor;
      }
      document.getElementsByClassName("checked")[0].style.backgroundColor = this.setCheckBgColor;
    },
    setCheckBgColor() {
      document.getElementsByClassName("checked")[0].style.backgroundColor = this.setCheckBgColor;
      this.reTirBackground(this.setCheckBgColor);
    },
    tabDefSwitch () {
      // 默认第几个选项卡
      this.setDefTab(this.tabDefSwitch);
    }
  },
  mounted() {
//    document.getElementsByClassName("checked")[0].style.backgroundColor = this.setCheckBgColor;
    this.reTirBorder();
    this.reTirBackground(this.setCheckBgColor);
    this.setDefTab(this.tabDefSwitch);
  },
  methods: {
    scaleStyle (i) {
      // alert(this['pageSwitchScale0' + (i + 1)]);
      let obj = {};
      obj.transformOrigin = 'left';
      obj.webkitTransformOrigin = 'left';
      if (this['pageSwitchScale0' + (i + 1)]) {
        obj.transform = 'scale(' + this['pageSwitchScale0' + (i + 1)] + ')';
        obj.webkitTransform = 'scale(' + this['pageSwitchScale0' + (i + 1)] + ')';
        obj.width = 100/this['pageSwitchScale0' + (i + 1)] +'%';
      }
      return obj;
    },
    switchTab(e, event) {
      if (e === 1) {
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        localStorage.setItem("product_name", this.pageSwitchtitle01);
        localStorage.setItem("product_id", this.pageSwitchProductId01);
      } else if (e === 2) {
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        localStorage.setItem("product_name", this.pageSwitchtitle02);
        localStorage.setItem("product_id", this.pageSwitchProductId02);
      } else if (e === 3) {
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        localStorage.setItem("product_name", this.pageSwitchtitle03);
        localStorage.setItem("product_id", this.pageSwitchProductId03);
      }
      const lis = document.getElementsByClassName("switch-tab");
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = this.setBackgroundColor;
      }
      event.currentTarget.style.backgroundColor = this.setCheckBgColor;
    },
    setFontColor(show) {
      let colorChecked = this.$store.state.button.simObject.simColLA;
      let colorUnChecked = this.$store.state.button.simObject.simColRA;
      let color = {};
      if (show) {
        color.color = colorChecked;
      } else {
        color.color = colorUnChecked;
      }
      return color;
    },
    setSimColor(show) {
      let simColLA = this.$store.state.button.simObject.simColLA;
      let simColLB = this.$store.state.button.simObject.simColLB;
      let simColRA = this.$store.state.button.simObject.simColRA;
      let simColRB = this.$store.state.button.simObject.simColRB;
      let color = {};
      if (show) {
        color.simColLA = simColLA;
        color.simColLB = simColLB;
      } else {
        color.simColLA = simColRA;
        color.simColLB = simColRB;
      }
      return color;
    },
    loadStyleString(css, obj) {
      var style = document.createElement("style");
      style.type = "text/css";
      try {
        style.appendChild(document.createTextNode(css));
      } catch (ex) {
        style.styleSheet.cssText = css;
      }
      obj.appendChild(style);
    },
    reTirBorder() {
      const option = document.getElementsByClassName("checked")[0];
      let style = ".switch-area .switch li.checked::before {";
      style += 'content:"";width: 0;height: 0;border-top: 0.4375rem solid;';
      style += "border-color: " + this.setBorderColor + ";";
      style +=
        "border-left: 0.375rem solid transparent;border-right: 0.375rem solid transparent;border-bottom: 0;";
      style +=
        "position: absolute;bottom: -0.4375rem;left: 50%;margin-left: -0.375rem;";
      style += "}";
      this.loadStyleString(style, option);
    },
    reTirBackground(bgColor) {
      const option = document.getElementsByClassName("checked")[0];
      let style = ".switch-area .switch li.checked::after {";
      style += 'content:"";width: 0;height: 0;border-top: 0.4375rem solid;';
      style += "border-color: " + bgColor + ";";
      style +=
        "border-left: 0.375rem solid transparent;border-right: 0.375rem solid transparent;border-bottom: 0;";
      style +=
        "position: absolute;bottom: -0.375rem;left: 50%;margin-left: -0.375rem;";
      style += "}";
      this.loadStyleString(style, option);
    },
    setDefTab (e) {
      const dom = document.getElementsByClassName("switch-tab");
      for (let i = 0; i < dom.length; i++) {
        dom[i].style.backgroundColor = this.setBackgroundColor;
      }
      if (e === 1) {
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        localStorage.setItem("product_name", this.pageSwitchtitle01);
        localStorage.setItem("product_id", this.pageSwitchProductId01);
        dom[0].style.backgroundColor = this.setCheckBgColor;
      } else if (e === 2) {
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        localStorage.setItem("product_name", this.pageSwitchtitle02);
        localStorage.setItem("product_id", this.pageSwitchProductId02);
        dom[1].style.backgroundColor = this.setCheckBgColor;
      } else if (e === 3) {
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        localStorage.setItem("product_name", this.pageSwitchtitle03);
        localStorage.setItem("product_id", this.pageSwitchProductId03);
        dom[2].style.backgroundColor = this.setCheckBgColor;
      }

    }
  },
  computed: {
    switch_num() {
      // 当tab数量发生改变时,重置选项卡选中效果
//      this.isShow1 = true;
//      this.isShow2 = false;
//      this.isShow3 = false;
//      localStorage.setItem("product_name", this.pageSwitchtitle01);
//      localStorage.setItem("product_id", this.pageSwitchProductId01);
      return this.$store.state.options.switch_num;
    },
    tabDefSwitch () {
      return this.$store.state.options.tabDefSwitch;
    },
    tabTitleItems() {
      let items = [];
      for (let i = 0; i < this.switch_num; i++) {
        let object = {};
        object.key = i + 1;
        object.tab_checked = this["isShow" + (i + 1)];
        object.tabSim_id = "myCanvas0" + (i + 1);
        object.tabSim_color = this["defaultColor" + (i + 1)];
        object.font_style = this["colorStyle" + (i + 1)];
        object.font_content = this["pageSwitchtitle0" + (i + 1)];
        object.product_id = this["pageSwitchProductId0" + (i + 1)];
        items.push(object);
      }
      return items;
    },
    tabDescItems() {
      let items = [];
      for (let i = 0; i < this.switch_num; i++) {
        let object = {};
        object.key = i + 1;
        object.tab_show = this["isShow" + (i + 1)];
        object.desc_content = this["pageSwitchContent0" + (i + 1)];
        object.scale_style = this.scaleStyle(i);
        items.push(object);
      }
      return items;
    },
    ...mapState({
      pageSwitchtitle01: state => state.options.options.switch_title01,
      pageSwitchtitle02: state => state.options.options.switch_title02,
      pageSwitchtitle03: state => state.options.options.switch_title03,
      pageSwitchContent01: state => state.options.options.switch_content01,
      pageSwitchContent02: state => state.options.options.switch_content02,
      pageSwitchContent03: state => state.options.options.switch_content03,
      pageSwitchProductId01: state => state.options.options.switch_productId01,
      pageSwitchProductId02: state => state.options.options.switch_productId02,
      pageSwitchProductId03: state => state.options.options.switch_productId03,
      pageSwitchScale01: state => state.options.options.switch_scale01,
      pageSwitchScale02: state => state.options.options.switch_scale02,
      pageSwitchScale03: state => state.options.options.switch_scale03
    }),
    colorStyle1() {
      return this.setFontColor(this.isShow1);
    },
    colorStyle2() {
      return this.setFontColor(this.isShow2);
    },
    colorStyle3() {
      return this.setFontColor(this.isShow3);
    },
    defaultColor1 () {
      return this.setSimColor(this.isShow1);
    },
    defaultColor2 () {
      return this.setSimColor(this.isShow2);
    },
    defaultColor3 () {
      return this.setSimColor(this.isShow3);
    },
    setBorderColor () {
      return this.$store.state.options.setBorderColor;
    },
    setBackgroundColor () {
      return this.$store.state.options.setBackgroundColor;
    },
    setCheckBgColor () {
      return this.$store.state.options.setCheckBgColor;
    },
    setPosition () {
      return this.$store.state.options.setPosition;
    }
  },
  components: {
    tabsL
  }
};
</script>

<style lang="scss">
.switch-box {
  padding: 15px 20px;
}
.show {
  display: block;
}
.hide {
  display: none;
}
.switch-area {
  border: 1px solid #ccc;
  position: relative;
  border-radius: 3px;
  .switch {
    border-bottom: 1px solid #ccc;
    display: flex;
    li {
      height: 3.75rem;
      font-size: 0;
      flex: 1 1 auto;
      width: 1%;
      -webkit-box-flex: 1;
      box-sizing: border-box;
      background-size: 32px 20px;
      word-break: break-all;
      border-right: 1px solid #ccc;
      &:first-child {
        border-radius: 3px 0 0 0;
      }
      &:last-child {
        border-radius: 0 3px 0 0;
        border-right: none;
      }
      a {
        display: inline-block;
        width: 100%;
        height: 22px;
        text-align: center;
        text-decoration: none;
        canvas {
          padding: 1rem 0 5px 0;
          width: 2rem;
          height: 1.25rem;
          display: inline-block;
        }
        span {
          display: block;
          height: 1.375rem;
          text-align: center;
          text-decoration: none;
          line-height: 0.75rem;
          font-size: 0.75rem;
          color: #bbb;
          -webkit-transform: scale(0.83);
          -moz-transform: scale(0.83);
          -ms-transform: scale(0.83);
          -o-transform: scale(0.83);
          transform: scale(0.83);
        }
      }
      &.checked {
        background-size: 32px 20px;
        position: relative;
        span {
          color: #4ca9d4;
        }
        &::before {
          content: "";
          width: 0;
          height: 0;
          border-top: 0.4375rem solid;
          border-color: #ccc;
          border-left: 0.375rem solid transparent;
          border-right: 0.375rem solid transparent;
          border-bottom: 0;
          position: absolute;
          bottom: -0.4375rem;
          left: 50%;
          margin-left: -0.375rem;
        }
        &::after {
          content: "";
          width: 0;
          height: 0;
          border-top: 0.4375rem solid;
          border-color: #fff;
          border-left: 0.375rem solid transparent;
          border-right: 0.375rem solid transparent;
          border-bottom: 0;
          position: absolute;
          bottom: -0.375rem;
          left: 50%;
          margin-left: -0.375rem;
        }
      }
    }
  }
  .charge-desc {
    font-size: 0;
    height: 2.5rem;
    text-align: center;
    padding-top: 0.8125rem;
    padding-bottom: 0.625rem;
    overflow: hidden;
    .fee {
      transform: scale(0.9);
      -webkit-transform: scale(0.9);
      line-height: 1rem;
      font-size: 0.875rem;
    }
  }
}
</style>
