import Vue from 'vue'
import Router from 'vue-router'
import scaffold from '@/components/scaffold'
import scaffoldB from '@/components/scaffoldB'

Vue.use(Router)

const router = new Router()

router.map({
  '/scaffold': {
    component: scaffold
  },
  '/scaffoldB': {
    component: scaffoldB
  }
})
export default router
