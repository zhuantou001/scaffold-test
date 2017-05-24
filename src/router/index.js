import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import scaffold from '@/components/scaffold'
import scaffoldB from '@/components/scaffoldB'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/scaffold',
      name: 'scaffold',
      component: scaffold
    },
    {
      path: '/scaffoldB',
      name: 'scaffoldB',
      component: scaffoldB
    }
  ]
})
