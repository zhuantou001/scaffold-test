<template id="pageWords">
  <div class="assembly" :class="{packUp: isSpread}">
    <h3 @click="spread">
      <i class="el-icon-edit"></i> 热力图
      <a class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></a>
      <a class="del-component" @click="deleteFun">
        <i class="el-icon-delete"></i>
      </a>
    </h3>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>图片大小</label>
        <p style="color: rgb(255, 0, 0); font-size: 12px;">对应psd的大小</p>
      </el-col>
      <el-col :span="18">
        <el-input v-model="imgWidth" placeholder="输入图片大小：例如640"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>配置区域坐标</label>
        <p style="color: rgb(255, 0, 0); font-size: 12px;">(x1,y1,x2,y2)规定热点区域左上角和右下角的坐标。</p>
      </el-col>
      <el-col :span="18">
        <el-input v-model="mapHot" placeholder="输入例如：152, 335, 310, 365"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>超链接图片序号</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="mapId" placeholder="请输入详情图片序号" :min="1" :maxlength="2"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <label>超链接</label>
      </el-col>
      <el-col :span="18">
        <el-input v-model="mapUrl" placeholder="请输入链接跳转地址"></el-input>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import deleteComponent from '../../common/common';
export default {
  data() {
    return {
      isSpread: true,
      obj: { component_id: this.index },
    };
  },
  props: ["index"],
  mounted () {
    let arr = this.$store.state.detailImg.mapHots;
    let has = true;
    for (let i = 0;i < arr.length;i++) {
      if (arr[i].component_id === this.index){
        this.obj = arr[i];
        has = false;
      }
    }
    if (has) {
      arr.push(this.obj);
    }
    this.$store.commit('newMapHots', arr);
  },
  methods: {
    mapHots() {
      // 找到对应的按钮索引位置，更新数据
      let has = false;
      let arr = this.$store.state.detailImg.mapHots;
      for (let i in arr) {
        if (arr[i].component_id === this.index) {
          arr.splice(i, 1, this.obj);
          has = true;
        }
      }
      if (!has) {
        arr.push(this.obj);
      }
      // console.log("buttons method", arr);
      this.$store.commit("newMapHots", arr);
    },
    commonGet(key, value) {
      let arr = this.$store.state.detailImg.mapHots;
      // console.log(arr);
      for (let i in arr) {
        if (arr[i].component_id === this.index) {
          if (arr[i][key] !== undefined) {
            return arr[i][key];
          } else {
            return value;
          }
        }
      }
    },
    deleteFun() {
      this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index, 'detailImg', 'mapHots', 'newMapHots');
    },
    // 展开收起
    spread () {
      if (this.isSpread) {
        this.isSpread = false;
      } else {
        this.isSpread = true;
      }
    },
    trim (str) {
      return str.replace(/\s/g, '');
    }
  },
  watch: {
  },
  computed: {
    mapHot: {
      get() {
        return this.commonGet("map_hot", "");
      },
      set(value) {
        this.obj.map_hot = [this.trim(value).split(',')];
        this.mapHots();
      }
    },
    imgWidth: {
      get() {
        return this.commonGet("img_width", "");
      },
      set(value) {
        this.obj.img_width = parseInt(value);
        this.mapHots();
      }
    },
    mapId: {
      get() {
        return this.commonGet("map_id", "");
      },
      set(value) {
        this.obj.map_id = value;
        this.mapHots();
      }
    },
    mapUrl: {
      get() {
        return this.commonGet("map_url", "");
      },
      set(value) {
        this.obj.map_url = value;
        this.mapHots();
      }
    },
    setComponentsItems() {
      return this.$store.state.app.setComponentsItems;
    },
    getComponentsItems() {
      return this.$store.state.app.getComponentsItems;
    }
  },
  components: {
    deleteComponent
  }
};
</script>

<style lang="scss" scoped>

</style>
