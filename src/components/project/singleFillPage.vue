<template>
  <div>
    <div class="project-box" @click="previewPage">
      <div class="project-box-con">
        <div class="set" @click.stop="setUp"><i class="el-icon-more"></i></div>
        <img :src="coverImg" @onerror="coverImg" ref="img"/>
      </div>
      <div class="project-box-title">{{name}}</div>
    </div>
    <modalMenu v-if="showModal" @closeModal="showModal=false" :width="260">
      <div slot="body">
        <!-- <div @click="previewPage">预览</div> -->
        <div @click="edit">编辑</div>
        <div @click="deleteItem">删除</div>
        <div @click="nowEffect">立即生效</div>
      </div>
    </modalMenu>

    <fillPreview v-if="showPage" :page_id="id" :fill_alias="fill_alias" @closePage="showPage=false"></fillPreview>

    <loading :show="loading"></loading>

  </div>
</template>


<script>
  import loading from '../loading/Loading';
  import modalMenu from '../common/modalMenu';
  import fillPreview from './fillPreview';
  import {Config, ROUTES} from '../common/api';
  import coverImg from '../../assets/fill-cover.jpg'; // 默认展示图片
  export default {
    name: 'singleProject',
    data () {
      return {
        loading: false,
        dom: null,
        showModal: false,
        showPage: false,
        singleFillData: {},
        coverImg: coverImg
      };
    },
    props: ['id', 'name', 'fill_alias'],
    mounted () {
    },
    methods: {
      setUp () {
        // 点开菜单前先获取数据
        this.hideErrorOther();// 隐藏错误验证
        const url = Config.api_url + ROUTES.queryFillidData + '?fill_id=' + this.id;
        this.loading = true;
        this.$ajax({
          method: 'get',
          url: url
        }).then((res) => {
          if (res.data.resultCode === '0000') {
            this.singleFillData = res.data.data[0];
            localStorage.setItem('singleFillData', JSON.stringify(this.singleFillData));
            this.showModal = true;
          } else  if (res.data.resultCode === '9999') {
            this.failMsg('暂时无数据');
          }
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
          this.loading = false;
        });
      },
      previewPage () {
        this.hideErrorOther();// 隐藏错误验证
        const url = Config.api_url + ROUTES.queryFillidData + '?fill_id=' + this.id;
        this.loading = true;
        this.$ajax({
          method: 'get',
          url: url
        }).then((res) => {
          if (res.data.resultCode === '0000') {
//            console.log(JSON.stringify(res.data.data[0]));
            this.singleFillData = res.data.data[0];
            localStorage.setItem('singleFillData', JSON.stringify(this.singleFillData));
            this.showModal = false;
            this.showPage = true;
            this.obtainFillData(this.singleFillData);
            this.fillPageInit(); // 页面初始化 fillFunction.js

          } else if (res.data.resultCode === '9999') {
            this.failMsg('暂时无数据');
          }
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
          this.loading = false;
        });
      },
      edit () {
        // alert(JSON.stringify(this.singleFillData));
        // 将后台获取到的该项目全部数据存入localStorage
        this.$router.push('/scaffold/fill');
      },
      deleteItem () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = Config.api_url + ROUTES.deleteFillOption + '?fill_id=' + this.id + '&fill_alias=' + this.fill_alias;
          this.loading = true;
          this.$ajax({
            method: 'get',
            url: url
          }).then((res) => {
            // alert(JSON.stringify(res.data.data));
            if (res.data.data.ret_code === '0000') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.loadAll();
            } else if (res.data.data.ret_code === '5555') {
              this.failMsg(res.data.data.ret_msg);
            } else if (res.data.data.ret_code === '9999') {
              this.failMsg('删除失败!');
            }
            // console.log(res.data);
            this.showModal = false;
            this.loading = false;
          }).catch((err) => {
            console.log(err);
            this.failMsg('服务器错误');
            this.loading = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      nowEffect () {
        const url = Config.api_url + ROUTES.refreshCdnFill + '?fill_alias=' + this.fill_alias;
        this.hasEffect(url);
      },
    },
    computed: {
      initUrl () {
        return this.$store.state.fill.pageNature[0].initUrl;
      }
    },
    components: {
      modalMenu,
      fillPreview,
      coverImg,
      loading
    }
  };
</script>

<style lang="scss" scoped>
  .project-box{
    width:180px;
    cursor:pointer;
  .project-box-con{
    position: relative;
    width:180px;
    height:180px;
    background: #fff;
    border:1px solid #eee;
    display: flex;
    justify-content:center;
    align-items:center;
    border-radius:6px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.06);
    .set{
      position: absolute;
      top:10px;
      right:10px;
      i{
        color:#fff;
      }
    }
  img{
    max-width:100%;
    max-height:100%;
  }
  &:hover{
     border:1px solid #37d6ff;
    .set i{
      color:#37d6ff;
    }
   }
  }
  .project-box-title{
    width:100%;
    margin-top:10px;
    line-height: 40px;
    text-align: center;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  }
  .export{
    a{
      display: inline-block;
      width:100%;
      text-decoration: none;
      color:#333;
    }
  }
</style>
