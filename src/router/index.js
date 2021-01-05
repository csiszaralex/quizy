import { createRouter, createWebHistory } from 'vue-router';

import store from '../store/index.js';

import Landing from '../views/Landing.vue';

const routes = [
  { path: '/', name: 'Home', component: Landing, meta: { requiresUnauth: true } }
  // { path: '/:notFound(.*)', component: NotFound }
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
    //next(false); //. Letiltja
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
    next('/');
  } else next();
});

export default router;
