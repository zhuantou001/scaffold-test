<template>
  <div>
    <div class="filterBox">
      <el-select v-model="value" no-data-text="无人给您授权..." filterable placeholder="请选择给你授权的用户文件" :filter-method="remoteMethod">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :title="item.alias"
          :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>
  </div>
</template>


<script>
  import {Config, ROUTES} from '../common/api';
  import {loadAll} from './projectCommon';
  export default {
    name: 'filterBox',
    data() {
      return {
        options: [],
        // value: '---请选择用户---',
        operator: ''
      }
    },
    mounted () {
      this.operator = JSON.parse(localStorage.getItem('user')).id;
      this.getUserList();
      document.getElementsByClassName('el-input__inner')[0].setAttribute('readonly', 'readonly');
    },
    methods: {
      getUserList () {
        this.$ajax({
          method: 'get',
          url: Config.api_url + ROUTES.queryAuthList + '?operator=' + this.operator
        }).then((res) => {
          const data = res.data.data;
          for (let i = 0;i<data.length;i++) {
            this.options.push({
              value: data[i].user_id,
              label: data[i].user_name,
              alias: data[i].user_phone
            });
          }
        }).catch((err) => {
          this.failMsg('服务器错误');
          this.loading = false;
        });
      },
      remoteMethod (query) {
        let user_id = '';
        const item = this.options.filter(function(user){
          return user.label == query;
        });
        if (!item.length) {
          return;
        } else {
          user_id = item[0].value;
        }
        this.loadAll(user_id);
      }
    },
    computed: {
      value: {
        get () {
          return this.$store.state.project.searchValue;
        },
        set (msg) {
          this.$store.commit('newSearchValue', msg);
        }
      }
    },
    components: {
      
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
