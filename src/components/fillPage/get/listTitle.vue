<template>
  <div>
    <div class="list-title"><p>{{listTitle}} <span>{{listRemark}}</span></p></div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
      };
    },
    props: ['index'],
    methods: {
    },
    computed: {
      listTitle () {
        const listTitles = this.$store.state.fill.listTitles;
        // alert(JSON.stringify(listTitles));
        let i = 0;
        for (i in listTitles) {
          if (listTitles[i].index === this.index) {
            return listTitles[i].listTitle;
          }
        }
      },
      listRemark () {
        const listTitles = this.$store.state.fill.listTitles;
        let i = 0;
        for (i in listTitles) {
          if (listTitles[i].index === this.index) {
            return listTitles[i].listRemark;
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-title {
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    background: #f7f7f7;
    color: #888;
    border-top: 2PX solid #f1f1f1;
    border-bottom: 2PX solid #f1f1f1;
    p {
      transform: scale(0.917);
      transform-origin: left;
      span {
        color: #bababa;
        i {
          font-style: normal;
          color: #ff5252;
        }
      }
    }
  }
</style>
