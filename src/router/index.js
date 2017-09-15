import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import scaffold from '@/components/scaffold';
import project from '@/components/project/project';
import templateExport from '@/components/groundPage/template/templateExport';

Vue.use(Router);

const router = new Router({
  base: '/scaffold',
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
  },
  routes: [{
      path: '/',
      name: 'home',
      component: home,
      meta: {
        allowBack: false
      }
    },
    {
      path: '/scaffold/:style',
      name: 'scaffold',
      component: scaffold,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        allowBack: false
      }
    },
    {
      path: '/project',
      name: 'project',
      component: project,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        allowBack: false
      }
    },
    {
      path: '/template/:name',
      name: 'templateExport',
      component: templateExport,
      meta: {
        // requireAuth: true,  // 针对所有用开放，不用鉴权
        allowBack: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 路由拦截
  if (to.meta.requireAuth) {
    if (localStorage.getItem('user') === '{}' || localStorage.getItem('user') == null) {
      alert('您还没有登录,请先登录!');
      next({
        path: '/'
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    } else {
      next();
    }
  } else {
    next();
  }
  // next();
  // 禁止回退 去掉这段也能禁止,但是组件会重新渲染
  let allowBack = true; //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack;
    if (!allowBack) {
      history.pushState(null, null, location.href);
    }
  }
  // this.$store.commit('newForbidHistory', allowBack);
});

export default router;
