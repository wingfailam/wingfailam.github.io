import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  // 首頁
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  // 資訊頁面轉向
  {
    path: '/information/:category/:city/',
    redirect: '/:category/Taiwan',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Information.vue'),
  },
  // 資訊頁面
  {
    path: '/information/:category/:city/:id',
    name: 'information',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Information.vue'),
  },
  // 搜尋頁面
  {
    path: '/:category/:city/:q?/',
    name: 'scenicspot',
    component: () => import(/* webpackChunkName: "about" */ '../components/Categories.vue'),
  },
  // 搜尋頁面轉向
  {
    path: '/:category',
    name: 'category',
    redirect: '/:category/Taiwan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    component: () => import(/* webpackChunkName: "about" */ '../components/Categories.vue'),
  },
  // 其他都轉到首頁
  {
    path: '/*',
    name: 'Home',
    redirect: '/',
    // component: Home,
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
