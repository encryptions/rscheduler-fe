import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('Authorization');
  if (!token) return true;
  else {
    router.navigate(['/accounts']);
    return false;
  }
};
