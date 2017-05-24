import Vue from 'vue'
import Router from 'vue-router'
import scaffold from '@/components/scaffold'
import scaffoldB from '@/components/scaffoldB'

Vue.use(Router)

const router = new VueRouter(); //这里可以带有路由器的配置参数

router.map({
  '/view-a': {
    component: scaffold
  },
  '/view-b': {
    component: scaffoldB
  }
});

export default router; //将路由器导出
