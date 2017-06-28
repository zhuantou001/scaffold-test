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
      quit () {
        let self = this;
        localStorage.setItem('user', '{}');
        this.$store.commit('newUser', {});
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
        setTimeout(function () {
          self.$router.push('/');
        }, 500);
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
