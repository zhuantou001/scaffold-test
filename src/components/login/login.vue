<template>
  <span>
    <span class="login" @click="openModal">登录</span>
    <modalBox v-if="showModal" @closeModal="showModal=false" :width="400">
      <div slot="header">登录</div>
      <div slot="body">
        <form class="loginForm">
          <div>
            <el-input type="text" :maxlength=11 class="loginInput" v-model.trim="phone" value="" placeholder="请输入手机号"></el-input>
          </div>
          <div class="verification-input">
            <div>
              <el-input type="text" :maxlength=4 class="loginInput" v-model.trim="verification" placeholder="请输入验证码"></el-input>
              <i v-if="isShow" class="el-icon-circle-check"></i>
            </div>
            <div>
              <el-button type="primary" @click="obtainCode" v-text="buttonText" :disabled="buttonState"></el-button>
            </div>
          </div>
          <div>
            <el-input type="password" class="loginInput" value="" v-model.trim="pwd" placeholder="请输入密码(6个字符以上)"></el-input>
          </div>
          <div>
            <el-button type="primary" class="loginBtn" @click="submit">登录</el-button>
          </div>
        </form>
      </div>
      <div slot="footer">
        <span class="footer-tips">
          (提示:服务器测试用户名:123456 密码:123456,暂时无需验证码)<br/>
          (提示:本地测试用户名:1234567 密码:1234567,暂时无需验证码)
        </span>
      </div>
    </modalBox>
    <loading :show="loading"></loading>
  </span>
</template>

<script type="text/ecmascript-6">
  import modalBox from '../common/modalBox';
  import loginData from '../../mock/login';
  import {Config, ROUTES} from '../common/api';
  import loading from '../loading/Loading';
  export default {
    name: 'login',
    data () {
      return {
        showModal: false,
        loading: false,
        name: '',
        phone: '',
        pwd: '',
        verification: '',
        ajaxState: true, // 防止重复提交，调用多次接口
        isShow: false, // 验证码校验成功时展示成功标识
        buttonText: '获取验证码',
        buttonState: false
      };
    },
    methods: {
      openModal () {
        this.showModal = true;
      },
      successMsg (msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      failMsg (msg) {
        this.$message.error(msg);
      },
      // 电话号码格式校验
      checkMobiles (number) {
        return /^((13|15|18|14|17)+\d{9})$/.test(number);
      },
      checkPhone (number) {
        if (number.trim() === '') {
          this.failMsg('请填写联系电话');
          return false;
        } else if (!this.checkMobiles(number)) {
          this.failMsg('您的手机号码格式有误，请重新输入');
          return false;
        }
        return true;
      },
      //  获取验证码
      obtainCode () {
        if (!this.checkPhone(this.phone)) {
          return;
        }
        if (this.ajaxState) {
          this.ajaxState = false;
          this.$ajax({
            method: 'get',
            url: '/mall-mobile/CheckMessage/captcha',
            params: {
              phoneVal: this.phone,
              type: '13'
            }
          }).then((res) => {
            this.successMsg('验证码已发送，请稍等！');
            this.buttonState = true;
            let count = 60;
            const setYzm = setInterval(() => {
              if (count === 0) {
                clearInterval(setYzm);
                this.buttonText = '重新获取';
                count = 60;
                this.ajaxState = true;
                this.buttonState = false;
              } else {
                this.buttonText = count + 's后重新获取';
                count -= 1;
              }
            }, 1000);
          }).catch((err) => {
            console.log(err);
            this.failMsg('服务器错误');
            this.ajaxState = true;
          });
        }
      },
      // 校验验证码
      checkCaptcha () {
        this.isShow = false;
        if (!this.checkPhone(this.phone)) {
          this.failMsg('您的手机号有误，请重新输入！');
          return;
        }
        if (this.ajaxState && this.verification.length === 4) {
          this.$ajax({
            method: 'post',
            url: '/king/kingNumCard/captchaCheck',
            params: {
              phoneVal: this.phone,
              captcha: this.verification,
              type: '13'
            }
          }).then((res) => {
            if (res.data.RespCode === '0000') {
              this.isShow = true;
              this.successMsg('验证码校验成功！');
            } else {
              this.failMsg(res.data.RespMsg);
            }
            this.ajaxState = true;
          }).catch((err) => {
            console.log(err);
            this.failMsg('服务器错误');
            this.ajaxState = true;
          });
        }
      },
      submit () {
        let self = this;
        const url = Config.api_url + ROUTES.signin;
        this.loading = true;
        this.$ajax({
          method: 'post',
          url: url,
          withCredentials: true,
          data: {
            tel: this.phone,
            password: this.pwd
          }
        }).then(function (res) {
          // document.cookie = "token="+res.headers['x-access-token'];
          if (res.data.ret_code === 0) {
            self.successMsg('登录成功');
            let object = {};
            object.username = self.phone;
            object.id = res.data.user_id;
            // 存储token信息
            localStorage.setItem('token', res.headers['x-access-token']);
            // 用户信息存入localStorage
            localStorage.setItem('user', JSON.stringify(object));
            // 用户信息存入store
            self.$store.commit('newUser', object);
            console.log(localStorage.getItem('user'));
            // 关闭模态框
            setTimeout(function () {
              self.showModal = false;
            }, 1500);
          } else if (res.data.ret_code === 1) {
            self.failMsg('用户名或密码错误');
          }
          console.log(res.data);
          self.loading = false;
        }).catch(function (err) {
          console.log(err);
          self.failMsg('服务器错误');
          self.loading = false;
        });
      }
    },
    watch: {
      verification () {
        this.checkCaptcha();
      }
    },
    components: {
      modalBox,
      loading,
      loginData
    }
  };
</script>

<style lang="scss" scoped>
  .login{
    cursor:pointer;
    font-size: 20px;
    color:#0b97c4;
  }
  .loginForm{
    margin:20px auto;
    .loginInput{
      margin:10px auto;
      width:80%;

    }
    .loginBtn{
      margin:20px auto;
      width:160px;
    }
  }
  .footer-tips{
    font-size: 12px;
  }
  .verification-input{
    padding:0 9%;
    &>div{
      display:inline-block;
      margin:0;
      &:nth-child(1){
         width:60%;
         text-align: left;
       }
      &:nth-child(2){
         width:36%;
         text-align: right;
       }
     }

  }

</style>
