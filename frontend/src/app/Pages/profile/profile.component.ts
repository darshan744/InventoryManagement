import { Component, effect, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { LoginResponse } from '../../Types/Response';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    InputTextModule,
    CheckboxModule,
    SelectModule,
    ButtonModule,
    ToggleSwitchModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  notificationOptions: string[] = ['Email', 'SMS', 'Both'];
  isDarkMode = signal(false);
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  totalProducts: number = 50;
  lowStockThreshold: number = 10;
  autoReorder: boolean = true;
  notificationPreference: string = this.notificationOptions[0];
  theme: string = 'light';
  isEditingName: boolean = false;
  isEditingEmail: boolean = false;
  isEditingThreshold: boolean = false;

  constructor(private router: Router) {
    effect(() => { });
  }
  ngOnInit(): void {
    const user: LoginResponse['user'] = JSON.parse(
      localStorage.getItem('user') || '{}',
    );
    this.userName = user.name;
    this.userEmail = user.email;
    const localStorageTheme = localStorage.getItem('dark');
    if (localStorageTheme) {
      const localTheme = Boolean(JSON.parse(localStorageTheme));
      this.isDarkMode.set(localTheme);
    }
    this.setTheme();
  }
  toggleEditName() {
    this.isEditingName = !this.isEditingName;
    if (!this.isEditingName) {
      console.log('Name updated:', this.userName);
    }
  }

  toggleEditEmail() {
    this.isEditingEmail = !this.isEditingEmail;
    if (!this.isEditingEmail) {
      console.log('Email updated:', this.userEmail);
    }
  }

  toggleEditThreshold() {
    this.isEditingThreshold = !this.isEditingThreshold;
    if (!this.isEditingThreshold) {
      console.log('Threshold updated:', this.lowStockThreshold);
    }
  }

  onToggleAutoReorder() {
    console.log('Auto-reorder toggled:', this.autoReorder);
  }

  onChangeNotification() {
    console.log(
      'Notification preference updated:',
      this.notificationPreference,
    );
  }

  onChangeTheme() {
    this.isDarkMode.update((prev) => !prev);
    this.setTheme();
  }

  setTheme() {
    localStorage.setItem('dark', JSON.stringify(this.isDarkMode()));
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }

  onChangePassword() {
    console.log('Change password initiated');
  }

  onLogout() {
    console.log('Logging out');
    this.router.navigate(['']);
    localStorage.removeItem('user');
  }

  onUploadPhoto() {
    console.log('Upload photo initiated');
  }
}
