import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, catchError, throwError } from 'rxjs';
import { authUserStore } from '../store/authuser.store';

let isHandlingUnauthorized = false;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
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
      const isPublicAuthRequest =
        req.url.includes('/login') ||
        req.url.includes('/register');

      if (error.status === 401 && !isPublicAuthRequest) {
        if (!isHandlingUnauthorized) {
          isHandlingUnauthorized = true;
          authStore.clearAuthState();
          window.location.replace('/login');
        }
        return EMPTY;
      }

      const isAuthBootstrapRequest =
        req.url.includes('/me') ||
        req.url.includes('/logout');

      if (error.status === 403 && isAuthBootstrapRequest) {
        authStore.clearAuthState();
        window.location.replace('/login');
        return EMPTY;
      }

      return throwError(() => error);
    })
  );
};
