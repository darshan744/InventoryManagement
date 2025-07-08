import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, InputComponent , ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  name = 'Darshan K';
  email = 'darshan@example.com';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  lowStockAlerts = true;
  forecastAlerts = false;

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Add actual update logic later
    alert('Password updated');
  }

  logout() {
    // Clear session, redirect to login
    console.log('Logging out...');
  }
}
