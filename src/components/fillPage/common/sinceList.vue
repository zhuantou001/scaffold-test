<template>
	<span>
		<section id="since" v-if="showSinceFlag" class="popup">
			<div class="since-content">
				<h3 class="title" v-html="sinceTitle"></h3>
				<ul>
					<!-- <li v-for="(item, index) in sinceList.selfFetchInfo" @click="getSelfFetchInfo(item,index)">
								<input type='radio' name='mall' :id='"radio"+index' :class="{'checked':isChecked == index}" :value='item.ADDRESS_ID'>
								<label :for='"radio"+index' class='em'>{{item.SELFGET_NAME}}：</label>
								<label :for='"radio"+index' class='margin'>{{item.SELFGET_ADDRESS}}</label>
							</li> -->
					<li>
						<input type='radio' name='mall' checked>
						<label for='1' class='em'>金融街营业厅：</label>
						<label for='1' class='margin'>北京西城区金融街21号 北京西城区金融街21号</label>
					</li>
					<li>
						<input type='radio' name='mall'>
						<label for='1' class='em'>金融街营业厅：</label>
						<label for='1' class='margin'>北京西城区金融街21号</label>
					</li>
					<li>
						<input type='radio' name='mall'>
						<label for='1' class='em'>金融街营业厅：</label>
						<label for='1' class='margin'>北京西城区金融街21号</label>
					</li>
				</ul>
			</div>
			<div class="SinceOrNo">
				<a class="sinceBtn" href="JavaScript:;">营业厅自提</a>
				<a class="noSince" href="JavaScript:;">不自提，物流配送</a>
				<!-- <a class="sinceBtn" href="JavaScript:;" @click="sinceSubmit">营业厅自提</a>
					                <a class="noSince" href="JavaScript:;" @click="noSinceSubmit">不自提，物流配送</a> -->
			</div>
			<a class="popup-close" @click="popupClose" href="JavaScript:;"></a>
		</section>
	</span>
</template>

<script  type="text/ecmascript-6">

export default {
	data() {
		return {
			sinceTitle: '您填写的配送区域可到营业厅现场办理:',
			isChecked: 0,
			sinceList: {}, // 自提点列表
			reqSince: {} // 自提点请求参数信息
		}
	},
	components: {},
	props: [],
	//实例初始化最之前，无法获取到data里的数据
	beforeCreate() {
	},
	//在挂载开始之前被调用
	beforeMount() {
	},
	//已成功挂载，相当ready()
	mounted() {
	},
	//相关操作事件
	methods: {
		popupClose: function() {
			this.$store.commit('newShowMask', false);
			this.$store.commit('newSinceFlag', false);
		}
		// 获取选择的自提点
		// getSelfFetchInfo (item,index) {
		//     this.isChecked = index;
		//     this.$store.commit('newSelfFetchCode', item.ADDRESS_ID);
		// },
		// // 获取自提点列表
		// getSince () {
		//     this.reqSince.webProvince = this.$store.state.post.postMessage.postWebProvinceCode;
		//     this.reqSince.webCity = this.$store.state.post.postMessage.postCityCode;
		//     this.reqSince.webCounty = this.$store.state.post.postMessage.postDistrictCode;
		//     this.reqSince.goodsId = this.$store.state.other.goodsId;
		//     this.reqSince.essProvince = this.$store.state.num.numMessage.numAreaProvinceCode;
		//     // 号码归属地跟邮寄地址不一致直接提交
		//     if (this.$store.state.num.numMessage.numAreaCityCode !== this.$store.state.post.postMessage.postCityEssCode) {
		//         Bus.$emit('getSubmit',[false,true]);
		//     } else {
		//         $.ajax({
		//             type: 'post',
		//             url: '/king/kingNumCard/selfFetch',
		//             data: this.reqSince,
		//             success: (resp) => {
		//                 if (resp.selfFetchFlag === '1') { // 有自提点
		//                     document.getElementsByTagName('html')[0].className = 'no-scroll';
		//                     this.$store.commit('newSinceFlag', true);
		//                     this.$store.commit('newMaskFlag', true);
		//                     this.sinceTitle = '您填写的配送区域可到现场办理：';
		//                     this.sinceList = {};
		//                     this.sinceList = resp;
		//                     this.$store.commit('newSelfFetchCode', resp.selfFetchInfo[0].ADDRESS_ID);
		//                 }
		//                 if (resp.selfFetchFlag === '0') { // 无自提点直接提交
		//                     Bus.$emit('getSubmit',[false, true]);
		//                 }
		//             },
		//             error: () => {
		//                 Bus.$emit('getSubmit',[false, true]);
		//             },
		//         });
		//     }
		// },
		// sinceSubmit () {
		//     if (!this.sinceRequestFlag) {
		//         return;
		//     }
		//     this.$store.commit('newSinceRequestFlag', false);
		//     Bus.$emit('getSubmit',[true, false]);
		// },
		// noSinceSubmit () {
		//     if (!this.sinceRequestFlag) {
		//         return;
		//     }
		//     this.$store.commit('newSinceRequestFlag', false);
		//     Bus.$emit('getSubmit',[false, true]);
		// }
	},
	watch: {
	},
	computed: {
		showSinceFlag() {
			return this.$store.state.commonFill.showSinceFlag;
		}
		// 自提弹框地址是否展示
		// sinceFlag () {
		//     return this.$store.state.other.sinceFlag;
		// },
		// // 请求并发限制
		// sinceRequestFlag () {
		//     return this.$store.state.other.sinceRequestFlag;
		// },
	},
	created() {
		// 获取自提点弹框
		// Bus.$on('sendSince', () => {
		//     this.getSince();
		// });
	}
}
</script>

<style lang='scss' scoped>
$bg: #f7f7f7;
$font: #333;
$theme: #ec6e18;
$error: #ff3021;
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
}

#since {
	.since-content {
		background-color: #fff;
		padding: 20px 20px 15px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		.title {
			font-size: 13px;
			color: #787878;
			font-weight: 100;
			line-height: 18PX;
			i {
				font-style: normal;
				color: $theme;
			}
		}
		ul {
			max-height: 140px;
			overflow-y: auto;
			list-style: none;
			li {
				position: relative;
				font-size: 13px;
				margin-bottom: 3px;
				color: #787878;
				overflow: hidden;
				zoom: 1;
				// padding-left: 17px;
				padding-left: 22px;
				line-height: 22px;
				label {
					line-height: 15px;
					vertical-align: top;
					padding: 0;
					margin: 0;
				}
				.em {
					font-style: normal;
					font-weight: bold;
				}
				// .margin {
				// 	margin-left: -5px;
				// }

				input {
					background: url(../../../assets/radio_2.png) 50% no-repeat;
					background-size: 13px;
					position: absolute;
					top: 0;
					left: 0;
					width: 14px;
					height: 14px;
					padding-right: 2PX;
					display: inline-block;
					&:checked {
						background: url(../../../assets/radio_1.png) 50% no-repeat;
						background-size: 13px;
					}
				}
			}
		}
	}
	.SinceOrNo {
		background-color: #fff;
		height: 43px;
		box-sizing: border-box;
		border-top: 1PX solid #c8c8c8;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		a {
			display: inline-block;
			height: 43px;
			width: 50%;
			text-decoration: none;
			box-sizing: border-box;
			font-size: 14px;
			line-height: 43px;
			float: left;
			text-align: center;
		}
		.sinceBtn {
			border-right: 1PX solid #c8c8c8;
			color: #3bb7eb;
			font-weight: bold;
			border-bottom-left-radius: 5px;
		}
		.noSince {
			color: #787878;
			border-bottom-right-radius: 5px;
		}
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

.popMask {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 1001;
	background: rgba(0, 0, 0, .7);
}
</style>