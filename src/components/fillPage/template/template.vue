<template id="templateLandingPage">
	<body :class="{noScroll:isScroll}" id="fillPage">
		<section class="fill-wrapper">
			<div class="fill">
        <h2 id="fill-desc">已选择<span :style="{'color':majorColor}">"{{optionName}}"</span></h2>
        <h2 id="top-desc" class="error" v-show="errorDetail">{{errorDetail}}</h2>
				<div :is="item.component" :index="item.index" v-for="item in getFillComponentsItems"></div>
			</div>
		</section>
	</body>
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
import getKingBroad from '../get/kingBroad';

export default {
	name: 'templateFillPage',
	data() {
		return {
		};
	},
	methods: {
	},
	watch: {
    errorDetail () {
      if (this.errorDetail === '') {
        if (this.getFillComponentsItems[0].component === 'getDescribe') {
          document.getElementsByClassName('describe')[0].style.display = 'block';
        }
      } else {
        if (this.getFillComponentsItems[0].component === 'getDescribe') {
          document.getElementsByClassName('describe')[0].style.display = 'none';
        }
      }
    }
	},
  mounted () {
  },
	computed: {
    isScroll() {
      return this.$store.state.fill.isScroll;
    },
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
    },
    optionName () {
//      return localStorage.getItem("product_name");
      return 'XXX';
    },
    majorColor () {
      return this.$store.state.fill.pageNature[0].majorColor;
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
    getKingBroad
	}
};
</script>

<style lang="scss" scoped>
@import './fill.scss';
html{
  &::-webkit-scrollbar{
    width:0.1px;
   }
}
  body{
    overflow-x: hidden;
  }
  .noScroll{
    overflow:hidden;
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
.fill-wrapper .fill #fill-desc {
  line-height: 2.5rem;
  padding: 0 1.125rem;
  font-size: .8125rem;
  border-bottom: none;
  color:#666;
  margin:0;
}
.fill-wrapper .fill #top-desc{
  line-height: 1.25rem;
  margin:0 1.125rem;
  padding:0 0 0.625rem 0;
  font-size: .75rem;
  color: #888;
}
.fill-wrapper .fill #top-desc.error{
  color: #ff3021;
}
</style>
