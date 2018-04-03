<template>
  <div>
    <div class="modal">
      <div class="modal-box">
        <div class="styleTips">
          本预览窗口样式与手机浏览器样式有细微差别,请以导出页面样式为准
        </div>
        <div class="modal-page">
          <templateFillPage></templateFillPage>
        </div>
        <div class="modal-btn">
          <div class="close" @click="close">关闭</div>
          <div class="edit" @click="edit">编辑</div>
          <div class="delete" @click="deleteItem">删除</div>
          <div class="delete" @click="nowEffect">立即生效</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import templateFillPage from '../fillPage/template/template';
  import {Config, ROUTES} from '../common/api';
  import resetFillSubmitVuex from '../common/common';
  export default {
    data () {
      return {
        scrollTop: ''
      };
    },
    props: ['page_id', 'fill_alias'],
    mounted () {
      document.getElementsByClassName('modal-page')[0].addEventListener('scroll', this.getScrollTop);  // 滚动事件监听
    },
    methods: {
      close () {
        this.resetFillSubmitVuex();
        this.$emit('closePage');
      },
      edit () {
        if (this.page_id) {
          this.$router.push('/scaffold/fill');
        } else {
          this.failMsg('获取失败');
        }
      },
      deleteItem () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = Config.api_url + ROUTES.deleteFillOption + '?fill_id=' + this.page_id + '&fill_alias=' + this.fill_alias;
          this.loading = true;
          console.log(url);
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
              this.$emit('closePage');
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
      getScrollTop () {
        this.scrollTop = document.getElementsByClassName('modal-page')[0].scrollTop;
      },
      backToTop () {
        var target = 0;
        clearInterval(timer);
        var timer = setInterval(function () {
          target = document.getElementsByClassName('modal-page')[0].scrollTop;
          target -= Math.ceil(target / 10); // 做减速运动
          document.getElementsByClassName('modal-page')[0].scrollTop = target;
          if (target === 0) {
            clearInterval(timer);
          }
        }, 10);
      },
      nowEffect () {
        const url = Config.api_url + ROUTES.refreshCdnFill + '?fill_alias=' + this.fill_alias;
        this.hasEffect(url);
      },
    },
    computed: {},
    components: {
      templateFillPage
    }
  };
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-box {
    width: 400px;
    height: 568px;
    position: relative;
  }

  .modal-page {
    float: left;
    width: 320px;
    height: 568px;
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    overflow: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &
  ::-webkit-scrollbar {
    width: 0px;
  }

  }

  .modal-btn {
    float: right;

  &>div {
    margin-bottom: 10px;
    background: #fff;
    width: 70px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }

  .close {
    color: #f00;
  }

  }

  .export {

  a {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    color: #333;
  }

  }

  .back {
    opacity: 0;
    position: fixed;
    width: 35px;
    height: 65px;
    bottom: 46px;
    left: 56%;
    background: url('../../assets/backTop.png') no-repeat;
    transition: .5s opacity linear;
    z-index: 9999;
  }

  .back:hover {
    background: url('../../assets/backTop.png') no-repeat 0 -65px;
  }

  .show {
    opacity: 1;
  }
  .styleTips{
    position: absolute;
    top:-45px;
    font-size: 12px;
    color:#f00;
    padding:10px;
    margin-bottom:10px;
    background:#fff;
    opacity: 0.6;
  }
</style>
