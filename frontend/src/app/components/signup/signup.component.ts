import { Component, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  imports: [CardModule, ButtonModule, InputTextModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  switchPage = output();
  errorMessage: string | null = null;
  onSubmit() {}
  showPassword: boolean = false;

  switchToLoginPage() {
    this.switchPage.emit();
  }
}
