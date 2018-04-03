<template id="detailImg">
  <div>
    <div class="replace-img" :class="{'show':isShow,'hide':!isShow}"><span>请上传详情图</span></div>
    <li v-for="(item, index) in absoluteDetailImgUrls">
      <img :src="item.image_url" :id="'image' + index" :usemap="'planetmap' + index">
      <map :name="'planetmap' + index" :id="'planetmap' + index">
          <area shape="rect" coords="" :href="item.mapUrl"/>
      </map>
    </li>
  </div>
</template>


<script>
  import {Config} from '../../common/api';
  export default {
    name: 'detailImg',
    data () {
      return {
      };
    },
    watch: {
      absoluteDetailImgUrls () {
        const that = this;
        this.$nextTick(function() {
          that.initHeatHot();
        })
      },
      mapHots () {
        const that = this;
        this.$nextTick(function() {
          that.initHeatHot();
        })
      }
    },
    mounted () {
      const that = this;
      this.$nextTick(function() {
        that.initHeatHot();
      })
    },
    methods: {
      initHeatHot () {
        // const imgSizeS = 640; // 图片元素尺寸
        let imgSizeS = 640; // 图片元素尺寸
        let winWidth = '';
        if (window.innerWidth)
          winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
          winWidth = document.body.clientWidth;
        // const mapHot = [[152, 335, 310, 365]];
        for (let i = 0;i < this.mapHots.length;i++) {
          if (this.mapHots[i].map_hot) {
            if (this.mapHots[i].img_width) {
              imgSizeS = this.mapHots[i].img_width;
            }
            this.setHot(imgSizeS, winWidth, this.mapHots[i].map_hot, 'planetmap' + (parseInt(this.mapHots[i].map_id) - 1));
          }
          if (this.mapHots[i].map_id && this.mapHots[i].map_url) {
            const dom = document.getElementById('planetmap' + (parseInt(this.mapHots[i].map_id) - 1));
            if (dom) {
              dom.childNodes[0].setAttribute('href', this.mapHots[i].map_url);
            }
          }
        }
//        console.log('mapHots',this.mapHots)
      },
      // 设置链接热点
      setHot (imgSize, defaultSize, hot, id) {
        const map = document.getElementById(id);
        if (map) {
          let areaNodes = map.childNodes;
          for (let index = 0;index < areaNodes.length;index++) {
            const newcoords = this.hotArea(hot[index], defaultSize / imgSize);
            areaNodes[index].setAttribute("coords", newcoords);
          }
        }
      },
      hotArea (obj, initS) {
        let htm = '';
        for (let i = 0; i < obj.length; i += 1) {
          if (i === (obj.length - 1)) {
            htm += obj[i] * initS;
          } else {
            htm += obj[i] * initS;
            htm += ',';
          }
        }
        return htm;
      }
    },
    computed: {
      detailImgFileList () {
        return this.$store.state.detailImg.detailImgFileList;
      },
      absoluteDetailImgUrls () {
        let arr = [];
        for (let i = 0; i < this.detailImgFileList.length; i++) {
          let obj = {};
          if (this.$route.name == 'templateExport' || this.$route.name == 'templateFillExport') {
            obj.image_url = Config.image_url + this.detailImgFileList[i].image_url;
          } else {
            obj.image_url = Config.img_prev_url + this.detailImgFileList[i].image_url;
          }
          // if (this.mapHots.length && this.mapHots[i]) {
          //   console.log('absoluteDetailImgUrls', this.mapHots);
          //   if (this.mapHots[i].map_url === undefined || this.mapHots[i].map_url === null) {
          //     obj.mapUrl = '';
          //   } else {
          //     obj.mapUrl = this.mapHots[i].map_url;
          //   }
          // }
          arr.push(obj);
        }
        return arr;
      },
      isShow () { // 监控detailImgFileList变化控制replace-img显示
        if (this.detailImgFileList.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      mapHots () {
        // console.log('detailImg', this.$store.state.detailImg.mapHots)
        return this.$store.state.detailImg.mapHots;
      }
    }
  };
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
    display: block;
    vertical-align: bottom;
  }
  .charges-info {
    font-size: 0;
    img {
      width: 100%;
      display: block;
      vertical-align: bottom;
    }
    .map-container {
      position: relative;
      .map-point {
        position: absolute;
      }
    }
  }
  .replace-img{
    border:3px solid #4ca9d4;
    text-align:center;
    padding:10px;
  span{
    border:1px dashed #4ca9d4;
    display: inline-block;
    width:100%;
    text-align:center;
    font-size: 30px;
    line-height: 120px;
    color:#4ca9d4;
  }
  &.show{
     display:block;
   }
  &.hide{
     display:none;
   }
  }
</style>
