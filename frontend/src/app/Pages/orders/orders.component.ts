import { Component } from '@angular/core';

import { TabsModule } from 'primeng/tabs';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { RequestedOrdersComponent } from '../requested-orders/requested-orders.component';
import { CommonModule } from '@angular/common';
import { RequestOrderResponse } from '../../Types/Response';
import { OrderService } from '../../Service/Order/order.service';
import { UtilsService } from '../../Service/Utils/utils.service';

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
  constructor(
    private orderService: OrderService,
    public util: UtilsService,
  ) { }
  ngOnInit() {
    this.orderService.getRequestOrders().subscribe((res) => {
      this.requestOrders = res.data;
    });
  }
  requestOrders: RequestOrderResponse[] = [];

}
