import { createRouter, createWebHistory } from 'vue-router';

import store from '../store/index.js';

import Landing from '../views/Landing.vue';
import Auth from '../views/Auth.vue';
import Teacher from '../views/Teacher.vue';
import Student from '../views/Student.vue';
import Choose from '../views/Choose.vue';
import NotFound from '../views/NotFound';

const routes = [
  //? path, name,comp, props, meta, children
  { path: '/', name: 'home', component: Landing, meta: { requiresUnauth: true } },
  { path: '/auth', name: 'auth', component: Auth, props: true, meta: { requiresUnauth: true } },
  {
    path: '/teacher',
    name: 'teacher',
    component: Teacher,
    props: true,
    meta: { requiresAuth: true, requiresTeacher: true },
  },
  {
    path: '/teacher/:id',
    name: 'teacherId',
    component: Teacher,
    props: true,
    meta: { requiresAuth: true, requiresTeacher: true },
  },
  {
    path: '/student',
    name: 'student',
    component: Student,
    meta: { requiresAuth: true, requiresStudent: true },
  },
  {
    path: '/choose',
    name: 'choose',
    component: Choose,
    meta: { requiresAuth: true },
    excludeFromHistory: true,
  },

  { path: '/:notFound(.*)', name: 'notfound', component: NotFound },

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
  routes,
});

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth) {
    //. Belépés kell
    if (!store.getters.isLoggedIn) next(`/auth?redirect=${to.fullPath.substring(1)}`);
    else if (to.meta.requiresTeacher && !store.getters.isTeacher)
      next(`/choose?redirect=${to.fullPath.substring(1)}`);
    else if (to.meta.requiresStudent && !store.getters.isStudent)
      next(`/choose?redirect=${to.fullPath.substring(1)}`);
    else next();
  } else if (to.meta.requiresUnauth && store.getters.isLoggedIn) next(`/choose`);
  else next();
});

export default router;
