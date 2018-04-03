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
import * as Cookie from './cookie';
export default {
  data() {
    return {
      province: [],
      city: [],
      curProvinceCode: "",
      curProvinceName: "",
      curCityCode: "",
      curCityName: "",
      sidebar: "sidebar",
      location: "location"
    };
  },
  props: ["showBox"],
  mounted() {},
  watch: {
    initData() {
      if (this.initData) {
        this.initArea();
        this.initAddress();
        this.initCity();
      }
    }
  },
  //相关操作事件
  methods: {
    // 初始化省
    initArea() {
      this.province = this.initData.provinceData;
      // this.curProvinceCode = this.province[0].PROVINCE_CODE;
      // this.curProvinceName = this.province[0].PROVINCE_NAME;
    },
    // 初始化城市
    initCity() {
      this.city = this.initData.cityData[this.curProvinceCode];
      this.curCityCode = this.city[0].CITY_CODE;
      this.curCityName = this.city[0].CITY_NAME;
    },
    // 点击省
    chooseProvince(item) {
      this.curProvinceCode = item.PROVINCE_CODE;
      this.curProvinceName = item.PROVINCE_NAME;
      this.initCity();
    },
    // 点击市
    chooseCity(item) {
      this.curCityCode = item.CITY_CODE;
      this.curCityName = item.CITY_NAME;
      this.transferStore();
      this.$store.commit("newEssProvince", this.curCityCode);
      this.$store.commit("newEssCity", this.curCityName);
      this.$emit("chooseResult");
      this.$emit("close");
    },
    transferStore() {
      let chooseArea = [
        {
          curProvinceCode: this.curProvinceCode,
          curProvinceName: this.curProvinceName,
          curCityCode: this.curCityCode,
          curCityName: this.curCityName
        }
      ];
      this.$store.commit("newChooseArea", chooseArea);
    },
    // 初始化省份地市
    initAddress() {
      const _location = Cookie.getCookie("mallcity") || "11|110";
      this.curProvinceCode = _location.split("|")[0];
      this.curCityCode = _location.split("|")[1];
      const _exist = this.initData.provinceData.filter(p => p.PROVINCE_CODE === this.curProvinceCode);
      if (_exist.length === 0) {
        this.curProvinceCode = this.initData.provinceData[0].PROVINCE_CODE;
        this.curCityCode = this.initData.cityData[this.curProvinceCode][0].CITY_CODE;
        Cookie.setCookie("mallcity", `${_provinceCode}|${_cityCode}`);
      }
      this.curProvinceName = _exist[0].PROVINCE_NAME;
    }
  },
  components: {},
  computed: {
    majorColor() {
      return this.$store.state.fill.pageNature[0].majorColor;
    },
    initData() {
      return this.$store.state.fillInfo.initData;
    }
  }
};
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
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
  &.slip {
    right: 0 !important;
  }
  &.location {
     right: -30rem;
     width: 15rem;
     line-height: 2.625rem;
     font-size: .75rem;
    transition: right 0.5s;

    .first-list {
      -webkit-overflow-scrolling: touch;
      padding: 0 8.5625rem 0 .9375rem;
      height: 100%;
      overflow-y: auto;
      li {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
        border-bottom: 1px solid #f4f4f4;
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
      width: 7.9375rem;
      padding-left: .625rem;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
      li {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
        border-bottom: 1px solid #f4f4f4;
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
  background: rgba(0, 0, 0, 0.7);
}
.show {
  display: block !important;
}
</style>
