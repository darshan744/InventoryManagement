import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  totalProducts: number = 50;
  lowStockThreshold: number = 10;
  autoReorder: boolean = true;
  notificationPreference: string = 'both';
  theme: string = 'light';
  isEditingName: boolean = false;
  isEditingEmail: boolean = false;
  isEditingThreshold: boolean = false;

  constructor(private router: Router) { }

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
    console.log('Theme updated:', this.theme);
  }

  onChangePassword() {
    console.log('Change password initiated');
  }

  onLogout() {
    console.log('Logging out');
    this.router.navigate(['']);
  }

  onUploadPhoto() {
    console.log('Upload photo initiated');
  }
}
