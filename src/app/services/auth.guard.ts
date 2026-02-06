import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authUserStore } from '../store/authuser.store';
// import { sessionStorage } from 'src/app/utils/storage';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const authUser:any = JSON.parse(localStorage.getItem('auth_user') || '{}');
  // const accessToken = getCookie('accessToken');
  if(authUser && authUser.role == 'admin') {
    return true
  } else  {
    router.navigate(['login']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const authStore = inject(authUserStore);
  const authUser:any = JSON.parse(localStorage.getItem('auth_user') || '{}');
  // const accessToken = getCookie('accessToken');
  if(authUser && authUser.role == 'admin' && authStore.isLoggedIn()) {
    router.navigate(['dashboard']);
    return false;
  } else {
    return true;
  }
}

// Helper function to get cookie value
// function getCookie(name: string): string | null {
//   console.log('Getting cookie:',);
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop()?.split(';').shift() || null;
//   }
//   return null;
// }