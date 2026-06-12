import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { authUserStore } from '../store/authuser.store';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore = inject(authUserStore);
  const token = authStore.token() || localStorage.getItem('auth_token') || '';

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthBootstrapRequest =
        req.url.includes('/me') ||
        req.url.includes('/logout');

      if ((error.status === 401 || error.status === 403) && isAuthBootstrapRequest) {
        authStore.clearAuthState();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
