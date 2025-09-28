import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// Update the path below to the correct location of your Auth service
import { Auth } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};