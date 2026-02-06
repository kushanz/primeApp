import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { authUserStore } from '../store/authuser.store';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // const authuser = inject(authUserStore);
  // const accesstoken = authuser.getAccessToken();
  console.log('Token Interceptor is running');
  const router = inject(Router);
  const authStore = inject(authUserStore);
  // console.log('Access Token:', accesstoken);
  // const auth_user = JSON.parse(localStorage.getItem('auth_user') || '{}');
  // if (accesstoken()) {
    // const newRequest = req.clone({
    //   setHeaders: {

    //     'Accept': '*/*',
    //     // 'Authorization': `Bearer ${accesstoken()}`
    //   },
    //   // withCredentials: true,
    // })
    return next(req).pipe(
      catchError((error) => {
        console.error('Error in token interceptor:', error);
        if(error.status == 401 || error.status == 403) {
          // Handle unauthorized error, e.g., redirect to login
          console.error('Unauthorized request:', error);
          localStorage.removeItem('auth_user'); // Clear the stored user data

          // Clear auth data
          authStore.removeuser();
          localStorage.removeItem('auth_user');
          
          // Navigate to login using Angular Router
          router.navigate(['/login']);
          
        }
        return throwError(() => error)
      })
    );
  // } else {
    // return next(req);
  // }
};
