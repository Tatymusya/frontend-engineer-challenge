import type { NavigationGuardNext, RouteLocation } from 'vue-router';
import { useUserStore } from '@entities/user';

export function redirectIfAuthenticated(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();

  if (userStore.isAuthenticated) {
    // Редирект на /profile или сохранённый redirect
    const redirect = to.query.redirect as string;
    next(redirect || '/profile');
  } else {
    next();
  }
}