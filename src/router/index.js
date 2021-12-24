import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/main/Index'),
    children: [
      {
        name: 'Home',
        path: '/',
        component: () => import('@/views/main/Home'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/main/Login'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/main/Register'),
      },
      {
        path: '/feed',
        name: 'feed',
        component: () => import('@/views/Learner/Feed'),
      },
      {
        path: '/course/:courseId',
        name: 'course',
        component: () => import('@/views/main/Course'),
      },
      {
        path: '/myprofile',
        name: 'myprofile',
        component: () => import('@/views/Learner/MyProfile'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
