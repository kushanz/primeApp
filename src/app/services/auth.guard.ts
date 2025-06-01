import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { sessionStorage } from 'src/app/utils/storage';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const authUser:any = JSON.parse(localStorage.getItem('auth_user') || '{}');
  if(authUser?.token) {
    return true
  } else  {
    router.navigate(['login']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const authUser:any = JSON.parse(localStorage.getItem('auth_user') || '{}');
  if(authUser?.token) {
    router.navigate(['dashboard']);
    return false;
  } else {
    return true;
  }
}
