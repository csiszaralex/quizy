import { createRouter, createWebHistory } from 'vue-router';

import store from '../store/index.js';

import Landing from '../views/Landing.vue';
import Auth from '../views/Auth.vue';
import Teacher from '../views/Teacher.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', name: 'Home', component: Landing, meta: { requiresUnauth: true } },
  { path: '/auth', name: 'Auth', component: Auth, props: true, meta: { requiresUnauth: true } },
  { path: '/teacher', name: 'Teacher', component: Teacher, meta: { requiresAuth: true } },
  { path: '/:notFound(.*)', component: NotFound }
  // {
  //   path: '/coaches/:id',
  //   component: CoachDetail,
  //   props: true,
  //   children: [
  //     { path: 'contact', component: ContactCoach } // /coaches/c1/contact
  //   ]
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
    next('/teacher');
  } else next();
});

export default router;
