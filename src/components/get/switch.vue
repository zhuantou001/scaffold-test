<template id="switch">
  <div class="switch-box">
    <div class="switch-area">
      <ul class="switch cf">
        <li class="switch-tab" v-for="item in tabTitleItems" :class="{'checked':item.tab_checked}" @click="switchTab(item.key)">
          <a href="javascript:;">
            <tabsL :v_id="item.tabSim_id" :v_color="item.tabSim_color"></tabsL>
            <span :style="item.font_style">{{item.font_content}}</span></a>
        </li>
      </ul>
      <div class="charge-desc">
        <p v-for="item in tabDescItems" :class="{'show':item.tab_show, 'hide':!item.tab_show}" class="fee" v-html="item.desc_content"></p>
        </div>
    </div>
  </div>
</template>

<script>
  import tabsL from './../tabImg/tabsL.vue';

  export default {
    name: 'switch',
    data () {
      return {
        isShow1: true,
        isShow2: false,
        isShow3: false
      };
    },
    directives: {
    },
    methods: {
      switchTab (e) {
        if (e === 1) {
          this.isShow1 = true;
          this.isShow2 = false;
          this.isShow3 = false;
        } else if (e === 2) {
          this.isShow1 = false;
          this.isShow2 = true;
          this.isShow3 = false;
        } else if (e === 3) {
          this.isShow1 = false;
          this.isShow2 = false;
          this.isShow3 = true;
        }
      },
      setFontColor (show) {
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
      setSimColor (show) {
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
      }
    },
    computed: {
      switch_num () {
        // 当tab数量发生改变时,重置选项卡选中效果
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        return this.$store.state.options.switch_num;
      },
      tabTitleItems () {
        let items = [];
        for (let i = 0; i < this.switch_num; i++) {
          let object = {};
          object.key = i + 1;
          object.tab_checked = this['isShow' + (i + 1)];
          object.tabSim_id = 'myCanvas0' + (i + 1);
          object.tabSim_color = this['defaultColor' + (i + 1)];
          object.font_style = this['colorStyle' + (i + 1)];
          object.font_content = this['pageSwitchtitle0' + (i + 1)];
          items.push(object);
        }
        return items;
      },
      tabDescItems () {
        let items = [];
        for (let i = 0; i < this.switch_num; i++) {
          let object = {};
          object.key = i + 1;
          object.tab_show = this['isShow' + (i + 1)];
          object.desc_content = this['pageSwitchContent0' + (i + 1)];
          items.push(object);
        }
        return items;
      },
      pageSwitchtitle01 () {
        return this.$store.state.options.options.switch_title01;
      },
      pageSwitchtitle02 () {
        return this.$store.state.options.options.switch_title02;
      },
      pageSwitchtitle03 () {
        return this.$store.state.options.options.switch_title03;
      },
      pageSwitchContent01 () {
        return this.$store.state.options.options.switch_content01;
      },
      pageSwitchContent02 () {
        return this.$store.state.options.options.switch_content02;
      },
      pageSwitchContent03 () {
        return this.$store.state.options.options.switch_content03;
      },
      colorStyle1 () {
        return this.setFontColor(this.isShow1);
      },
      colorStyle2 () {
        return this.setFontColor(this.isShow2);
      },
      colorStyle3 () {
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
      }
    },
    components: {
      tabsL
    }
  };

</script>

<style lang="scss">
  $blue: #4ca9d4;
  .switch-box{
    margin:15px 0;
  }
  .show{
    display:block;
  }
  .hide{
    display:none;
  }
  .switch-area {
    border: 1PX solid #ccc;
    background-color: #fff;
    position: relative;
    border-radius:3px;
    .switch {
      border-bottom: 1PX solid #ccc;
      display: flex;
      li {
        height: 59px;
        font-size: 0;
        flex:1 1 auto;
        width:1%;
        -webkit-box-flex:1;
        box-sizing:border-box;
        background-size:32px 20px;
        word-break: break-all;
        border-right: 1PX solid #ccc;
        &:first-child {
           border-radius:3px 0 0 0;
         }
        &:last-child {
           border-radius:0 3px 0 0;
           border-right:none;
         }
        a {
          display: inline-block;
          width: 100%;
          height: 22px;
          text-align: center;
          text-decoration: none;
          canvas{
            padding: 15px 0 5px 0;
            width: 33px;
            height: 22px;
            display: inline-block;
          }
          span {
            display: block;
            line-height: 12px;
            font-size: 12px;
            color: #bbb;
            transform:scale(0.83);
          }
        }
        &.checked {
           background-size:32px 20px;
           position: relative;
          span {
            color: $blue;
          }
          &::before {
             content: '';
             width: 0;
             height: 0;
             border-top: 7px solid #ccc;
             border-left: 6px solid transparent;
             border-right: 6px solid transparent;
             border-bottom: 0;
             position: absolute;
             bottom: -7px;
             left: 50%;
             margin-left: -6px;
           }
          &::after {
             content: '';
             width: 0;
             height: 0;
             border-top: 7px solid #fafafa;
             border-left: 6px solid transparent;
             border-right: 6px solid transparent;
             border-bottom: 0;
             position: absolute;
             bottom: -6px;
             left: 50%;
             margin-left: -6px;
           }
        }
      }
    }
    .charge-desc {
      font-size:0;
      height: 36px;
      text-align: center;
      padding-top: 13px;
      padding-bottom: 10px;
      overflow: hidden;
      .fee {
        line-height: 16px;
        font-size: 14px;
      }
    }
  }

</style>
