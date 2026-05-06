import { redirectIfAuthenticated } from '@app/providers/router/middleware/redirectIfAuthenticated';
import { requireAuth } from '@app/providers/router/middleware/requireAuth';
import type { RouteRecordRaw } from 'vue-router';

type AsyncComponentLoader = () => Promise<Record<string, unknown>>;

const lazyLoad = (loader: AsyncComponentLoader): AsyncComponentLoader => {
  return async () => {
    try {
      return await loader();
    } catch (err) {
      console.error('[Router Lazy Load Error]', err);
      return import('@pages/ErrorPage.vue');
    }
  };
};

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: lazyLoad(() => import('@pages/HomePage.vue'))
  },
  {
    path: '/login',
    name: 'login',
    component: lazyLoad(() => import('@pages/LoginPage.vue')),
    beforeEnter: [redirectIfAuthenticated]
  },
  {
    path: '/register',
    name: 'register',
    component: lazyLoad(() => import('@pages/RegistrationPage.vue'))
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: lazyLoad(() => import('@pages/ResetPasswordPage.vue'))
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: lazyLoad(() => import('@pages/ChangePasswordPage.vue')),
    meta: { requiresAuth: true },
    beforeEnter: [requireAuth]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: lazyLoad(() => import('@pages/ProfilePage.vue')),
    meta: { requiresAuth: true },
    beforeEnter: [requireAuth]
  },
  {
    path: '/error/:code?',
    name: 'error',
    component: lazyLoad(() => import('@pages/ErrorPage.vue'))
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: lazyLoad(() => import('@pages/NotFoundPage.vue'))
  },
]
