import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToggleIconComponent } from '../../shared/toggle-icon/toggle-icon.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { InputComponent } from '../../shared/input/input.component';
@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ToggleIconComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;

  constructor(private fb: FormBuilder) {
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

    // 🔧 Simulate fake login delay
    setTimeout(() => {
      this.loading = false;
      const { email, password } = this.loginForm.value;

      if (email === 'admin@example.com' && password === 'admin123') {
        // Show toast and navigate (after adding toast system)
        console.log('✅ Login success');
      } else {
        // Show error toast
        console.log('❌ Invalid credentials');
      }
    }, 1200);
  }

  onEmailChange(event: string) {
    console.log(this.loginForm.value);
    this.loginForm.setValue({ ...this.loginForm.value, email: event });
  }
  onPasswordChange(event: string) {
    console.log(this.loginForm.value);
    this.loginForm.setValue({ ...this.loginForm.value, password: event });
  }
}
