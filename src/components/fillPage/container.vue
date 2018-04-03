<template>
    <div id="container">
      <div class="left">
        <div class="left-space">
          <div class="web">
            <div class="page">
              <templateFillPage></templateFillPage>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-space">
          <addButton>
            <!-- <el-button slot="sortButton" class="sort-button" :class="{sortButtonActive: isSort}" @click="openSort" icon="el-icon-sort">{{sortButtonFont}}</el-button> -->
          </addButton>
          <!--<div :is="item.component" :index="item.index" :key="item.index" v-for="item in setFillComponentsItems"></div>-->
          <div v-if="item.fixed" :is="item.component" v-for="item in setFillComponentsItems"></div>
          <draggable v-model="transferArr" :move="getdata" @update="datadragEnd" @start="drag=true" @end="drag=false" :options="{animation: 200,handle:'.dragDiv'}" @dragover="allowDrop">
            <transition-group>
              <div :class="{dragDiv: isSort}" v-if="!item.fixed" :is="item.component" :index="item.index" :key="item.index" v-for="item in setFillComponentsItems"></div>
            </transition-group>
          </draggable>
          <shortcutsExt></shortcutsExt>
        </div>
      </div>
    </div>
</template>

<script>
  import '../web.scss';
  import draggable from 'vuedraggable';
  import sortAB from '../common/common';
  import templateFillPage from './template/template';
  import addButton from './topAddButton';
  import setPageTitle from './set/pageTitle';
  import setListTitle from './set/listTitle';
  import setPersonInfo from './set/personInfo';
  import setChooseTel from './set/chooseTel';
  import setFirstMonth from './set/firstMonth';
  import setDeliveryAddress from './set/deliveryAddress';
  import setButton from './set/button';
  import setDescribe from './set/describe';
  import setProtocol from './set/protocol';
  import setKingBroad from './set/kingBroad';
  import shortcutsExt from '../common/shortcutsExt';
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
      if (localStorage.getItem('singleFillData')) {
        data = JSON.parse(localStorage.getItem('singleFillData'));
      }
      if (data) {
//         console.log('进入填写页编辑页面');
        this.type = 'edit';
        this.obtainFillData(data);
        // 设置topAddButton按钮显示
        for (let i = 1; i < this.setFillComponentsItems.length; i++) {
          if (this.setFillComponentsItems[i].index != 0) {
            const dom = document.getElementById(this.setFillComponentsItems[i].index);
            if (dom) {
              dom.classList.add('is-disabled');
            }
          }
        }
      } else {
//         console.log('进入填写页新建页面');
        this.type = 'new';
        this.resetVuex();
      }
    },
    methods: {
      getdata (evt) {
        // console.log(evt.draggedContext.element.index);
      },
      datadragEnd (evt) {
        // console.log('拖动前的索引 :' + evt.oldIndex);
        // console.log('拖动后的索引 :' + evt.newIndex);
        let getFillComponentsItems = this.$store.state.fill.getFillComponentsItems;
        getFillComponentsItems = this.sortAB(this.transferArr, getFillComponentsItems);
         console.log(JSON.stringify(this.transferArr));
         console.log(JSON.stringify(getFillComponentsItems));
        this.$store.commit('newSetFillComponentsItems', this.transferArr);
        this.$store.commit('newGetFillComponentsItems', getFillComponentsItems);
      },
      allowDrop:function (ev) {
        ev.preventDefault();
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
      templateFillPage,
      draggable,
      sortAB,
      addButton,
      setPageTitle,
      setListTitle,
      setPersonInfo,
      setChooseTel,
      setFirstMonth,
      setDeliveryAddress,
      setButton,
      setDescribe,
      setProtocol,
      setKingBroad,
      shortcutsExt
    },
    computed: {
      setFillComponentsItems () {
        this.transferArr = this.$store.state.fill.setFillComponentsItems;
        return this.$store.state.fill.setFillComponentsItems;
      },
      isSort () {
        return this.$store.state.project.sort;
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
  &>.right {
      flex:3;
      overflow: hidden;
      height: 100%;
    }
  }

</style>
<style lang="scss">
  .sortButtonActive{
    border-color: #13ce66 !important;
    color: #13ce66 !important;
  }
  .dragDiv{
    cursor:move;
    background:#f0f0f0;
    height:20px;
    overflow:hidden;
    h3{
      cursor:move;
    }
  }
</style>
