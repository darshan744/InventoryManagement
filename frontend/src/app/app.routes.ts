import { Routes } from '@angular/router';
import { AuthComponent } from './Pages/auth/auth.component';
import { InventoryComponent } from './Pages/inventory/inventory.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'user',
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
    ],
  },
];
