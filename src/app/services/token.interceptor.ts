import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const newRequest = req.clone({
      setHeaders: {'Accept': '*/*','Authorization': `Bearer ${token}`},
      withCredentials: true,
    })
    return next(newRequest);
  } else {
    return next(req);
  }
};
