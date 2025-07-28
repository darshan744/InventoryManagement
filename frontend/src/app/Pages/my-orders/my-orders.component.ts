import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BadgeModule } from 'primeng/badge';
import { OrderService } from '../../Service/Order/order.service';
import { OrderResponse, OrderStatus } from '../../Types/Response';
import { UtilsService } from '../../Service/Utils/utils.service';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, FormsModule, BadgeModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  orders: OrderResponse[] = new Array<OrderResponse>();
  filteredOrders: any;
  filterStatus: string = '';
  newOrder = { productName: '', quantity: 0, status: 'pending', date: '' };
  selectedOrder = { productName: '', quantity: 0, status: 'pending', date: '' };
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  errorMessage: string = '';
  isValid: boolean = true;

  constructor(
    private orderService: OrderService,
    private utilsService: UtilsService,
  ) {
    this.filteredOrders = [...this.orders];
  }

  getSeverity(
    orderStatus: OrderStatus,
  ): 'info' | 'success' | 'danger' | 'secondary' {
    return this.utilsService.severityTypeForOrders(orderStatus);
  }
  getImage(image: string | null): string {
    if (!image) {
      return 'assets/images/no-image.png';
    }
    return this.utilsService.constructImage(image);
  }
  ngOnInit() {
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res.data;
      console.log('Orders fetched:', this.orders);
    });
  }
}
