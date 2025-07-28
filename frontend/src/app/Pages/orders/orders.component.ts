import { Component } from '@angular/core';

import { TabsModule } from 'primeng/tabs';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { RequestedOrdersComponent } from '../requested-orders/requested-orders.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    TabsModule,
    MyOrdersComponent,
    RequestedOrdersComponent,
    CommonModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  currentTab: 'myOrders' | 'requestedOrders' = 'myOrders';

  switchTab(tab: 'myOrders' | 'requestedOrders') {
    this.currentTab = tab;
  }
}
