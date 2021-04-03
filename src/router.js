import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

import Landing from '@/views/Landing.vue';
import Auth from '@/views/Auth.vue';
import Teacher from '@/views/Teacher.vue';
import Edit from '@/views/Edit.vue';
import Stat from '@/views/Stat.vue';
import Student from '@/views/Student.vue';
import Fills from '@/views/Fills.vue';
import Fill from '@/views/Fill.vue';
import Choose from '@/views/Choose.vue';
import NotFound from '@/views/NotFound';

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
    path: '/fills',
    name: 'fills',
    component: Fills,
    props: true,
    meta: { requiresAuth: true, requiresTeacher: true },
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
    props: true,
    meta: { requiresAuth: true, requiresTeacher: true },
    children: [{ path: ':quest', name: 'edit', component: Edit }],
  },
  {
    path: '/stat/:id',
    name: 'stat',
    component: Stat,
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
    path: '/fill/:id',
    name: 'fill',
    component: Fill,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/choose',
    name: 'choose',
    component: Choose,
    meta: { requiresAuth: true },
    excludeFromHistory: true,
  },
  { path: '/:notFound(.*)', name: 'notfound', component: NotFound },
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
