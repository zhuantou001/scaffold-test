<template>
	<span>
    <section v-show="showFirstBox" id="firstMonth-popup" class="popup number">
			<div class="content">
        <h2>选择首月资费</h2>
         <div class="jifei">
           <p v-for="(item, index) in firstMonthData">
             <label>{{item.context}}
              <input type="radio" name="firstMonthRadio" :id="item.key" :value="item.key" @click="changeItem(index)" v-model="defaultItem.key">
             </label>
           </p>
         </div>
         <div class="tips">
           {{firstTips}}
         </div>
			</div>
			<a class="popup-close" href="JavaScript:;" @click="$emit('close')" data-type="2"></a>
		</section>
    <div class="mask" v-show="showFirstBox" @click="$emit('close')"></div>
	</span>
</template>

<script>
import '../common/fillFunction';

export default {
	data() {
		return {
      defaultItem: [],
      firstTips: ''
		};
	},
  props: ['showFirstBox'],
  mounted () {
    this.changeItem();
  },
  methods: {
    changeItem (index) {
      if (this.firstMonthData) {
        if (!index) {
          index = 0;
        }
        this.defaultItem = {};
        this.defaultItem.key = this.firstMonthData[index].key;
        this.defaultItem.context = this.firstMonthData[index].context;
        let arr = [];
        arr.push(this.defaultItem);
        this.$store.commit('newFirstMonthChooseData', arr);
        // 存入提交的数据firstMonth
        this.$store.commit('newFirstMonth', this.firstMonthData[index].key);
  //      console.log(JSON.stringify(this.defaultItem));
        if (this.defaultItem.key === 'A000011V000001') {
          this.firstTips = '适合月初开通的用户，按照您选择的套餐正常计费并享受套餐内容，即199元/月。“首月”指号码激活认证成功当月。';
        } else if (this.defaultItem.key === 'A000011V000003') {
          this.firstTips = '适合月底开通的用户，开通当月按照标准资费依据使用量进行计费，即国内语音拨打0.15元/分钟收费，不足一分钟按一分钟计算，国内流量按0.27元/MB，累计至10元，按照10元100M计费，101M起继续按照0.27元/MB计费，累计至5元时不再收费，直至1GB，即15元1GB，以后依次类推。从次月起恢复正常。“首月”指号码激活认证成功当月。';
        }
      }
    }
  },
	computed: {
    firstMonthData () {
      let arr = this.$store.state.fillInfo.firstMonthData;
      if (arr.lenght > 0) {
        let arrData = [];
        for (let i = 0; i < arr.length; i++) {
          for (let key in arr[i]) {
            let obj = {};
            obj.key = key;
            obj.index = i;
            obj.context = arr[i][key];
            arrData.push(obj);
//          console.log('key: ' + key + ' context: ' + arr[i][key]);
          }
        }
        return arrData;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #f7f7f7;
$font: #333;
$theme: #ec6e18;
$error: #ff3021;
body,html{height:100%;overflow:hidden;}
.popup {
	width: 100%;
	padding: 0 12px;
	background-color: transparent;
	z-index: 1003;
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	.content {
		background-color: #fff;
		padding: .0625rem 1.625rem 0;
		border-radius: 5px;
		position: relative;
h2{
  text-align: center;
  font-size: 16px;
  color: #333;
  font-family: "PingFang SC Regular" , "Adobe Heiti Std", "Helvetica", "Arial", sans-serif;
}
.jifei{
p{
  position: relative;
  height: 40px;
  line-height: 40px;
label{
  font-size: 14px;
  float: left;
  height: 40px;
  width: 100%;
  display: inline-block;
  text-align: left;
}
input{
  border:1px solid #aaa;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  width: 16px;
  height: 16px;
  margin-top: -7px;
  display: inline-block;
  padding:2px;
&:checked{
   background-color:#ec6e18;
   background-size: 50%;
   background-clip: content-box;
 }
}
&:first-child{
   border-bottom: 1px solid #ddd;
 }
}
}
.tips{
  font-size: 14px;
  color: #888;
  line-height: 20px;
  padding-bottom: 26px;
}
	}
	.popup-close {
		display: block;
		position: absolute;
		bottom: -56px;
		left: 50%;
		margin-left: -13px;
		width: 26PX;
		height: 26PX;
		background: url(../../../assets/closeImg.png) no-repeat;
		background-size: 26PX;
	}
	&.number {
		.content {
			padding-top: 12px;
			padding-bottom: 0;
		}

	}
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  background: rgba(0,0,0,0.7);
}
.popup .number-wrap .number-list li a span span {
  color: #3bb7eb;
}
</style>
