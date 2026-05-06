import type { NavigationGuardNext, RouteLocation } from 'vue-router';
import { useUserStore } from '@entities/user';

export function requireAuth(
  to: RouteLocation, 
  from: RouteLocation, 
  next: NavigationGuardNext
) {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }

  if (userStore.isAuthenticated) {
    next({ name: 'profile' });
    return;
  }

  next();
}