<template>
	<span>
    <section v-show="showNumBox" id="number-popup" class="popup number">
			<div class="content">
				<div class="search">
					<input id="search" type="tel" v-model="searchContent" class="search-input" placeholder="生日、幸运数字等">
					<a id="search-btn" href="javascript:;" class="search-btn" @click="search" v-show="searchShow"></a>
					<a id="search-close-btn" href="javascript:;" class="search-close-btn" @click="clearSearch"  v-show="searchClear">
						<i>×</i>
					</a>
				</div>
				<div class="number-wrap">
          <!--<p class="no-num" v-show="initNoNumber">无号码</p>-->
					<ul class="number-list" v-show="showNum">
            <li v-for="item in telList"><a data-niceRule='item.niceRule' data-monthLimit='item.monthLimit' @click="occupyF(item.number, item.niceRule, item.monthLimit)"><span class="numberStyle" v-html="item.number"></span><i :style="{backgroundColor:majorColor}" v-if="item.niceRule === 1">靓</i></a></li>
          </ul>

					<div class="timeOut"  v-show="timeOut"><timeOutIcon class="timeOutIcon" :v_id="testId2" :v_color="testColor2"></timeOutIcon>网络超时，请
						<a id="toRefresh" :style="{color: majorColor}" href="javascript:;" @click="refresh">点击刷新</a>
					</div>
					<div class="number-loading" v-show="loading"><loadingIcon></loadingIcon>正在加载，请稍后... ...</div>
					<p class="no-number" v-show="noData" v-html="noDataContent"></p>
				</div>
				<a id="refresh" href="javascript:;" class="refresh" @click="refresh" :style="{color:majorColor}" v-html="refreshText"></a>
				<div class="occupyTips"  v-show="occupy">
					<p>正在为您预占号码... <br />号码选定后请在30分钟内下单</p>
				</div>
			</div>
			<a class="popup-close" href="JavaScript:;" @click="$emit('close')" data-type="2"></a>
		</section>
    <div class="mask" v-show="showNumBox" @click="$emit('close')"></div>
	</span>
</template>


<script>
import "../common/fillFunction";
import loadingIcon from "../../tabImg/loadingIcon";
import timeOutIcon from "../../tabImg/timeOutIcon";
export default {
  name: "number-popup",
  data() {
    return {
      stateObj: {},
      testId2: 'timeOutId',
      numberParam: {}  // 号码查询参数
    };
  },
  props: ["showNumBox"],
  mounted() {},
  watch: {
    searchContent () {
      this.$store.commit('newSearchShow', true);
      this.$store.commit('newSearchClear', false);
    },
    showNumBox () {
      if (this.showNumBox) {
        this.clearSearch();
      }
    }
  },
  methods: {
    setNumberParam () {
      this.numberParam.list = [];
      this.numberParam.current = 1;
      this.numberParam.size = 10;
      this.numberParam.max = 1;
      this.numberParam.proGroupNum = this.initData.proGroupNum;
      this.numberParam.goodsId = this.initData.goodsId;
    },
    setNumber () {
      this.setNumberParam();
      // 初始化 (showNum, loading, noData, timeOut, initNoNumber)
      this.setNumberBoxState(false, false, false, false, false);
      const provinceCode = this.$store.state.fill.chooseArea[0].curProvinceCode;
      const cityCode = this.$store.state.fill.chooseArea[0].curCityCode;
      const searchContent = this.$store.state.fillInfo.searchContent;
//       console.log(JSON.stringify(this.numberParam));
      const param = {
        provinceCode: provinceCode,
        cityCode: cityCode,
        monthFeeLimit: 0,
        groupKey: this.numberParam.proGroupNum[provinceCode],
        searchCategory: 3,
        net: '01',
        amounts: 200,
        codeTypeCode: '',
        searchValue: searchContent,
        qryType: '02',
        goodsNet: 4
      };
      // console.log('param: ' + JSON.stringify(param));
      this.$store.commit('newLoading', true);
      if (param.groupKey) {
        this.$http.jsonp('/NumApp/NumberCenter/qryNum',
          { // 请求参数
            params: param,
            jsonp: 'callback',
            jsonpCallback: 'jsonp_queryMoreNums'
          }).then(function (res) {
          // console.log(JSON.stringify(res.body));
          this.decompress(res.body);
        }, function () {
          // console.log('服务器错误');
        });
      } else {
        // this.failMsg('抱歉，没有找到相关号码，请重新筛选');
        this.$store.commit('newTelList', []);
        this.setNumberBoxState(false, false, true, false, false);
        this.$store.commit('newNoDataContent', '抱歉，没有找到相关号码，请重新筛选');
        this.$store.commit('newRefresh', '换一批');
      }
    },
    decompress (number) {
      // const mlist = ['M2', 'M3', 'M4', 'M5'];
      const _key = this.$store.state.fillInfo.searchContent;
      if (number.numArray.length === 0) {
        if (!_key) {
          this.setNumberBoxState(false, false, true, false, false);
          this.$store.commit('newNoDataContent', '当前选号人数过多，请您稍后再试！<span class="error-code">' + number.code + '</span>');
          this.$store.commit('newRefresh', '再试一次');
        } else {
          this.setNumberBoxState(false, false, true, false, false);
          this.$store.commit('newNoDataContent', '抱歉没有匹配的号码！<span class="error-code">' + number.code + '</span>');
          this.$store.commit('newRefresh', '换一批');
        }
        return;
      }

      this.numberParam.list = [];
      // 是否靓号
      this.numberParam.niceRule = [];
      // 协议期
      this.numberParam.monthLimit = [];
      this.numberParam.current = 1;
      const numArray = number.numArray;
      for (let i = 0; i < numArray.length; i += 12) {
        const numberObj = {};
        if (!_key) {
          numberObj.number = numArray[i];
        } else {
          numberObj.number = numArray[i].toString().replace(new RegExp(`${_key}$`), `<span>${_key}</span>`);
        }
        numberObj.niceRule = numArray[i + 5];
        numberObj.monthLimit = numArray[i + 6];
        this.numberParam.list.push(numberObj);
      }
      this.numberParam.max = Math.ceil(this.numberParam.list.length / this.numberParam.size);
      this.shuffle(this.numberParam.list);
      this.listNumber(this.numberParam);
    },
    listNumber () {
      let showNumList = [];
      if (this.numberParam.list.length === 0) {
        this.$store.commit('newInitNoNumber', true);
        return;
      }
      const _start = (this.numberParam.current - 1) * this.numberParam.size;
      let _end = _start + this.numberParam.size;
      if (this.numberParam.current === this.numberParam.max) {
        _end = this.numberParam.list.length;
      }
      for (let i = _start; i < _end; i += 1) {
        showNumList.push(this.numberParam.list[i]);
      }
      this.numberParam.current += 1;
      // console.log(JSON.stringify(showNumList));
      // console.log(JSON.stringify(numList));
      this.setNumberBoxState(true, false, false, false, false);
      this.$store.commit('newTelList', showNumList);
    },
    search () {
      if (this.searchContent){
        this.$store.commit('newSearchShow', false);
        this.$store.commit('newSearchClear', true);
        this.setNumber();
        this.$nextTick(function () {

        });
      }
    },
    clearSearch () {
      this.$store.commit('newSearchShow', true);
      this.$store.commit('newSearchClear', false);
      this.$store.commit('newSearchContent', '');
      this.setNumber();
    },
    refresh () {
      if (this.numberParam.current > this.numberParam.max) {
        // 重新获取号码
        this.setNumber();
        return;
      }
      this.listNumber();
    },
    // 号码预占
    occupyF (_number, niceRule, monthLimit) {
      // 使用过搜索功能后的号码string类型,有<span>标签
      if (typeof _number === 'string') {
        if (_number.indexOf('<span>')) {
//          console.log('截取前: ' + _number);
          _number = _number.replace('<span>', '');
          _number = _number.replace('</span>', '');
//          console.log('截取后: ' + _number);
          this.occupyNumber(_number, niceRule, monthLimit);
        }
      } else if (typeof _number === 'number') {
//        console.log('预占一下');
        this.occupyNumber(_number, niceRule, monthLimit);
      }

    },
    occupyNumber (number, rule, month) {
      const initData = this.$store.state.fillInfo.initData;
      const hasOccupy = this.$store.state.fill.chooseTel.occupyFlag;
      const provinceCode = parseInt(this.$store.state.fill.chooseArea[0].curProvinceCode);
      const cityCode = parseInt(this.$store.state.fill.chooseArea[0].curCityCode);
      const goodsId = parseInt(`${provinceCode}${initData.goodsId}`);
      this.$store.commit('newGoodsId', goodsId);
      var param = {
        provinceCode: provinceCode,
        cityCode: cityCode,
        numID: number,
        goodsId: goodsId
      };
      if (hasOccupy === 2) {
        const chooseNumResult = {};
        chooseNumResult.number = number;
        this.$emit('close');
        if (rule === 1 && month !== 0) {
          chooseNumResult.month = month;
          chooseNumResult.numberTipsFlag = true;
        } else {
          chooseNumResult.month = 0;
          chooseNumResult.numberTipsFlag = false;
        }
        this.$store.commit('newOccupy', false);
        this.$emit('chooseNumResult', chooseNumResult);
      } else {
        this.$store.commit('newOccupy', true);
        this.$ajax({
        method: "POST",
        url: "/king/kingNumBuy/occupy",
        data: param,
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
            return ret.replace(/&$/, "");
          }
        ]
        }).then((res) => {
          //console.log(JSON.stringify(res));
          if (res.data === 'SUCCESS') {
            console.log('预占成功');
            const chooseNumResult = {};
            chooseNumResult.number = number;
            this.$emit('close');
            if (rule === 1 && month !== 0) {
              chooseNumResult.month = month;
              chooseNumResult.numberTipsFlag = true;
            } else {
              chooseNumResult.month = 0;
              chooseNumResult.numberTipsFlag = false;
            }
            this.$store.commit('newOccupy', false);
            this.$emit('chooseNumResult', chooseNumResult);
          } else  if (res.data === 'OCCUPYFAIL') {
            console.log('当前网络不给力，请在wifi或其他网络环境下重试！');
            this.$store.commit('newSorryTryagain', true);
            this.$store.commit('newShowMask', true);
            this.$emit('close');
            this.$store.commit('newOccupy', false);
          } else {
            this.$store.commit('newSorryTryagain', true);
            this.$store.commit('newShowMask', true);
            this.$emit('close');
            this.$store.commit('newOccupy', false);
            console.log('<span>' + number + '</span>号码已被抢占。');
          }
        }).catch((err) => {
          console.log(err);
          this.$store.commit('newSorryOvertime', true);
          this.$store.commit('newShowMask', true);
          this.$emit('close');
          this.$store.commit('newOccupy', false);
        });
      }
    }
  },
  computed: {
    initData () {
      return this.$store.state.fillInfo.initData;
    },
    majorColor() {
      return this.$store.state.fill.pageNature[0].majorColor;
    },
    telList() {
      return this.$store.state.fillInfo.telList;
    },
    searchContent: {
      get() {
        return this.$store.state.fillInfo.searchContent;
      },
      set(value) {
        this.$store.commit("newSearchContent", value);
      }
    },
    timeOut() {
      return this.$store.state.fillInfo.timeOut;
    },
    loading() {
      return this.$store.state.fillInfo.loading;
    },
    noData() {
      return this.$store.state.fillInfo.noData;
    },
    showNum() {
      return this.$store.state.fillInfo.showNum;
    },
    occupy() {
      return this.$store.state.fillInfo.occupy;
    },
    searchShow() {
      return this.$store.state.fillInfo.searchShow;
    },
    searchClear() {
      return this.$store.state.fillInfo.searchClear;
    },
    initNoNumber() {
      return this.$store.state.fillInfo.initNoNumber;
    },
    refreshText() {
      return this.$store.state.fillInfo.refresh;
    },
    noDataContent() {
      return this.$store.state.fillInfo.noDataContent;
    },
    majorColor() {
      return this.$store.state.fill.pageNature[0].majorColor;
    },
    testColor2() {
      let obj = {};
      obj.colorA = this.majorColor;
      return obj;
    }
  },
  components: {
    loadingIcon,
    timeOutIcon
  }
};
</script>

<style>
  .numberStyle span{
    color:#f00;
  }
</style>

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
      padding: 0 .75rem;
      height: 2.6875rem;
			position: relative;
			.search-input {
				width: 100%;
				height: 100%;
        line-height: 1.4375rem;
        border: 1px solid #ddd;
        outline: none;
        padding: .5625rem 2.5625rem .5625rem .875rem;
        font-size: .875rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: .1875rem;
        -moz-border-radius: .1875rem;
        border-radius: .1875rem;
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
        top: 1px;
        right: .8125rem;
        width: 2.5625rem;
        height: 2.5625rem;
      &::before {
         content: '';
         position: absolute;
         top: .625rem;
         left: .6875rem;
         width: .75rem;
         height: .75rem;
         border: 1PX solid #ddd;
         border-radius: 50%;
       }
      &::after {
         content: '';
         position: absolute;
         top: 1.5rem;
         left: 1.3125rem;
         width: .5625rem;
         height: .125rem;
         background-color: #ddd;
         transform: rotate(45deg);
       }
      }
			.search-close-btn {
				position: absolute;
        top: 1px;
        right: .8125rem;
        width: 2.5625rem;
        height: 2.5625rem;
        text-decoration: none;
        text-align:center;
				i {
					display: block;
					position: relative;
					margin: 0 auto;
          color:#aaa;
          font-size: 1.125rem;
          font-style: normal;
					top: .5rem;
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
				padding: 50px 0;
				/*background: url("../../../assets/overtime.png") 50% 66px no-repeat;*/
				background-size: 60px;
				text-align: center;
				font-size: 14px;
				color: #969696;
				a {
					font-size: 14px;
				}
			}
			.number-loading {
				/*background: url("../../../assets/loading.gif") 50% 66px no-repeat;*/
				background-size: 50px 50px;
				text-align: center;
				color: #969696;
				font-size: 14px;
				padding:50px 0;
			}
			.no-number {
        margin:50px auto;
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
          padding: 0.5rem 0;
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
            font-size: 1rem;
						color: #333;
						box-sizing: border-box;
						i {
							font-style: normal;
              font-size: .75rem;
              font-family: SimSun;
							transform: scale(0.833);
							transform-origin: left;
							color: #fff;
							vertical-align: middle;
							margin-left: 4px;
							padding: 1px;
							border-radius: 2px;
						}
						&>span {
							display: block;
							float: left;
              span {
                color: #3bb7eb;
              }
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
      line-height: 2.625rem;
      height: 2.625rem;
      font-size: .875rem;
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
.popup .number-wrap .number-list li a span span {
  color: #3bb7eb;
}
  .timeOutIcon{
    display:block;
    margin:15px auto;
    width:60px;

  }
</style>
