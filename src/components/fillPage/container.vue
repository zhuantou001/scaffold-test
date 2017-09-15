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
          <addButton></addButton>
          <div :is="item.component" :index="item.index" :key="item.index" v-for="item in setFillComponentsItems"></div>
          <!--<draggable v-model="transferArr" :move="getdata" @update="datadragEnd">-->
            <!--<transition-group>-->
              <!--<div v-if="!item.fixed" :is="item.component" :index="item.index" :key="item.index" v-for="item in setFillComponentsItems"></div>-->
            <!--</transition-group>-->
          <!--</draggable>-->
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
  export default {
    name: 'container',
    data () {
      return {
        type: '', // new: 新建模式, edit: 编辑模式
        category_id: '', // 编辑页面里属于哪个文件夹ID
        page_id: '', // 编辑页面里页面ID
        transferArr: [] // 拖动调整顺序后的数组
       };
    },
    mounted () {
      // console.log('进入填写页新建页面');
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
        // console.log(JSON.stringify(this.transferArr));
        // console.log(JSON.stringify(getFillComponentsItems));
        this.$store.commit('newSetFillComponentsItems', this.transferArr);
        this.$store.commit('newGetFillComponentsItems', getFillComponentsItems);
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
      setProtocol
    },
    computed: {
      setFillComponentsItems () {
        this.transferArr = this.$store.state.fill.setFillComponentsItems;
        return this.$store.state.fill.setFillComponentsItems;
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
