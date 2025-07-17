import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';
@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
  }

  onEmailChange(event: string) {
    this.loginForm.setValue({ ...this.loginForm.value, email: event });
  }
  onPasswordChange(event: string) {
    console.log(this.loginForm.value);
    this.loginForm.setValue({ ...this.loginForm.value, password: event });
  }

  showError = false; // Placeholder for error state

  email: string = '';
  password: string = '';
  errorMessage: string = 'Invalid email or password';

  // Boilerplate function for login
  onLogin() {
    // Placeholder for login logic (to be implemented later)
    this.router.navigateByUrl('user/dashboard');
    this.showError = false;
    if (!this.email || !this.password) {
      this.showError = true;
      return;
    }
    // Future: Call auth service to validate credentials
    console.log('Login attempted with:', this.email, this.password);
  }

  // Boilerplate function for forgot password
  onForgotPassword() {
    // Placeholder for forgot password logic
    console.log('Forgot Password clicked');
  }
}
