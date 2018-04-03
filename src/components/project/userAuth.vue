<template>
  <modalBox v-if='showModal' @closeModal='closeModal' :width="800">
    <div slot="header">用户授权</div>
    <div slot="body" class='authContent'>
      <el-transfer
        filterable
        :titles="['可授权列表', '已授权列表']"
        filter-placeholder="请输入用户号码"
        v-model="value"
        :props="{
          key: 'value',
          label: 'desc'
        }"
        @change="handleChange"
        :data="data">
      </el-transfer>
    </div>
    <div slot="footer" class='footer'>
      <el-button class='btn' type="primary" @click='closeModal'>取消</el-button>
      <el-button class='btn margin' type="primary" @click='saveUserAuth'>保存</el-button>
    </div>
  </modalBox>
</template>
<script>
import modalBox from "../common/modalBox";
import { Config, ROUTES } from "../common/api";
export default {
  data() {
    return {
      data: [],
      value: [],
      targetkey: [],
      operator: "",
      direction: "",
      flag: true
    };
  },
  mounted() {},
  watch: {
    showModal() {
      if (this.showModal) {
        //init
        this.data = [];
        this.value = [];
        this.targetkey = [];
        this.getUserList();
      }
    }
  },
  methods: {
    getUserList() {
      if (localStorage.getItem('user') === '{}' || localStorage.getItem('user') == null) {
        alert('您还没有登录,请先登录!');
        this.$router.push({ path: '/' });
        this.$store.commit("newShowModal", false);
        return false;
      }
      this.operator = JSON.parse(localStorage.getItem("user")).id;
      this.$ajax({
        method: "get",
        url: Config.api_url + ROUTES.getUserList + "?operator=" + this.operator
      })
        .then(res => {
          this.initUserList(res.data.data);
        })
        .catch(err => {
          this.failMsg("服务器错误");
        });
    },
    // filterMethod(query, item) {
    //   return item.nums.indexOf(query) > -1;
    // },
    handleChange(value, direction, movedKeys) {
      console.log(value);
      this.targetkey = value;
    },
    saveUserAuth() {
      this.operator = JSON.parse(localStorage.getItem("user")).id;
      const that = this;
      // if (!this.targetkey.length) {
      //   this.failMsg("请选择需要授权的用户");
      //   return false;
      // }
      this.$ajax({
        method: "post",
        url: Config.api_url + ROUTES.addUserAuth,
        data: { userArr: this.targetkey, operator: this.operator }
      })
        .then(res => {
          if (res.data.data.ret_code === "0000") {
            that.successMsg("保存成功");
            that.$store.commit("newShowModal", false);
          } else {
            that.failMsg("保存失败");
          }
        })
        .catch(err => {
          that.failMsg("服务器错误");
        });
    },
    initUserList(data) {
      const userList = data.user_list;
      const authList = data.authed_list;
      for (let j = 0; j < authList.length; j++) {
        this.value.push(`${authList[j].authed_id}`);
      }
      for (let i = 0; i < userList.length; i++) {
        this.data.push({
          value: userList[i].user_id,
          desc: `${userList[i].user_phone}(${userList[i].user_name})`
        });
      }
    },
    closeModal() {
      this.$store.commit("newShowModal", false);
    }
  },
  computed: {
    showModal() {
      return this.$store.state.project.showModal;
    }
  },
  components: {
    modalBox
  }
};
</script>
<style lang='scss'>
.authContent {
  margin-top: 10px;
  padding-left: 55px;
}
.el-transfer {
  .el-transfer-panel {
    width: 300px;
  }
  .el-transfer__buttons {
    .el-button {
      padding: 12px 12px;
      border-radius: 50%;
    }
  }
  .el-transfer-panel__filter {
    .el-input__inner {
      height: 30px;
      border-radius: 40px;
      padding-left: 20px;
    }
  }
}
.footer {
  .btn {
    width: 150px;
    &.margin {
      margin-left: 60px;
    }
  }
}
</style>
