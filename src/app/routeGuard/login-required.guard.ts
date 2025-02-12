import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/AuthService';

export const loginRequiredGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  await authService.resolved;
  if(authService.isLoggedIn) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
