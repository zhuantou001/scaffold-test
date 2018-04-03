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
        <!--<div><router-link :pageId="111" to="/scaffold">编辑</router-link></div>-->
        <div @click="edit">编辑</div>
        <div class="export"><a :href="exportUrl" target="_blank">预览</a></div>
        <div class="export"><a :href="exportUrlPro" target="_blank">导出</a></div>
        <!--<div>移动文件夹</div>-->
        <div @click="nowEffect">立即生效</div>
        <div @click="deleteItem">删除</div>
      </div>
    </modalMenu>

    <groundPreview v-if="showPage" :page_id="id" :page_alias="page_alias" @closePage="showPage=false"></groundPreview>

  </div>
</template>


<script>
  import modalMenu from '../common/modalMenu';
  import groundPreview from './groundPreview';
  import {Config, ROUTES} from '../common/api';
  import {obtainData, hasEffect} from '../common/common';
  import coverDefImg from '../../assets/coverImg.png'; // 默认展示图片
  export default {
    name: 'singleProject',
    data () {
      return {
        dom: null,
        showModal: false,
        showPage: false,
        projectData: {},
        coverImg: coverDefImg,
        exportUrl: '',
        exportUrlPro: ''
      };
    },
    props: ['id', 'name', 'img', 'page_alias'],
    mounted () {
      this.singleGroundPageData(this.id);
     // console.log(this. projectData)
      if (this.img) {
        this.coverImg = Config.img_prev_url + this.img;
      }
      this.$refs.img.onerror = () => {
        this.coverImg = coverDefImg;
      };
      this.exportUrl = Config.http_show_url + this.page_alias;
      this.exportUrlPro = Config.http_show_url_pro + this.page_alias;
    },
    methods: {
      setUp () {
        // 点开菜单前先获取数据
        if (this.projectData) {
          // alert(JSON.stringify(this.projectData));
          localStorage.setItem('projectData', JSON.stringify(this.projectData));
          this.showModal = true;
        } else {
          this.failMsg('获取失败');
        }
      },
      previewPage () {
        if (this.projectData) {
         // alert(JSON.stringify(this.projectData));
          localStorage.setItem('projectData', JSON.stringify(this.projectData));
          this.showModal = false;
          this.showPage = true;
          this.$store.commit('newScreenType', 'vertical');
          this.obtainData(this.projectData);
        } else {
          this.failMsg('获取失败');
        }
      },
      edit () {
        // alert(JSON.stringify(this.projectData));
        // 将后台获取到的该项目全部数据存入localStorage
        this.$router.push('/scaffold/ground');
      },
      deleteItem () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = Config.api_url + ROUTES.deleteScaffolOption + '?page_id=' + this.id + '&page_alias=' + this.page_alias;
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
        const url = Config.api_url + ROUTES.updateScaffoldPro + '?page_id=' + this.id + '&page_alias=' + this.page_alias;
        this.hasEffect(url);
      },
      exportPage () {
        // window.location.reload();
        // this.$router.push('/template/' + this.page_alias);
        this.showModal = false;
      }
    },
    computed: {
    },
    components: {
      modalMenu,
      groundPreview,
      obtainData,
      hasEffect,
      coverDefImg
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
