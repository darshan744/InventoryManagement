import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Router } from "@angular/router";
import { IBaseResponse, LoginResponse } from "../../Types/Response";
import { ToastService } from "../Toast/toast.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
  ) {}

  login(email: string, password: string) {
    const url = `${environment.apiUrl}/auth/login`;
    this.http
      .post<
        IBaseResponse<LoginResponse>
      >(url, { email, password }, { withCredentials: true })
      .subscribe({
        next: (value) => {
          this.toast.success("Login successfull", "Login");
          localStorage.setItem("user", JSON.stringify(value.data.user));
          this.router.navigateByUrl("/user/dashboard");
        },
        error: (val: HttpErrorResponse) => {
          console.log(val);
          this.toast.error("Login Failed", "Error");
        },
      });
  }
}
