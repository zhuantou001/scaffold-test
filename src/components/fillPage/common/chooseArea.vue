<template>
  <div>
    <section :class="[{ slip: showBox }, sidebar, location]">
      <ul id="province" class="first-list">
        <li v-for="(item, index) in province" :data-code="item.PROVINCE_CODE" :style="{ 'color': curProvinceCode == item.PROVINCE_CODE ? majorColor : '#666' }"  @click="chooseProvince(item)">{{item.PROVINCE_NAME}}</li>
      </ul>
      <ul class="second-list">
        <li v-for="(item, index) in city" :data-code="item.CITY_CODE" :style="{ 'color': curCityCode == item.CITY_CODE ? majorColor : '#666' }" @click="chooseCity(item)">{{item.CITY_NAME}}</li>
      </ul>
    </section>
    <div class="mask" v-if="showBox" @click="$emit('close')"></div>
  </div>
</template>

<script>
//    import * as commonCheck from './../commonVue/js/commonCheck';
    import Area from './area';

    export default {
        data() {
            return {
              province: [],
              city: [],
              curProvinceCode: this.$store.state.fill.chooseArea[0].curProvinceCode,
              curProvinceName: this.$store.state.fill.chooseArea[0].curProvinceName,
              curCityCode: '',
              curCityName: '',
              sidebar: 'sidebar',
              location: 'location'
            }
        },
        props: ['showBox'],
        mounted(){
          this.initArea();
          this.initCity();
          // console.log(JSON.stringify(this.province));
        },
      //相关操作事件
      methods: {
        // 初始化省
        initArea () {
          this.province = Area.PROVINCE_LIST;
        },
        // 初始化城市
        initCity () {
          this.city = Area.PROVINCE_MAP[this.curProvinceCode];
          this.curCityCode = Area.PROVINCE_MAP[this.curProvinceCode][0].CITY_CODE;
          this.curCityName = Area.PROVINCE_MAP[this.curProvinceCode][0].CITY_NAME;
        },
        // 点击省
        chooseProvince (item) {
          this.curProvinceCode = item.PROVINCE_CODE;
          this.curProvinceName = item.PROVINCE_NAME;
          this.initCity();
        },
        // 点击市
        chooseCity (item) {
          this.curCityCode = item.CITY_CODE;
          this.curCityName = item.CITY_NAME;
          let chooseArea = [{
            "curProvinceCode": this.curProvinceCode,
            "curProvinceName": this.curProvinceName,
            "curCityCode": this.curCityCode,
            "curCityName": this.curCityName,
          }];
          this.$store.commit('newChooseArea', chooseArea);
          this.$emit('chooseResult');
          this.$emit('close');
        },
      },
      components: {},
      computed: {
        majorColor () {
          return this.$store.state.fill.pageNature[0].majorColor;
        }
      }
    }
</script>

<style lang="scss" scoped>
  $error: #ff3021;
  $theme: #40c9b3;
  .sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1002;
    box-shadow: 0 0 5px 1PX rgba(0, 0, 0, .2);
  &.slip {
     right: 0!important;
   }
  &.location {
     right: -480px;
     width: 240px;
     line-height: 42px;
     font-size: 12px;
     transition: right .5s;
  .first-list {
    -webkit-overflow-scrolling: touch;
    padding: 0 137px 0 15px;
    height: 100%;
    overflow-y: auto;
  li {
    font-size: 15px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #666;
    border-bottom: 1PX solid #f4f4f4;
    overflow: hidden;
  &.selected {
     color: $theme;
   }
  }
  }
  .second-list {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 127px;
    padding-left: 10px;
    box-shadow: 0 0 5px 1PX rgba(0, 0, 0, .2);
  li {
    font-size: 15px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #666;
    border-bottom: 1PX solid #f4f4f4;
    overflow: hidden;
  &.selected {
     color: $theme;
   }
  &:last-child {
     border-bottom: 0;
   }
  }
  }
  }
  }

  .mask {
    /*display: none;*/
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0,0,0,0.7);
  }
  .show{
    display:block !important;
  }
</style>
