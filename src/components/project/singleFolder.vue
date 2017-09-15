<template>
  <div>
    <div class="folder-box" @click="loadInnerProject(id)">
      <div class="folder-box-con">
        <div class="set" @click.stop="setUp"><i class="el-icon-more"></i></div>
        <img src="../../assets/folder.png"/>
      </div>
      <div class="folder-box-title">{{name}}</div>
    </div>

    <modalMenu v-if="showModal" @closeModal="showModal=false" :width="260">
      <div slot="body">
        <div @click="reName">修改文件夹名</div>
        <div @click="deleteFolder">删除</div>
      </div>
    </modalMenu>

    <loading :show="loading"></loading>
  </div>
</template>

<script>
  import failMsg from '../common/common';
  import {loadInnerProject, loadAll} from './projectCommon';
  import {Config, ROUTES} from '../common/api';
  import modalMenu from '../common/modalMenu';
  import loading from '../loading/Loading';
  export default {
    name: 'singleFolder',
    data () {
      return {
        loading: false,
        showModal: false
      };
    },
    props: ['id', 'name'],
    methods: {
      setUp () {
        this.showModal = true;
      },
      reName () {
        this.$prompt('例如:文件夹123', '请输入文件夹名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const url = Config.api_url + ROUTES.updateFolders + '?fid=' + this.id + '&fname=' + value;
          this.loading = true;
          this.$ajax({
            method: 'get',
            url: url
          }).then((res) => {
            // alert(JSON.stringify(res.data.data));
            if (res.data.data.ret_code === 1) {
              this.$message({
                type: 'success',
                message: '修改名字为:' + value
              });
              this.showModal = false;
              this.loadAll();
            } else {
              this.failMsg('暂时无数据');
            }
            console.log(res.data);
            this.loading = false;
          }).catch((err) => {
            console.log(err);
            this.failMsg('服务器错误');
            this.loading = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      deleteFolder () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = Config.api_url + ROUTES.deleteFolders + '?fid=' + this.id;
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
              this.showModal = false;
              this.loadAll();
            } else {
              this.failMsg(res.data.data.ret_msg);
            }
            console.log(res.data);
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
      }
    },
    computed: {
    },
    components: {
      failMsg,
      loadInnerProject,
      modalMenu,
      loadAll,
      loading
    }
  };
</script>

<style lang="scss" scoped>
  .folder-box{
    width:180px;
    cursor:pointer;
    .folder-box-con{
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
        width:72px;
        height:72px;
      }
      &:hover{
        border:1px solid #37d6ff;
        .set i{
           color:#37d6ff;
         }
       }
    }
    .folder-box-title{
      width:100%;
      margin-top:10px;
      line-height: 40px;
      text-align: center;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
</style>
