import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authUserStore } from '../store/authuser.store';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const token = localStorage.getItem('auth_token');

  if (token) {
    return true
  } else  {
    router.navigate(['login']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const authStore = inject(authUserStore);
  const token = localStorage.getItem('auth_token');

  if (token && authStore.isLoggedIn()) {
    router.navigate(['dashboard']);
    return false;
  } else {
    return true;
  }
}
