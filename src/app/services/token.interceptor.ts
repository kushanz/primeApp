import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { authUserStore } from '../store/authuser.store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const newRequest = req.clone({
      setHeaders: {'Accept': '*/*','Authorization': `Bearer ${token}`},
      withCredentials: true,
    })
    return next(newRequest).pipe(
      catchError((error) => {
        let authStore = inject(authUserStore);
        if(error instanceof HttpErrorResponse && error.status === 401) {
          // Handle unauthorized error, e.g., redirect to login
          console.error('Unauthorized request:', error);
          authStore.removeuser(); // Clear token on unauthorized
          window.location.href = '/login'; // Redirect to login page
          
        }
        return throwError(() => error)
      })
    );
  } else {
    return next(req);
  }
};
