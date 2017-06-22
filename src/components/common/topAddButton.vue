<template>
  <div class="assembly">
    <h3><i class="el-icon-setting"></i> 选择需要的组件<span>(目前每个组件只能选择一次)</span></h3>
    <el-button type="primary" @click="addComponents('setTopImg',1,'getTopImg')" icon="picture">添加头图</el-button>
    <el-button type="primary" @click="addComponents('setSwitch',2,'getSwitch');" icon="document">添加选项卡</el-button>
    <el-button type="primary" @click="addComponents('setPageButton',3,'getPageButton')" icon="menu">添加按钮</el-button>
    <el-button type="primary" @click="addComponents('setPageWords',4,'getPageWords')" icon="edit">添加文字</el-button>
    <el-button type="primary" @click="addComponents('setPageWordsUrl',5,'getPageWordsUrl')" icon="edit">添加超文本文字</el-button>
    <el-button type="primary" @click="addComponents('setDetailImg',6,'getDetailImg')" icon="picture">添加详情图</el-button>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        setComponentsItems: [{'component': 'setPageTitle', 'index': 0}],
        getComponentsItems: [],
        topImgShow: false,
        detailImgShow: false
      };
    },
    methods: {
      addComponents: function (setcomponent, index, getcomponent) {
        /* 添加到设置页面 只能添加一次 */
        if (setcomponent) {
          if (this.setComponentsItems.length) {
            let i;
            for (i in this.setComponentsItems) {
              // alert(index + '   ' + this.setComponentsItems[i].index);
              if (index === this.setComponentsItems[i].index) {
                return false;
              }
            }
            this.setComponentsItems.push({
              component: setcomponent,
              index: index
            });
          } else {
            this.setComponentsItems.push({
              component: setcomponent,
              index: index
            });
          }
          // alert(JSON.stringify(this.setComponentsItems));
        }
        /* 添加到预览模板页面 只能添加一次 */
        if (getcomponent) {
          /* 头图和详情图单独处理 */
          if (getcomponent === 'getTopImg') {
            this.topImgShow = true;
            this.$store.commit('newTopImgShow', this.topImgShow);
            return false;
          }
          if (getcomponent === 'getDetailImg') {
            this.detailImgShow = true;
            this.$store.commit('newDetailImgShow', this.detailImgShow);
            return false;
          }
          if (this.getComponentsItems.length) {
            let i;
            for (i in this.getComponentsItems) {
              // alert(index + '   ' + this.getComponentsItems[i].index);
              if (index === this.getComponentsItems[i].index) {
                return false;
              }
            }
            this.getComponentsItems.push({
              component: getcomponent,
              index: index
            });
          } else {
            this.getComponentsItems.push({
              component: getcomponent,
              index: index
            });
          }
          // alert(JSON.stringify(this.getComponentsItems));
        }
      }
    },
    components: {
    },
    watch: {
      setComponentsItems: function () {
        this.$store.commit('newSetComponentsItems', this.setComponentsItems);
      },
      getComponentsItems: function () {
        this.$store.commit('newGetComponentsItems', this.getComponentsItems);
      },
      topImgShow: function () {
        this.$store.commit('newTopImgShow', this.topImgShow);
      },
      detailImgShow: function () {
        this.$store.commit('newDetailImgShow', this.detailImgShow);
      }
    }
  };
</script>

<style lang="scss" scoped>
  h3>span{
    font-size: 16px;
    font-weight: normal;
    color:#0b97c4;
  }
  button{
    margin:10px 0;
  }
</style>
