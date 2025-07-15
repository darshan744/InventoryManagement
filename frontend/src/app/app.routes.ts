import { Routes } from '@angular/router';
import { AuthComponent } from './Pages/auth/auth.component';
import { InventoryComponent } from './Pages/inventory/inventory.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { MainComponent } from './Pages/main/main.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { ReportsComponent } from './Pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'user',
    component: MainComponent,
    children: [
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
];
