<template>
	<span>
		<section id="since" v-show="showSinceFlag" class="popup">
			<div class="since-content">
				<h3 class="title" v-html="sinceTitle"></h3>
				<ul>
					 <li v-for="(item, index) in selfFetchInfo" @click="radioChecked()">
            <input type='radio' name='mall' v-model="isChecked" :id='"radio"+index' :value='item.ADDRESS_ID'>
            <label :for='"radio"+index' class='em'>{{item.SELFGET_NAME}}：</label>
            <label :for='"radio"+index' class='margin'>{{item.SELFGET_ADDRESS}}</label>
          </li>
				</ul>
			</div>
			<div class="SinceOrNo">
				<a class="sinceBtn" :style="{color:majorColor}" href="JavaScript:;" @click="since">营业厅自提</a>
				<a class="noSince" href="JavaScript:;" @click="noSince">不自提，物流配送</a>
			</div>
			<a class="popup-close" @click="popupClose" href="JavaScript:;"></a>
		</section>
    <div class="mask" v-show="showSinceFlag" @click="$emit('close')"></div>
	</span>
</template>

<script  type="text/ecmascript-6">

export default {
	data() {
		return {
		  aa: 0,
			sinceTitle: '您填写的配送区域可到营业厅现场办理',
      isChecked: ''
		}
	},
	components: {},
	props: [],
	mounted () {
	},
	//相关操作事件
	methods: {
	  radioChecked () {
      var names = document.getElementsByName("mall");
      for (var i = 0;i < names.length;i++) {
        if (names[i].checked) {
          names[i].style.backgroundColor = this.majorColor;
          this.isChecked = names[i].value;
        } else {
          names[i].style.backgroundColor = '#fff';
        }
      }
    },
		popupClose: function () {
			this.$store.commit('newSinceFlag', false);
      // 解除禁止页面滚动
			this.$store.commit('newIsScroll', false);
		},
    since () {
      this.$store.commit('newSelfFetchCode', this.isChecked);
      this.popupClose();
			this.$store.commit('newSubmitLoad', true);
			this.$store.commit('newIsScroll', true);
			// 提交数据
      this.submitFillButton();
    },
    noSince () {
      this.$store.commit('newSelfFetchCode', '');
      this.popupClose();
			this.$store.commit('newSubmitLoad', true);
			this.$store.commit('newIsScroll', true);
      // 提交数据
      this.submitFillButton();
    },
    setIsChecked () {
      if (this.selfFetchInfo.length > 0) {
        this.isChecked = this.selfFetchInfo[0].ADDRESS_ID;
        setTimeout(this.radioChecked(), 1000);
      }
    }

	},
	watch: {
    showSinceFlag () {
      this.setIsChecked();
		},
		selfFetchInfo: function() {
			this.$nextTick(function(){
				const input = document.getElementsByName("mall");
				input[0].style.backgroundColor = this.majorColor;
			});
		}
  },
  computed: {
    majorColor () {
      return this.$store.state.fill.pageNature[0].majorColor;
    },
		showSinceFlag () {
			return this.$store.state.commonFill.showSinceFlag;
		},
    selfFetchInfo () {
		  return this.$store.state.fillInfo.selfFetchInfo;
    }
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
			font-size: 14px;
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
				font-size: 14px;
				margin-bottom: 3px;
				color: #787878;
				overflow: hidden;
				zoom: 1;
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

				input {
          border:1px solid;
          border-color:#ccc;
          border-radius:50%;
          padding:2px;
          background-color:#fff;
					/*background: url(../../../assets/radio_2.png) 50% no-repeat;*/
					background-size: 13px;
					position: absolute;
					top: 0;
					left: 0;
					width: 14px;
					height: 14px;
					display: inline-block;
          background-clip:content-box;
					&:checked {
            background-color:#20a0ff;
						/*background: url(../../../assets/radio_1.png) 50% no-repeat;*/
					}
          &.checked {
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

.mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  background: rgba(0,0,0,0.7);
}
</style>
