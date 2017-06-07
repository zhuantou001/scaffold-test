<template id="switch">
  <div class="switch-box">
    <div class="switch-area">
      <ul class="switch cf">
        <li class="switch-tab left checked" data-type="0"><a href="javascript:;"><span>{{pageSwitchtitle01}}</span></a></li>
        <li class="switch-tab right" data-type="1"><a href="javascript:;"><span>{{pageSwitchtitle02}}</span></a></li>
      </ul>
      <div class="charge-desc">
        <p id="fee0" class="fee">{{pageSwitchContent01}}</p>
        <p id="fee1" class="fee fee-small" hidden>{{pageSwitchContent02}}</p>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'switch',
    data () {
      return {
      };
    },
    directives: {
    },
    mounted () {
      this.$nextTick(function () {
        // const tabObj = document.getElementsByClassName('switch-tab');
      });
    },
    methods: {
      switchTab () {
        alert(123);
      }
    },
    computed: {
      pageSwitchtitle01 () {
        return this.$store.state.switch_title01;
      },
      pageSwitchtitle02 () {
        return this.$store.state.switch_title02;
      },
      pageSwitchContent01 () {
        return this.$store.state.switch_content01;
      },
      pageSwitchContent02 () {
        return this.$store.state.switch_content02;
      }
    }
  };

</script>

<style>
  .switch-box{
    margin:15px 0;
  }
</style>
