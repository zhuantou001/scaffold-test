<template>
	<span>
    <section v-show="showNumBox" id="number-popup" class="popup number">
			<div class="content">
				<div class="search">
					<input id="search" type="tel" maxlength="11" class="search-input" placeholder="生日、幸运数字等">
					<a id="search-btn" href="javascript:;" class="search-btn"></a>
					<a id="search-close-btn" href="javascript:;" class="search-close-btn" hidden>
						<i>×</i>
					</a>
				</div>
				<div class="number-wrap">
					<ul class="number-list">
            <li><a>123123123</a></li>
            <li><a>123123123</a></li>
					</ul>
					<div class="timeOut" hidden>网络超时，请
						<a id="toRefresh" href="javascript:;">点击刷新</a>
					</div>
					<div class="number-loading" hidden>正在加载，请稍后... ...</div>
					<p class="no-number" hidden>抱歉，没有找到相关号码，请重新筛选。</p>
				</div>
				<a id="refresh" href="javascript:;" class="refresh" :style="{color:majorColor}">换一批</a>
				<div class="occupyTips" hidden>
					<p>正在为您预占号码... <br />号码选定后请在30分钟内下单</p>
				</div>
			</div>
			<a class="popup-close" href="JavaScript:;" @click="$emit('close')" data-type="2"></a>
		</section>
    <div class="mask" v-show="showNumBox" @click="$emit('close')"></div>
	</span>
</template>


<script>
export default {
	name: 'number-popup',
	data() {
		return {
		};
	},
  props: ['showNumBox'],
	computed: {
    majorColor () {
      return this.$store.state.fill.pageNature[0].majorColor;
    }
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
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
	.no-bottom {
		padding-bottom: 0 !important;
	}
	.content {
		background-color: #fff;
		padding-bottom: 20px;
		border-radius: 5px;
		position: relative;
		.occupyTips {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2000;
			background: transparent;
			p {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				padding: 10px;
				width: 210px;
				font-size: 14px;
				line-height: 20px;
				color: #fff;
				background: #323232;
				text-align: center;
				border-radius: 4px;
			}
		}
		.p-title {
			font-size: 17px;
			color: $theme;
			text-align: center;
			margin: 0;
			font-family: PingFangSC-Regular;
		}

		.popup-icon {
			display: block;
			margin: 0 auto 10px;
			padding-top: 15px;
			height: 60px;
		}
		.point-list {
			padding: 0 10px;
			margin-top: 15px;
			font-family: PingFangSC-Regular;
			.point {
				color: #787878;
				font-size: 14px;
				line-height: 20px;
				padding-left: 15px;
				margin-bottom: 10px;
				background-size: 12px;
				span {
					color: $theme;
				}
			}
		}
		.referee {
			line-height: 35px;
			text-align: center;
			.to-referee {
				display: block;
				text-align: center;
				color: #7a97c3;
				font-size: 12px;
			}
			.referee-message {
				display: inline-block;
				width: 180px;
				line-height: 33px;
				border-radius: 4px;
				border: 1PX solid #ccc;
				font-size: 12px;
				padding: 0 10px;
			}
			.submit-referee {
				display: inline-block;
				width: 60px;
				line-height: 35px;
				border-radius: 4px;
				margin-left: 9px;
				background: #7a97c3;
				font-size: 12px;
				color: #fff;
			}
			.grey {
				background: #d3d3d3;
			}
			.referee-error {
				display: none;
				line-height: 20px;
				color: #ff3021;
				padding-left: 12px;
				text-align: left;
				font-size: 12px;
			}
			.referee-success {
				display: none;
				text-align: center;
				color: #7a97c3;
				font-size: 12px;
			}
		}
		.popup-title {
			font-size: 18px;
			text-align: center;
			line-height: 35px;
			color: #ffb401;
		}
		.popup-desc {
			padding: 0 12px;
			margin-bottom: 15px;
			font-size: 14px;
			color: #666;
			line-height: 20px;
			font-family: PingFangSC-Regular;
			span {
				color: $theme;
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
	.btn-choose-again {
		margin-top: 15px;
		.btn {
			display: block;
			margin: 0 auto;
			width: 265px;
			height: 41px;
			line-height: 41px;
			font-size: 16px;
			color: #fff;
			text-align: center;
			text-decoration: none;
			background: $theme;
			font-family: PingFangSC-Regular;
		}
	}
	.btn-box {
		margin-top: 15px;
		padding: 0 12px;
		.btn {
			display: block;
			width: 100%;
			height: 39px;
			line-height: 39px;
			background-color: $theme;
			font-size: 15px;
			color: #FFF;
			text-align: center;
			text-decoration: none;
			border-radius: 3px;
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
				color: #FFF!important;
			}
		}
	}
	&.number {
		.content {
			padding-top: 12px;
			padding-bottom: 0;
		}
		.search {
			padding: 0 12px;
			height: 43px;
			position: relative;
			.search-input {
				width: 100%;
				height: 100%;
				line-height: 23px;
				border: 1PX solid #dddddd;
				outline: none;
				padding: 9px 41px 9px 14px;
				font-size: 14px;
				box-sizing: border-box;
				border-radius: 3px;
				&::-webkit-input-placeholder {
					color: #888;
				}
				&::-moz-placeholder,
				&:-moz-placeholder {
					color: #888;
				}
				&:-ms-input-placeholder {
					color: #888;
				}
			}
      .search-btn {
        position: absolute;
        top: 1PX;
        right: 13px;
        width: 41px;
        height: 41px;
      &::before {
         content: '';
         position: absolute;
         top: 10px;
         left: 11px;
         width: 12px;
         height: 12px;
         border: 1PX solid #ddd;
         border-radius: 50%;
       }
      &::after {
         content: '';
         position: absolute;
         top: 24px;
         left: 21px;
         width: 9px;
         height: 2px;
         background-color: #ddd;
         transform: rotate(45deg);
       }
      }
			.search-close-btn {
				position: absolute;
				top: 1PX;
				right: 13px;
				width: 41px;
				height: 41px;
				i {
					display: block;
					width: 18px;
					height: 18px;
					position: relative;
					margin: 0 auto;
					top: 11px;
					img {
						width: 100%;
					}
				}
			}
		}
		.number-wrap {
			padding: 10px 0;
			.timeOut {
				height: 79px;
				padding-top: 136px;
				background: url("../../../assets/overtime.png") 50% 66px no-repeat;
				background-size: 60px;
				text-align: center;
				font-size: 13px;
				color: #969696;
				a {
					font-size: 13px;
					color: $theme;
				}
			}
			.number-loading {
				height: 79px;
				background: url("../../../assets/loading.gif") 50% 66px no-repeat;
				background-size: 50px 50px;
				text-align: center;
				color: #969696;
				font-size: 13px;
				padding-top: 136px;
			}
			.no-number {
				line-height: 200px;
				font-size: 14px;
				padding: 0 12px;
				color: #888;
				text-align: center;
				.error-code {
					font-size: 10px;
					transform: scale(0.7);
					transform-origin: left;
					white-space: nowrap;
					display: inline-block;
				}
			}
			.number-list {
				overflow: hidden;
				margin: 0 12px;
				li {
					display: block;
					height: 38px;
					line-height: 28px;
					font-size: 17px;
					float: left;
					width: 50%;
					box-sizing: border-box;
					text-align: left;
					a:nth-child(2) {
						margin-top: -12px;
					}
					a {
						display: block;
						width: 100%;
						height: 37px;
						font-size: 14px;
						color: #333;
						padding-left: 12px;
						box-sizing: border-box;
						i {
							font-style: normal;
							font-size: 12px;
							transform: scale(0.833);
							transform-origin: left;
							background: $theme;
							color: #fff;
							vertical-align: bottom;
							margin-left: 4px;
							padding: 1px;
							border-radius: 2px;
						}
						span {
							display: block;
							float: left;
							margin-top: -15px;
							color: #949494;
							font-size: 10px;
							transform: scale(0.833);
							transform-origin: left;
							margin-left: 3px;
						}
						.such {
							display: inline-block;
							margin-top: 1px;
							color: #949494;
							font-size: 17px;
							margin-left: 0px;
							float: none;
						}
					}
				}
				.nobottom {
					border-bottom: none;
				}
			}
			.noborder {
				border: none !important;
			}
			.alignLeft {
				li {
					a {
						text-align: left;
					}
				}
			}
		}
		.refresh {
			display: block;
			border-top: 1PX solid #ddd;
			text-align: center;
			line-height: 42px;
			height: 42px;
			font-size: 14px;
			text-decoration: none;
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
</style>
