import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorStatus = error.status;
      if (errorStatus !== 401) {
        return throwError(() => error);
      }

      const refreshTokenUrl = `${environment.apiUrl}/auth/refresh-token`;
      // If the request is for the refresh token endpoint, we don't want to retry it
      if (req.url === refreshTokenUrl) {
        return next(req);
      }
      // If the request is not for the refresh token endpoint, we will try to refresh the token
      return http.post(refreshTokenUrl, {}, { withCredentials: true }).pipe(
        switchMap(() => next(req.clone({ withCredentials: true }))),
        catchError((refreshError) => {
          console.log(
            'Refresh token failed, redirecting to login',
            refreshError,
          );
          // even incase of error check if its unauthorized error then only redirect to login
          if (refreshError.status === 401) {
            router.navigateByUrl('login');
          }
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
