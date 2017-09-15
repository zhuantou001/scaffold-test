<template>
  <span>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="user-img"><img src="../../assets/logo.png"></div>
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="quit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>

<script>
  export default {
    name: 'userInfo',
    data () {
      return {
      };
    },
    methods: {
      quitSev () {
        let self = this;
        this.$ajax({
          method: 'get',
          url: 'http://192.168.1.132:3000/users/loginOut'
        }).then((res) => {
          alert('退出成功');
          if (res.data) {
            localStorage.setItem('user', '{}');
            this.$store.commit('newUser', {});
            this.$message({
              message: '退出登录成功',
              type: 'success'
            });
            setTimeout(function () {
              self.$router.push('/');
            }, 500);
          }
          console.log(res.data);
        }).catch((err) => {
          console.log(err);
          this.failMsg('服务器错误');
        });
      },
      quit () {
        let self = this;
        localStorage.setItem('user', '{}');
        localStorage.setItem('token', null);
        this.$store.commit('newUser', {});
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
        setTimeout(function () {
          window.location.reload();
          self.$router.push('/');
        }, 50);
      },
      handleCommand (command) {
        if (command === 'quit') {
          this.quit();
        }
      }
    },
    components: {
    }
  };
</script>

<style lang="scss" scoped>
  .el-dropdown-link{
    cursor:pointer;
  }
  .user-img{
    display: inline-block;
    width:34px;
    height:34px;
    img{
      width:100%;
      border-radius:50%;
      border:1px solid #ccc;
    }
  }
  .el-icon-caret-bottom{
    position: relative;
    top:-12px;
  }
</style>
