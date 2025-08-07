import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../Service/Auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  switchPage = output();
  loginForm: FormGroup;
  showPassword = false;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
    this.loginForm.setValue({ ...this.loginForm.value, password: event });
  }

  showError = false; // Placeholder for error state

  errorMessage: string = 'Invalid email or password';

  onForgotPassword() {
    console.log('Forgot Password clicked');
  }

  switchToSignUpPage() {
    this.switchPage.emit()
  }
}
