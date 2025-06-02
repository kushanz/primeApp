import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { authUserStore } from '../store/authuser.store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Token Interceptor is running');
  const auth_user = JSON.parse(localStorage.getItem('auth_user') || '{}');
  if (auth_user?.token) {
    const newRequest = req.clone({
      setHeaders: {

        'Accept': '*/*',
        'Authorization': `Bearer ${auth_user?.token}`
      },
      // withCredentials: true,
    })
    return next(newRequest).pipe(
      catchError((error) => {
        console.error('Error in token interceptor:', error);
        if(error.status == 401) {
          // Handle unauthorized error, e.g., redirect to login
          console.error('Unauthorized request:', error);
          localStorage.removeItem('auth_user'); // Clear the stored user data

          window.location.href = '/login'; // Redirect to login page
          
        }
        return throwError(() => error)
      })
    );
  } else {
    return next(req);
  }
};
