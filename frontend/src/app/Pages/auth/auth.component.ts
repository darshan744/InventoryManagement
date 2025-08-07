import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
@Component({
  selector: 'app-auth',
  imports: [CommonModule, LoginComponent, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginPage = signal<boolean>(true);

  switchToSignUp() {
    this.isLoginPage.set(false);
  }
  swtichToLogin() {
    this.isLoginPage.set(true);
  }
}
