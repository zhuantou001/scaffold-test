
<template>
	<span>
		<!--成功弹框  -->
		<section v-if='succFlag' class="popup">
			<div class='content' id='success' v-html='succContent'>
				<!-- <h2 class="p-title">恭喜您获得唯卡</h2>
										<div class="point-list">
												<p class="point">您的号码为：
														<span>18888888888</span>。我们将尽快为您配送，请您于发货后
														<i>20天内</i>激活，如未激活，号码将被回收哦！</p>
										</div>
										<div class="toLook">
												<p class="point">如需了解更多信息，请关注
														<i v-html="assistant">微信公众号“唯卡助手”</i>，还有更多神秘特权！</p>
												<p class="point">首次下载联通手机营业厅，领取
														<i>300M</i>流量
														<a href="http://u.10010.cn/qAa9l">http://u.10010.cn/qAa9l</a>
												</p>
										</div> -->
			</div>
			<a class="popup-close" @click="popupClose" href="JavaScript:;"></a>
		</section>
		<getCommonAlert id='sorry' v-if='showSorryBuy'>
			<div slot='content'>
				<img class="popup-icon" src="../../../assets/sorry.png" alt="sorry">
				<h2 class="p-title center">抱歉，无购买资格了</h2>
				<div class="point-list">
					<p class="point center">您购买互联网大咖的专属号卡已经超过限制感谢您的关注和支持。</p>
				</div>
			</div>
		</getCommonAlert>
		<getCommonAlert id='sorry1' v-if='showSorryCard'>
			<div slot='content'>
				<img class="popup-icon" src="../../../assets/errorAll.png" alt="sorry">
				<h2 class="p-title center">每张身份证只能办理5张联通卡</h2>
				<div class="point-list">
					<p class="point">活动如此优惠，建议换用家人朋友的证件试试，但记住
						<span class="identity">需要证件本人才能激活</span>哦。</p>
				</div>
			</div>
		</getCommonAlert>
		<getCommonAlert id='fail' v-if='showSorryWait'>
			<div slot='content'>
				<img class="popup-icon" src="../../../assets/overtime.png" alt="fail">
				<p class="popup-title center">抱歉</p>
				<p class="popup-desc center">产品销售太火爆啦，请您稍后重试</p>
			</div>
		</getCommonAlert>
		<getCommonAlert id='overtime' v-if='showOvertime'>
			<div slot='content'>
				<img class="popup-icon" src="../../../assets/overtime.png" alt="overtime">
				<p class="popup-desc1 center">抱歉，请求超时 ，</p>
				<p class="popup-desc center">请您再试一次！</p>
			</div>
		</getCommonAlert>
		<getCommonAlert id='tryAgain' v-if='showTryagain'>
			<div slot='content'>
				<img class="popup-icon" src="../../../assets/error.png" alt="reserved">
				<p class="popup-desc1 center">手慢无!</p>
				<p id="reserved-number" class="popup-desc center">
					<span>------</span>号码已被抢占。</p>
				<div class="btn-box">
					<a id="reselect-number" href="javascript:;" class="btn">再选一个吧</a>
				</div>
			</div>
		</getCommonAlert>
	</span>
</template>

<script>
import getCommonAlert from '../common/commonAlert';
export default {
	name: 'modal',
	data() {
		return {
		};
	},
	props: [],
	computed: {
		succFlag() {
			return this.$store.state.fill.succContent[0].successFlag;
		}, showSorryBuy() {
			return this.$store.state.fill.sorryBuyContent[0].sorryBuyFlag;
		}, showSorryCard() {
			return this.$store.state.fill.sorryCardContent[0].sorryCardFlag;
		}, showSorryWait() {
			return this.$store.state.fill.sorryWaitContent[0].sorryWaitFlag;
		}, showOvertime() {
			return this.$store.state.fill.sorryOvertimeContent[0].sorryOvertimeFlag;
		}, showTryagain() {
			return this.$store.state.fill.sorryTryagainContent[0].sorryTryagainFlag;
		},
		succContent() {
			return this.$store.state.fill.succContent[0].succDes;
		}
	},
	methods: {
		popupClose: function() {
			this.$store.commit('newSuccFlag', false);
			this.$store.commit('newShowMask', false);
		}
	},
	components: {
		getCommonAlert
	}
};
</script>

<style lang="scss" scoped>
$theme:#F39801;
.popMask {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 1001;
	background: rgba(0, 0, 0, .7);
}

.center {
	text-align: center;
}

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
		padding: 20px;
		border-radius: 5px;
		position: relative;
		text-align: center;
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
}

.p-title {
	color: $theme;
	font-size: 19px;
}

#success {
	.p-title {
		padding-top: 25px;
		color: #7a97c3;
		font-size: 18px;
		text-align: center;
	}
	.point {
		font-size: 13px;
		padding: 0 15px;
		text-align: center;
	}
	.toLook {
		.point {
			width: 68%;
			margin: 20px auto;
			line-height: 20px;
			color: #787878;
			font-size: 13px;
			i {
				font-style: normal;
				color: #f50f5b;
				font-size: 13px;
			}
		}
		.ewm {
			display: block;
			width: 32%;
			height: auto;
			margin: 0 auto;
		}
	}
}

.protocol-desc::-webkit-scrollbar-track-piece {
	background-color: rgba(0, 0, 0, 0);
	border-left: 1PX solid rgba(0, 0, 0, 0);
}

.protocol-desc::-webkit-scrollbar {
	width: 5px;
	height: 13px;
	border-radius: 5px;
}

.protocol-desc::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, 0.5);
	background-clip: padding-box;
	border-radius: 5px;
	min-height: 28px;
}

.protocol-desc::-webkit-scrollbar-thumb:hover {
	background-color: rgba(0, 0, 0, 0.5);
}

.popup-icon {
	display: block;
	margin: 0 auto;
	padding-top: 25px;
	height: 60px;
}

.point-list {
	padding: 0 10px;
	margin-top: 15px;
	.point {
		color: #787878;
		font-size: 14px;
		line-height: 20px;
		padding-left: 15px;
		margin-top: -10px;
		margin-bottom: 10px;
		background-size: 12px;
		span {
			color: $theme;
		}
	}
}

.popup-title {
	font-size: 18px;
	text-align: center;
	line-height: 45px;
	color: $theme;
}

.popup-desc {
	padding: 0 12px;
	margin-bottom: 15px;
	font-size: 14px;
	color: #787878;
	line-height: 20px;
	span {
		color: $theme;
	}
}

.popup-desc1 {
	padding: 0 12px;
	margin-top: 19px;
	font-size: 14px;
	color: #787878;
	line-height: 20px
}

.btn-box {
	padding: 0 20px;
	.btn {
		display: block;
		width: 100%;
		// height: 48px;
		line-height: 40px;
		font-size: 15px;
		text-align: center;
		text-decoration: none;
		border-radius: 3px;
		background-color: $theme;
		color: #FFF;
		&:link {
			color: #FFF!important;
		}
		&:visited {
			color: #FFF!important;
		}
		&:hover {
			color: #FFF!important;
		}
		&:active {
			background-color: $theme!important;
			color: #FFF!important;
		}
	}
	.disable {
		background-color: #ddd;
		color: #888;
		&:link {
			color: #888!important;
		}
		&:visited {
			color: #888!important;
		}
		&:hover {
			color: #888!important;
		}
		&:active {
			color: #888!important;
			background-color: #ddd!important;
		}
	}
}
</style>    
