import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BadgeModule } from 'primeng/badge';
import { DataService } from '../../Service/data.service';
import { OrderService } from '../../Service/Order/order.service';
import { Order, OrderStatus } from '../../Types/Response';
import { UtilsService } from '../../Service/Utils/utils.service';
import { ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule, BadgeModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: Order[] = new Array<Order>();
  filteredOrders: any;
  filterStatus: string = '';
  newOrder = { productName: '', quantity: 0, status: 'pending', date: '' };
  selectedOrder = { productName: '', quantity: 0, status: 'pending', date: '' };
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  errorMessage: string = '';
  isValid: boolean = true;

  constructor(
    private dataService: DataService,
    private orderService: OrderService,
    private utilsService: UtilsService,
  ) {
    this.filteredOrders = [...this.orders];
  }

  getSeverity(orderStatus: OrderStatus) {
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
  filterOrders() {
    this.filteredOrders = this.dataService
      .getOrders()
      .filter(
        (order) => !this.filterStatus || order.status === this.filterStatus,
      );
  }

  openAddModal() {
    this.newOrder = {
      productName: '',
      quantity: 0,
      status: 'pending',
      date: '',
    };
    this.errorMessage = '';
    this.isAddModalOpen = true;
  }

  closeModal() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
    this.errorMessage = '';
  }

  validateInput() {
    this.isValid = true;
    this.errorMessage = '';
    if (
      !this.newOrder.productName ||
      this.newOrder.quantity < 0 ||
      !this.newOrder.date
    ) {
      this.isValid = false;
      this.errorMessage =
        'Please enter valid values (name and date required, quantity >= 0).';
    }
    if (
      this.isEditModalOpen &&
      (!this.selectedOrder.productName ||
        this.selectedOrder.quantity < 0 ||
        !this.selectedOrder.date)
    ) {
      this.isValid = false;
      this.errorMessage =
        'Please enter valid values (name and date required, quantity >= 0).';
    }
  }

  addOrder() {
    if (this.isValid) {
      this.dataService.addOrder({ ...this.newOrder });
      this.filterOrders();
      this.closeModal();
    }
  }

  openEditModal(order: any) {
    this.selectedOrder = { ...order };
    this.errorMessage = '';
    this.isEditModalOpen = true;
  }

  saveOrder() {
    if (this.isValid) {
      const index = this.dataService
        .getOrders()
        .findIndex(
          (o) =>
            o.productName === this.selectedOrder.productName &&
            o.date === this.selectedOrder.date,
        );
      if (index !== -1) {
        this.dataService.getOrders()[index] = { ...this.selectedOrder };
        this.filterOrders();
      }
      this.closeModal();
    }
  }

  deleteOrder(order: any) {
    this.dataService.getOrders().splice(
      this.dataService
        .getOrders()
        .findIndex(
          (o) => o.productName === order.productName && o.date === order.date,
        ),
      1,
    );
    this.filterOrders();
  }

  completeOrder(order: any) {
    const index = this.dataService
      .getOrders()
      .findIndex(
        (o) => o.productName === order.productName && o.date === order.date,
      );
    if (index !== -1) {
      this.dataService.getOrders()[index].status = 'delivered';
      this.filterOrders();
    }
  }

  isOverdue(order: any): boolean {
    const overdueDate = new Date('2025-07-13'); // Mock threshold
    return order.status === 'pending' && new Date(order.date) < overdueDate;
  }
}
