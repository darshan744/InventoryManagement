import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { IBaseResponse, LoginResponse } from '../../Types/Response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(email: string, password: string) {
    const url = `${environment.apiUrl}/auth/login`;
    this.http
      .post<IBaseResponse<LoginResponse>>(url, { email, password })
      .subscribe({
        next : (value)=> {
          localStorage.setItem('user', JSON.stringify(value.data.user));
          this.router.navigateByUrl('/user/dashboard');
        },
      });
  }
}
