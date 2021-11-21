import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/information/:category/:city/:id',
    name: 'information',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    component: () => import(/* webpackChunkName: "about" */ '../components/Information.vue'),
  },
  {
    path: '/:category',
    name: 'scenicspot',
    redirect: '/scenicspot/Taiwan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    component: () => import(/* webpackChunkName: "about" */ '../components/Categories.vue'),
  },
  {
    path: '/:category/:city/:q?/',
    name: 'scenicspot',
    component: () => import(/* webpackChunkName: "about" */ '../components/Categories.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
