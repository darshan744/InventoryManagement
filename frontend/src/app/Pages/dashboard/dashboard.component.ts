import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { DashboardCardComponent } from '../../shared/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent, DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  totalItems = 85;
  lowStockCount = 7;
  criticalAlerts = 3;
  forecastReports = 2;

  goToInventory() {
    // route to inventory list
  }

  goToLowStock() {
    // optional filter view
  }

  goToAlerts() {
    // route to alerts page
  }

  goToForecast() {
    // route to forecast reports
  }

  goToAddItem() {
    // route to add item page
  }

  goToRestock() {
    // route to restock item page
  }
}
