import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import home from '@/components/home'
import scaffold from '@/components/scaffold'

Vue.use(Router)
Vue.use(Element)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/scaffold',
      name: 'scaffold',
      component: scaffold
    }
  ]
})
