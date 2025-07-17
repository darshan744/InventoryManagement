import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      const errorStatus = error.status;
      if (errorStatus !== 401) {
        return throwError(() => error);
      }

      const refreshTokenUrl = `${environment.apiUrl}/auth/refresh`;
      // If the request is for the refresh token endpoint, we don't want to retry it
      if (req.url === refreshTokenUrl) {
        return throwError(() => error);
      }
      // If the request is not for the refresh token endpoint, we will try to refresh the token
      return http.post(refreshTokenUrl, {}, { withCredentials: true }).pipe(
        switchMap(() => next(req)),
        catchError((refreshError) => {
          router.navigateByUrl('/login');
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
