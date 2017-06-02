<template>
    <div id="container">
      <div class="left">
        <div class="left-space">
          <div class="web">
            <div class="page">
              <templateLandingPage></templateLandingPage>
            </div>
          </div>
          <div class="operation">
            <div class="block">
              <el-button type="success" @click="onSubmit">保存</el-button>
            </div>
            <div class="block">
              <el-button type="warning">导出</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-space">
          <setpageTitle></setpageTitle>
          <setTopImg></setTopImg>
          <setSwitch></setSwitch>
        </div>
      </div>
    </div>
</template>

<script>
  import setpageTitle from './set/pageTitle';
  import setTopImg from './set/setTopImg';
  import setSwitch from './set/switch';
  import templateLandingPage from './template/template';
  import './web.scss';
  export default {
    name: 'container',
    data () {
      return {

      };
    },
    methods: {
      onSubmit: function () {

      }
    },
    components: {
      setpageTitle,
      setTopImg,
      setSwitch,
      templateLandingPage
    }
  };
</script>
