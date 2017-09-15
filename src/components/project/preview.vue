<template>
  <div>
    <div class="modal">
      <div class="modal-box">
        <div class="modal-page">
          <section>
            <a class="back" href='javascript:void(0);' @click='backToTop' title='回到顶部' :class='{show:scrollTop>150}'>
            </a>
          </section>
          <templateLandingPage></templateLandingPage>
        </div>
        <div class="modal-btn">
          <div class="close" @click="$emit('closePage')">关闭</div>
          <div class="edit" @click="edit">编辑</div>
          <!--<div class="edit" @click="exportPage"><router-link>导出</router-link></div>-->
          <div class="export">
            <router-link :to="exportUrl" target="_blank">导出</router-link>
          </div>
          <div class="delete" @click="deleteItem">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import templateLandingPage from '../groundPage/template/template';
import { Config, ROUTES } from '../common/api';
export default {
  data() {
    return {
      exportUrl: '',
      scrollTop: ''
    };
  },
  props: ['page_id', 'page_alias'],
  mounted() {
    this.exportUrl = '/template/' + this.page_alias;
    document.getElementsByClassName("modal-page")[0].addEventListener('scroll', this.getScrollTop);  //滚动事件监听
  },
  methods: {
    edit() {
      if (this.page_id) {
        this.$router.push('/scaffold/ground');
      } else {
        this.failMsg('获取失败');
      }
    },
    deleteItem() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = Config.api_url + ROUTES.deleteScaffolOption + '?page_id=' + this.page_id;
        this.loading = true;
        console.log(url);
        this.$ajax({
          method: 'get',
          url: url
        }).then((res) => {
          // alert(JSON.stringify(res.data.data));
          if (res.data.data.ret_code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$emit('closePage');
            this.loadAll();
          } else {
            this.failMsg(res.data.data.ret_msg);
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
    exportPage() {
      this.$router.push('/template/' + this.page_alias);
    },
    getScrollTop() {
      this.scrollTop = document.getElementsByClassName("modal-page")[0].scrollTop;
    },
    backToTop() {
      var target = 0;
      clearInterval(timer);
      var timer = setInterval(function () {
        target = document.getElementsByClassName("modal-page")[0].scrollTop;
        target -= Math.ceil(target / 10);//做减速运动
        document.getElementsByClassName("modal-page")[0].scrollTop = target;
        if (target == 0) {
          clearInterval(timer);
        }
      }, 10);
    }
  },
  computed: {
  },
  components: {
    templateLandingPage
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
  overflow: auto; // overflow: scroll;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &::-webkit-scrollbar {
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
</style>
