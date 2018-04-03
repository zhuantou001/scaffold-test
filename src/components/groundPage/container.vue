<template>
    <div id="container">
      <div class="left" :class="{bigLeft: screenType}">
        <div class="left-space">
          <div class="web">
            <div class="page">
              <templateLandingPage></templateLandingPage>
            </div>
          </div>
        </div>
      </div>
      <div class="right" :class="{smallRight: screenType}">
        <div class="right-space">
          <topAddButton>
            <!-- <el-button slot="sortButton" class="sort-button" :class="{sortButtonActive: isSort}" @click="openSort" icon="sort">{{sortButtonFont}}</el-button> -->
          </topAddButton>
          <!--<div v-if="item.fixed" :is="item.component" v-for="item in setComponentsItems"></div>-->
          <draggable v-model="transferArr" :move="getdata" @update="datadragEnd" @start="drag=true" @end="drag=false" :options="{animation: 200,handle:'.dragDiv'}" @dragover="allowDrop">
            <transition-group>
              <div :class="{dragDiv: isSort}" v-if="!item.fixed" :is="item.component" :index="item.index" :key="item.index" v-for="item in setComponentsItems"></div>
            </transition-group>
          </draggable>
          <shortcutsExt></shortcutsExt>
        </div>
      </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import sortAB from '../common/common';
  import topAddButton from './topAddButton';
  import setPageTitle from './set/pageTitle';
  import setPageWords from './set/pageWords';
  import setPageWordsUrl from './set/pageWordsUrl';
  import setTopImg from './set/topImg';
  import setSwitch from './set/switch';
  import setSwitchSlide from './set/switchSlide';
  import setSwitchImage from './set/switchImage';
  import setPageButton from './set/pageButton';
  import setDetailImg from './set/detailImg';
  import setPageBg from './set/pageBg';
  import setApplyDownload from './set/applyDownload.vue';
  import setHeatMap from './set/heatMap.vue';
  import setPageShare from './set/pageShare.vue';
  import setFloatWindow from './set/floatWindow.vue';
  import templateLandingPage from './template/template';
  import obtainData from '../common/common';
  import shortcutsExt from '../common/shortcutsExt';
  import setEmbedCode from './set/embedCode';
  import setFixedButton from './set/fixedButton';
  import '../web.scss';
  export default {
    name: 'container',
    data () {
      return {
        type: '', // new: 新建模式, edit: 编辑模式
        category_id: '', // 编辑页面里属于哪个文件夹ID
        page_id: '', // 编辑页面里页面ID
        transferArr: [], // 拖动调整顺序后的数组
        // isSort: false,  // 是否开启排序
        sortButtonFont: '开启排序'  // 开启排序文案
      };
    },
    mounted () {
      let data = '';
      if (localStorage.getItem('projectData')) {
        data = JSON.parse(localStorage.getItem('projectData'));
      }
      if (data) {
        // console.log('进入落地页编辑页面');
        this.type = 'edit';
        this.obtainData(data);
        // 设置topAddButton按钮显示
       // console.log(this.setComponentsItems)
        for (let i = 1; i < this.setComponentsItems.length; i++) {
          // 按钮、文字、超文本文字模块改为多次添加后 匹配之前已经存在的卡样式
          const bool = this.setComponentsItems[i].index != 0 && this.setComponentsItems[i].index != 3 && this.setComponentsItems[i].index != 4 && this.setComponentsItems[i].index != 5;
         // console.log(bool);
          if (bool) {
            const dom = document.getElementById('groundPageButton' + this.setComponentsItems[i].index)
            if (dom) {
              dom.classList.add('is-disabled');
            }
          }
        }
      } else {
        // console.log('进入落地页新建页面');
        this.type = 'new';
        this.resetVuex();
      }
    },
    methods: {
      getdata (evt) {
//         console.log(evt.draggedContext.element.index);
      },
      datadragEnd (evt) {
//         console.log('拖动前的索引 :' + evt.oldIndex);
//         console.log('拖动后的索引 :' + evt.newIndex);
        let getComponentsItems = this.$store.state.app.getComponentsItems;
        getComponentsItems = this.sortAB(this.transferArr, getComponentsItems);
        this.$store.commit('newSetComponentsItems', this.transferArr);
        this.$store.commit('newGetComponentsItems', getComponentsItems);
      },
      allowDrop (evt) {
        evt.preventDefault();
      },
      openSort (event) {
        if (this.isSort) {
          // this.isSort = false;
          this.$store.commit('newSort', false);
          this.sortButtonFont = '开启排序';
        } else {
          // this.isSort = true;
          this.$store.commit('newSort', true);
          this.sortButtonFont = '关闭排序';
        }
      }
    },
    components: {
      draggable,
      sortAB,
      topAddButton,
      setPageTitle,
      setPageWords,
      setPageWordsUrl,
      setTopImg,
      setSwitch,
      setSwitchSlide,
      setSwitchImage,
      setPageButton,
      setDetailImg,
      setPageBg,
      setApplyDownload,
      setHeatMap,
      setPageShare,
      setFloatWindow,
      templateLandingPage,
      obtainData,
      shortcutsExt,
      setEmbedCode,
      setFixedButton
    },
    computed: {
      setComponentsItems () {
        this.transferArr = this.$store.state.app.setComponentsItems;
        return this.$store.state.app.setComponentsItems;
      },
      isSort () {
        return this.$store.state.project.sort;
      },
      screenType () {
        return this.$store.state.topImg.screenType === 'horizontal';
      }
    }
  };
</script>
<style lang="scss" scoped>
  #container{
    height: calc(100% - 60px);
    display:flex;
    &>.left {
      flex:2;
      overflow: hidden;
      height: 100%;
      border-right:1px solid #ddd;
    }
    &>.bigLeft {
      flex: 7;
      .left-space {
        .web {
          .page {
            width: 500px;
           // height: 284px;
          }
        }
      }
    }
    &>.right {
      flex: 3;
      overflow: hidden;
      height: 100%;
    }
    &>.smallRight {
      flex: 10;
    }
  }
</style>
