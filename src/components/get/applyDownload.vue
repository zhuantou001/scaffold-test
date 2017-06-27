<template id="detailImg">
  <div class="upload-apply">
    <h3>{{applyDownloadTitle}}</h3>
    <div class="applies">
      <a v-for="item in applies" :style="{backgroundImage: 'url(' + item.appliesImgUrl + ')'}"  :href="item.appliesHref">
        <span>{{item.appliesTitle}}</span>
        <button type="button"><span>{{item.appliesButtonText}}</span></button>
      </a>
    </div>
  </div>
<!--  /* {
  appliesImgUrl: 'https://h5.sinaimg.cn/upload/2017/06/01/319/tit2.png',
  appliesImgName: '',
  appliesTitle: '应用标题',
  appliesButtonText: '免流使用',
  appliesHref: 'www.10010.com'} */-->
</template>


<script>
  export default {
    name: 'detailImg',
    data () {
      return {
      };
    },
    watch: {
      detailImgFileList () { // 监控detailImgFileList变化控制replace-img显示
        if (this.detailImgFileList.length > 0) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      }
    },
    methods: {
    },
    computed: {
      applies () {
        return this.$store.state.applyDownload.appliesList;
      },
      applyDownloadTitle () {
        return this.$store.state.applyDownload.applyDownloadTitle;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .upload-apply{
    background: #ececec;
    padding: 15px 20px 43px 20px;
  h3{
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 1PX solid #c3c3c3;
    margin: 0;
  }
  .applies{
    overflow: hidden;
  a{
    font-size: 0;
    display: block;
    float: left;
    width: 25%;
    margin: 14px 0;
    text-decoration: none;
    padding-top: 46px;
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: 35px 35px;
    text-align: center;
  span{
    font-size: 12px;
    line-height: 12px;
    display: block;
    transform: scale(0.9167);
    transform-origin: 50%;
    color: #939393;
    text-align: center;
  }
  button{
    margin-top: 7px;
    background: #fbfbfb;
    border: 1px solid #b5b5b5;
    border-radius: 4px;
    -webkit-user-modify: read-only;
    height: 22px;
    line-height: 22px;
    width: 100%;
    vertical-align: middle;
    padding: 0;
  span{
    color: #7e7e7e;
    font-size: 12px;
    transform-origin: 50%;
    transform: scale(0.8333);
  }
  }
  }
  /*.bg1{background-image: url("./images/video.png");}*/
  }
  }
</style>
