<template>
  <div>
    <section id="post" :class="[{ slip: showBox }, sidebar, location]">
      <ul id="post-province" class="first-list">
        <li v-for="(item, index) in province" :data-code="item.PROVINCE_CODE" :style="{ 'color': curDisProvinceCode == item.PROVINCE_CODE ? majorColor : '#666' }" @click="chooseProvince(item)">{{item.PROVINCE_NAME}}</li>
      </ul>
      <ul id="post-city" class="second-list">
        <li v-for="(item, index) in city" :data-code="item.CITY_CODE" :style="{ 'color': curDisCityCode == item.CITY_CODE ? majorColor : '#666' }" @click="chooseCity(item)">{{item.CITY_NAME}}</li>
      </ul>
      <ul id="post-district" class="third-list">
        <li v-for="(item, index) in district" :style="{ 'color': curDistrictCode == item.DISTRICT_CODE ? majorColor : '#666' }" :data-code="item.DISTRICT_CODE" @click="chooseDistrict(item)">{{item.DISTRICT_NAME}}</li>
      </ul>
    </section>

    <div class="mask" v-if="showBox" @click="$emit('close')"></div>
  </div>
</template>

<script>
    import Area from './area';

    export default {
      data() {
          return {
            province: [],
            city: [],
            district: [],
            curDisProvinceCode: '',
            curDisProvinceName: '',
            curDisProvinceCode6: '',
            curDisCityCode: '',
            curDisCityName: '',
            curDisCityCode6: '',
            curDistrictCode: '',
            curDistrictName: '',
            sidebar: 'sidebar',
            location: 'location'
          }
      },
      props: ['showBox'],
      mounted () {
        if (this.curChooseArea[0].curProvinceCode && this.curChooseArea[0].curCityCode) {
          this.initProvince();
          this.initCity();
          this.initDistrict();
        }
      },
      //相关操作事件
      methods: {
        // 通过某个元素知道该元素所在数组的位置(下标)
        arrayFindSub (arr, value, name) {
          for(var i = 0; i < arr.length; i++){
            if(arr[i][name] == value){
              return i;
            }
          }
          return -1;
        },
        // 初始化省
        initProvince () {
          this.province = this.initData.provinceData;
            this.curDisProvinceCode = this.curChooseArea[0].curProvinceCode;
            this.curDisProvinceName = this.curChooseArea[0].curProvinceName;
        },
        // 初始化城市
        initCity () {
          this.city = this.initData.cityData[this.curChooseArea[0].curProvinceCode];
          this.curDisCityCode = this.curChooseArea[0].curCityCode;
          this.curDisCityName = this.curChooseArea[0].curCityName;
          console.log(this.curDisCityCode);
        },
        // 初始化区县
        initDistrict () {
          // 省和市用后台数据,区县用本地数据
          // 后台请求的省市和本地文件里的编码不同,所以先通过ESS_PROVINCE_CODE找到需要的PROVINCE_CODE
          // 再进行查询
          let cityCode6 = '';
          const allProvince = Area.PROVINCE_LIST;
          let p_n = this.arrayFindSub(allProvince, this.curDisProvinceCode, 'ESS_PROVINCE_CODE');
          let provinceCode6 = allProvince[p_n].PROVINCE_CODE;
          this.curDisProvinceCode6 = provinceCode6;
          const allCity = Area.PROVINCE_MAP[provinceCode6];
          let c_n = this.arrayFindSub(allCity, this.curDisCityCode, 'ESS_CITY_CODE');
          if (c_n != -1) {
            cityCode6 = allCity[c_n].CITY_CODE;
            this.curDisCityCode6 = cityCode6;
            this.district = Area.CITY_MAP[cityCode6];
            if (this.curDisCityCode) {
              this.curDistrictCode = Area.CITY_MAP[cityCode6][0].DISTRICT_CODE;
              this.curDistrictName = Area.CITY_MAP[cityCode6][0].DISTRICT_NAME;
            }
          }
        },
        // 点击省
        chooseProvince (item) {
          this.curDisProvinceCode = item.PROVINCE_CODE;
          this.curDisProvinceName = item.PROVINCE_NAME;
          // 重新加载市
          this.city = this.initData.cityData[this.curDisProvinceCode];
          this.curDisCityCode = this.city[0].CITY_CODE;
          this.curDisCityName = this.city[0].CITY_NAME;
          this.initDistrict();
        },
        // 点击市
        chooseCity (item) {
          this.curDisCityCode = item.CITY_CODE;
          this.curDisCityName = item.CITY_NAME;
          this.initDistrict();
        },
        // 点击区
        chooseDistrict (item) {
          this.curDistrictCode = item.DISTRICT_CODE;
          this.curDistrictName = item.DISTRICT_NAME;
          this.transferStore();
          this.$emit('chooseResult');
          this.$emit('close');
        },
        transferStore () {
          let chooseArea = [{
            "curProvinceCode": this.curDisProvinceCode6,
            "curProvinceName": this.curDisProvinceName,
            "curCityCode": this.curDisCityCode6,
            "curCityName": this.curDisCityName,
            "curDistrictCode": this.curDistrictCode,
            "curDistrictName": this.curDistrictName,
          }];
          this.$store.commit('newChooseDisArea', chooseArea);
        }
      },
      watch: {
        curChooseArea () {
          if (this.curChooseArea[0].curProvinceCode && this.curChooseArea[0].curCityCode) {
            this.initProvince();
            this.initCity();
            this.initDistrict();
          }
        }
      },
      components: {},
      computed: {
        majorColor () {
          return this.$store.state.fill.pageNature[0].majorColor;
        },
        curChooseArea () {
          return this.$store.state.fill.chooseArea;
        },
        initData () {
          return JSON.parse(localStorage.getItem('fillPageInit'));
        }
      }
    }
</script>

<style lang="scss" scoped>
  $error: #ff3021;
  $theme: #40c9b3;

  #post{
  &.sidebar {
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
     right: -540px;
     width: 270px;
     line-height: 2.625rem;
     font-size: 0.75rem;
     transition: right .3s;
  .first-list {
    -webkit-overflow-scrolling: touch;
    padding: 0 180px 0 10px;
    height: 100%;
    overflow-y: auto;
  li {
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
    box-shadow: 0 0 5px 1PX rgba(0, 0, 0, .2);
    padding: 0 90px 0 10px;
    height: 100%;
    width: 80px;
  li {
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
  .third-list {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80px;
    padding-left: 10px;
    box-shadow: 0 0 5px 1PX rgba(0, 0, 0, .2);
  li {
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
