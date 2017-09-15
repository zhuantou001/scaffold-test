<template>
  <div>
    <section id="area" :class="[{ slip: showBox }, sidebar, location]">
      <ul id="province" class="first-list">
        <li v-for="(item, index) in city" :data-code="item.CITY_CODE" :style="{ 'color': curDisCityCode == item.CITY_CODE ? majorColor : '#666' }" @click="chooseCity(item)">{{item.CITY_NAME}}</li>
      </ul>
      <ul id="city" class="second-list">
        <li v-for="(item, index) in district" :style="{ 'color': curDistrictCode == item.DISTRICT_CODE ? majorColor : '#666' }" :data-code="item.DISTRICT_CODE" @click="chooseDistrict(item)">{{item.DISTRICT_NAME}}</li>
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
            city: [],
            district: [],
            curDisCityCode: '',
            curDisCityName: '',
            curDistrictCode: '',
            curDistrictName: '',
            sidebar: 'sidebar',
            location: 'location'
          }
      },
      props: ['showBox'],
      mounted(){
          this.initCity();
          this.initDistrict();
      },
      //相关操作事件
      methods: {
        // 初始化城市
        initCity () {
          this.city = Area.PROVINCE_MAP[this.curProvinceCode];
          this.curDisCityCode = this.curCityCode;
          this.curDisCityName = this.curCityName;
        },
        // 初始化区县
        initDistrict () {
          this.district = Area.CITY_MAP[this.curDisCityCode];
          if (this.curDisCityCode) {
            this.curDistrictCode = Area.CITY_MAP[this.curDisCityCode][0].DISTRICT_CODE;
            this.curDistrictName = Area.CITY_MAP[this.curDisCityCode][0].DISTRICT_NAME;
          }
        },
        // 点击市
        chooseCity (item) {
          this.curDisCityCode = item.CITY_CODE;
          this.curDisCityName = item.CITY_NAME;
          this.initDistrict();
        },
        // 点击市
        chooseDistrict (item) {
          this.curDistrictCode = item.DISTRICT_CODE;
          this.curDistrictName = item.DISTRICT_NAME;
          let chooseArea = [{
            "curCityCode": this.curDisCityCode,
            "curCityName": this.curDisCityName,
            "curDistrictCode": this.curDistrictCode,
            "curDistrictName": this.curDistrictName,
          }];
          this.$store.commit('newChooseDisArea', chooseArea);
          this.$emit('chooseResult');
          this.$emit('close');
        }
      },
      watch: {
        curCityCode () {
          this.initCity();
          this.initDistrict();
        }
      },
      components: {},
      computed: {
        curProvinceCode () {
          return this.$store.state.fill.chooseArea[0].curProvinceCode;
        },
        curCityCode () {
          return this.$store.state.fill.chooseArea[0].curCityCode;
        },
        curCityName () {
          return this.$store.state.fill.chooseArea[0].curCityName;
        },
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
