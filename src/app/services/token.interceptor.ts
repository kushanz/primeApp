import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap, BehaviorSubject, filter, take, Observable } from 'rxjs';
import { authUserStore } from '../store/authuser.store';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Token Interceptor is running');
  const router = inject(Router);
  const authStore = inject(authUserStore);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error in token interceptor:', error);
      
      // Check if error is 401 or 403 and not from refresh endpoint
      // Some backends return 403 for expired tokens instead of 401
      if ((error.status === 401 || error.status === 403) && !req.url.includes('/auth/refreshtoken')) {
        return handleUnauthorizedError(req, next, authStore, authService, router);
      }
      
      return throwError(() => error);
    })
  );
};

function handleUnauthorizedError(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authStore: any,
  authService: AuthService,
  router: Router
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.token);
        
        // Update user data with new token if needed
        if (response.user) {
          authStore.setuser(response.user);
        }
        
        // Retry the original request
        return next(req);
      }),
      catchError((error) => {
        isRefreshing = false;
        // Refresh token failed, logout user
        console.error('Token refresh failed:', error);
        logout(authStore, router);
        return throwError(() => error);
      })
    );
  } else {
    // Wait for the refresh to complete, then retry the request
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => next(req))
    );
  }
}

function logout(authStore: any, router: Router) {
  console.log('Logging out user due to authentication failure');
  authStore.removeuser();
  router.navigate(['/login']);
}
