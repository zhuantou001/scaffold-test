<template>
  <span>
    <div class='main'>
      <div class='left'>
        <img src="../../assets/index.jpg" alt="">
      </div>
      <div class='right'>
        <div class='header'>
          <img src="../../assets/logo.png" alt="">
          <span>SCAFFOLD</span>
        </div>
        <div class="body">
          <h4>SCAFFOLD 账户</h4><br/>
          <form class="loginForm">
            <div>
              <el-input type="text" :maxlength=11 name="loginInput" class="loginInput" v-model.trim="phone" value="" placeholder="请输入手机号"></el-input>
            </div>
            <div class="verification-box">
                <i v-if="isShow" class="el-icon-circle-check"></i>
              <el-input v-model.trim="verification" class="loginInput" placeholder="请输入验证码">
                <el-button slot="append" @click="obtainCode" v-text="buttonText" :disabled="buttonState" class="verBtn"> 点击发送验证码</el-button>
              </el-input>
              <!--<el-input type="number" class="loginInput" value="" v-model.trim="verification" placeholder="请输入密码(6个字符以上)"></el-input>-->
            </div>
            <div>
              <el-input type="password" class="loginInput" value="" v-model.trim="pwd" placeholder="请输入密码(6个字符以上)"></el-input>
            </div>
            <div>
              <el-button type="primary" class="loginBtn" @click="submit">登录</el-button>
            </div>
          </form>
        </div>
        <div class="footer">
        </div>
      </div>
    </div>
    <loading :show="loading"></loading>
  </span>
</template>

<script type="text/ecmascript-6">
import modalBox from "../common/modalBox";
import { Config, ROUTES } from "../common/api";
import loading from "../loading/Loading";
export default {
  name: "login",
  data() {
    return {
      showModal: false,
      loading: false,
      name: "",
      phone: "",
      pwd: "",
      verification: "",
      ajaxState: true, // 防止重复提交，调用多次接口
      isShow: false, // 验证码校验成功时展示成功标识
      buttonText: "获取验证码",
      buttonState: false,
      showImg: 1,
      count: 60
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    successMsg(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    failMsg(msg) {
      this.$message.error(msg);
    },
    // 电话号码格式校验
    checkMobiles(number) {
      return /^((13|15|18|14|17|16|19)+\d{9})$/.test(number);
    },
    checkPhone(number) {
      if (number.trim() === "") {
        this.failMsg("请填写联系电话");
        return false;
      } else if (!this.checkMobiles(number)) {
        this.failMsg("您的手机号码格式有误，请重新输入");
        return false;
      }
      return true;
    },
    checkPassword (text) {
      var patrn = /^(\w){6,20}$/;
      if (!patrn.exec(text)) {
        return false;
      }
      return true;
    },
    checkCode (text) {
      var patrn = /^\d{4}$/;
      if (!patrn.exec(text)) {
        return false;
      }
      return true;
    },
    setYzm () {
      setInterval(() => {
        if (this.count === 0) {
          this.buttonText = "重新获取";
          this.ajaxState = true;
          this.buttonState = false;
        } else {
          this.buttonText = this.count + "s后重新获取";
          this.count -= 1;
        }
      }, 1000);
    },
    recoverCodeBtn () {
      this.buttonText = "点击发送验证码";
      this.ajaxState = true;
      this.buttonState = false;
      clearInterval();
    },
    //  获取验证码
    obtainCode() {
      if (!this.checkPhone(this.phone)) {
        return;
      }
      if (this.ajaxState) {
        this.ajaxState = false;
        this.$ajax({
          method: "get",
          url: "/mall-mobile/CheckMessage/captcha",
          params: {
            phoneVal: this.phone,
            type: "13"
          }
        }).then(res => {
            this.successMsg("验证码已发送，请稍等！");
            this.buttonState = true;
//            this.count = 60;
//            this.setYzm ();
            let count = 60;
            const setYzm = setInterval(() => {
              if (count === 0) {
                clearInterval(setYzm);
                this.buttonText = "重新获取";
                count = 60;
                this.ajaxState = true;
                this.buttonState = false;
              } else {
                this.buttonText = count + "s后重新获取";
                count -= 1;
              }
            }, 1000);
          }).catch(err => {
            console.log(err);
            this.failMsg("服务器错误");
            this.ajaxState = true;
          });
      }
    },
    // 校验验证码
    // checkCaptcha() {
    //   this.isShow = false;
    //   this.ajaxState = true;
    //   if (!this.checkPhone(this.phone)) {
    //     this.failMsg("您的手机号有误，请重新输入！");
    //     return;
    //   }
    //   if (this.ajaxState && this.verification.length === 4) {
    //     this.$ajax({
    //       method: "post",
    //       url: "/king/kingNumCard/captchaCheck",
    //       params: {
    //         phoneVal: this.phone,
    //         captcha: this.verification,
    //         type: "13"
    //       }
    //     }).then(res => {
    //         if (res.data.RespCode === "0000") {
    //           this.isShow = true;
    //           this.successMsg("验证码校验成功！");
    //         } else {
    //           this.failMsg(res.data.RespMsg);
    //         }
    //         this.ajaxState = true;
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         this.failMsg("服务器错误");
    //         this.ajaxState = true;
    //       });
    //   }
    // },
    submit() {
      let self = this;
      if (!self.checkPhone(this.phone)) {
        return false;
      }
//      if (!self.checkCode(this.verification)) {
//        self.failMsg("验证码只能输入四位数字");
//        return false;
//      }
//      if (!self.isShow) {
//        self.failMsg("验证码输入错误, 请重新输入");
//        return false;
//      }
      if (!self.checkPassword(this.pwd) ) {
        self.failMsg("密码只能输入6-20个字母、数字、下划线");
        return false;
      }
        const url = Config.api_url + ROUTES.signin;
        this.loading = true;
        this.$ajax({
          method: "post",
          url: url,
          withCredentials: false,
          data: {
            tel: this.phone,
            captcha: this.verification,
            password: this.pwd
          }
        }).then(function(res) {
          if (res.data.ret_code === 0) {
            self.successMsg("登录成功");
            let object = {};
            object.username = self.phone;
            object.id = res.data.user_id;
            // 存储token信息
            localStorage.setItem("token", res.headers["x-access-token"]);
            // 用户信息存入localStorage
            localStorage.setItem("user", JSON.stringify(object));
            // 用户信息存入store
            self.$store.commit("newUser", object);
            console.log(localStorage.getItem("user"));
            self.$router.push('/project');
            // 关闭模态框
            // setTimeout(function() {
            //   self.showModal = false;
            // }, 1500);
          } else {
            self.failMsg(res.data.ret_msg);
          }
          console.log(res.data);
          self.loading = false;
        }).catch(function(err) {
            console.log(err);
            self.failMsg("服务器错误");
            self.loading = false;
        });
    }
  },
  watch: {
    verification () {
      // this.checkCaptcha();
    },
    phone () {
//      this.recoverCodeBtn();
    }
  },
  components: {
    modalBox,
    loading
  }
};
</script>

<style lang="scss" scoped>
$them: #0089b3;
* {
  margin: 0;
  padding: 0;
}
.main {
  position: absolute;
  width: 720px;
  height: 380px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    vertical-align: middle;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
    text-align: left;
    height: 380px;
    position: relative;
    .header{
      font-size: 32px;
      color: $them;
      margin-top: -12px;
      img{
        height: 70px;
      }
    }
    .body {
      margin-top: 25px;
    }
    .footer {
      position: absolute;
      bottom: 0;
    }
  }
}
.login {
  cursor: pointer;
  font-size: 20px;
  color: #0b97c4;
}
.loginForm {
  margin: 0 auto;
  .loginInput {
    margin: 0 auto 12px;
    width: 320px;
  }
  .loginBtn {
    margin: 25px auto 0;
    width: 160px;
    background: $them;
    border-color: $them;
  }
}
.footer-tips {
  font-size: 12px;
  color: #555;
  overflow: hidden;
  .tip{
    float: left;
  }
  .tip-con{
    float: left;
  }
}
.verification-input {
  padding: 0 9%;
  & > div {
    display: inline-block;
    margin: 0;
    &:nth-child(1) {
      width: 60%;
      text-align: left;
    }
    &:nth-child(2) {
      width: 36%;
      text-align: right;
    }
  }
}
.verBtn{
  width:120px;
}
.verification-box{
  position: relative;
}
.verification-box>i{
  position: absolute;
  top:10px;
  right:130px;
  z-index:9999;
  color:#40c9b3;
}
</style>
