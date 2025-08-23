import { Component, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../Service/Toast/toast.service';
import { SignUp } from '../../Types/Types';
import { AuthService } from '../../Service/Auth/auth.service';

interface SignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-signup',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  formValue: FormGroup<SignUpForm>;
  switchPage = output();
  errorMessage: string | null = null;
  showPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private auth: AuthService,
  ) {
    this.formValue = this.fb.group<SignUpForm>({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }
  switchToLoginPage() {
    this.switchPage.emit();
  }
  onSubmit() {
    if (this.formValue.invalid) {
      this.toast.error('Please enter all values', 'Error');
      return;
    }
    const { email, password, name } = this.formValue.value;
    if (!email || !name || !password) {
      this.toast.error('All values are required', 'Error');
      return;
    }

    this.auth.signup({ email, password, name }).subscribe((_res) => {
      this.toast.success('SignUp success', 'Success');
    });
  }
}
