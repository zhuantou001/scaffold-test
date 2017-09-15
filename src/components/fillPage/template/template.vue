<template id="templateLandingPage">
	<!DOCTYPE html>
	<html>

	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
		<meta name="format-detection" content="telephone=no" />
		<title>填写页</title>
	</head>

	<body>
		<section class="fill-wrapper">
			<div class="fill">
        <h2 id="top-desc" class="error" v-show="errorDetail">{{errorDetail}}</h2>
				<div :is="item.component" :index="item.index" v-for="item in getFillComponentsItems"></div>
			</div>
		</section>
    <!--正文结束 下面是各种弹框-->
    <div>
		<section id="area" class="sidebar location">
			<ul id="province" class="first-list">
			</ul>
			<ul id="city" class="second-list">
			</ul>
		</section>
		<section id="post" class="sidebar location">
			<ul id="post-city" class="first-list">
			</ul>
			<ul id="post-district" class="second-list">
			</ul>
		</section>
		<section id="number-popup" class="popup number" hidden>
			<div class="content">
				<div class="search">
					<input id="search" type="tel" maxlength="11" class="search-input" placeholder="生日、幸运数字等">
					<a id="search-btn" href="javascript:;" class="search-btn">搜索</a>
					<a id="search-close-btn" href="javascript:;" class="search-close-btn" hidden>
						<i><img src="./images/number-close.png"></i>
					</a>
				</div>
				<div class="number-wrap">
					<ul class="number-list">
					</ul>
					<div class="timeOut" hidden>网络超时，请
						<a id="toRefresh" href="javascript:;">点击刷新</a>
					</div>
					<div class="number-loading">正在加载，请稍后... ...</div>
					<p class="no-number" hidden>抱歉，没有找到相关号码，请重新筛选。</p>
				</div>
				<a id="refresh" href="javascript:;" class="refresh">换一批</a>
				<div class="occupyTips" hidden>
					<p>正在为您预占号码... <br />号码选定后请在30分钟内下单</p>
				</div>
			</div>
			<a class="popup-close" href="JavaScript:;" data-type="2"></a>
		</section>
		<section id="error" class="popup" hidden>
			<div class="content">
				<img class="popup-icon" src="./images/error.png" alt="reserved">
				<p class="popup-title">手慢了!</p>
				<p id="reserved-number" class="popup-desc center">
					<span></span>号码已被抢占。</p>
				<div class="btn-choose-again">
					<a href="javascript:;" class="btn reselect-number">再选一个吧</a>
				</div>
			</div>
			<a class="popup-close" href="JavaScript:;" data-type="2"></a>
		</section>
		<section id="errorAll" class="popup" hidden>
			<div class="content">
				<img class="popup-icon" src="./images/overtime.png" alt="reserved">
				<p class="popup-desc center"></p>
			</div>
			<a class="popup-close" href="JavaScript:;" data-type="3"></a>
		</section>
		<section id="overtime" class="popup" hidden>
			<div class="content">
				<img class="popup-icon" src="./images/overtime.png" alt="overtime">
				<h2 class="popup-title">超时了</h2>
				<p class="popup-desc center">抱歉，请求超时，请再试一次</p>
			</div>
			<a class="popup-close" href="JavaScript:;" data-type="3"></a>
		</section>

		<section id="fail" class="popup" hidden>
			<div class="content">
				<img class="popup-icon" src="./images/overtime.png" alt="fail">
				<p class="popup-title">抱歉</p>
				<p class="popup-desc center">产品销售太火爆啦，请您稍后重试</p>
			</div>
			<a class="popup-close" href="JavaScript:;" data-type="3"></a>
		</section>
		<section id="chooseStyle" class="popup" hidden>
			<div class="content">
				<h2>选择首月资费</h2>
				<div class="jifei">
				</div>
				<div class="tips">
					适合月初开通的用户，按照您选择的套餐正常计费并享受套餐内容，即199元/月。“首月”指号码激活认证成功当月。
				</div>
			</div>
			<a class="popup-close" href="JavaScript:;" data-type="2"></a>
		</section>
    </div>
		<getCommonAlert style='display:none'>
			<div slot='content'>
				<h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, magnam temporibus esse natus, sunt recusandae molestiae quidem ad assumenda illo voluptatum vel ratione, doloremque vitae libero consequatur! Sequi, ut tenetur!</h2>
			</div>
		</getCommonAlert>
		<getSinceList></getSinceList>
		<commonPopup></commonPopup>
		<div class="popMask" v-if='showMask'></div>
	</body>

	</html>
</template>


<script>
import getListTitle from '../get/listTitle';
import getPersonInfo from '../get/personInfo';
import getChooseTel from '../get/chooseTel';
import getFirstMonth from '../get/firstMonth';
import getDeliveryAddress from '../get/deliveryAddress';
import getButton from '../get/button';
import getDescribe from '../get/describe';
import getProtocol from '../get/protocol';
import getCommonAlert from '../common/commonAlert';
import getSinceList from '../common/sinceList';
import commonPopup from '../common/commonPopup';
export default {
	name: 'templateFillPage',
	data() {
		return {
		};
	},
	methods: {
	},
	watch: {
	},
	computed: {
		getFillComponentsItems() {
			return this.$store.state.fill.getFillComponentsItems;
		},
		showMask() {
			return this.$store.state.commonFill.showMask;
		},
    errorDetail() {
		  if (this.$store.state.fill.isError.length > 0) {
        return this.$store.state.fill.isError[0].errorDetail;
      } else {
        return '';
      }
    }
	},
	components: {
		getListTitle,
		getPersonInfo,
		getChooseTel,
		getFirstMonth,
		getDeliveryAddress,
		getButton,
		getDescribe,
		getProtocol,
		getCommonAlert,
		getSinceList,
		commonPopup
	}
};
</script>

<style lang="scss" scoped>
@import './fill.scss';
  body{
    max-width:640px;
  }
  .image-show{
    display:block;
  }
  .image-hide{
    display:none;
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

body {
	max-width: 640px;
}

.image-show {
	display: block;
}

.image-hide {
	display: none;
}
</style>
