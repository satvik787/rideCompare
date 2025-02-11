import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './service/AuthService';

export const loginRequiredGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log(route, state);
  return true;
};
