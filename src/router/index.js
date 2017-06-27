import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import scaffold from '@/components/scaffold';
import project from '@/components/project/project';

Vue.use(Router);

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
    },
    {
      path: '/project',
      name: 'project',
      component: project
    }
  ]
});
