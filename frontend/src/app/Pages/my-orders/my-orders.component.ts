import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
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
  statuses: { label: string; value: '' | 'COMPLETED' | 'CANCELLED' }[] = [
    { label: 'All', value: '' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];

  selectedStatus = signal<'' | 'COMPLETED' | 'CANCELLED'>('');
  orders: OrderResponse[] = new Array<OrderResponse>();
  filteredOrders = signal<OrderResponse[]>([]);
  constructor(
    private orderService: OrderService,
    private utilsService: UtilsService,
  ) {
    effect(() => {
      const status = this.selectedStatus();
      if (status === '') {
        this.filteredOrders.set(this.orders);
      } else {
        this.filteredOrders.set(
          this.orders.map((order) => ({
            ...order,
            OrderItem: order.OrderItem.filter((item) => item.status === status),
          })),
        );
      }
    });
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
      this.filteredOrders.set(res.data);
    });
  }
}
