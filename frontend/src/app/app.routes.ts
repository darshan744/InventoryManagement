import { Routes } from '@angular/router';
import { AuthComponent } from './Pages/auth/auth.component';
import { InventoryComponent } from './Pages/inventory/inventory.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { MainComponent } from './Pages/main/main.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { CartComponent } from './Pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'user',
    component: MainComponent,
    children: [
      {
        path: 'inventory',
        loadComponent:() => import("./Pages/inventory/inventory.component").then(c => c.InventoryComponent)
      },
      {
        path: 'profile',
        loadComponent:()=> import("./Pages/profile/profile.component").then( c => c.ProfileComponent)  
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        loadComponent: () => import("./Pages/orders/orders.component").then(c => c.OrdersComponent)
      },
      {
        path: 'reports',
        loadComponent:() => import("./Pages/reports/reports.component").then(c => c.ReportsComponent),
      },
      {
        path: 'shop',
        loadComponent:() => import("./Pages/shop/shop.component").then(c => c.ShopComponent)
      },
      {
        path: 'cart',
        loadComponent:() => import('./Pages/cart/cart.component').then(c => c.CartComponent),
      },
    ],
  },
];
