import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders = [
    {
      productName: 'Laptop',
      quantity: 5,
      status: 'pending',
      date: '2025-07-12',
    },
    {
      productName: 'T-Shirt',
      quantity: 10,
      status: 'in-transit',
      date: '2025-07-13',
    },
    {
      productName: 'Phone',
      quantity: 3,
      status: 'delivered',
      date: '2025-07-11',
    },
  ];
  filteredOrders = [...this.orders];
  filterStatus: string = '';
  newOrder = { productName: '', quantity: 0, status: 'pending', date: '' };
  selectedOrder = { productName: '', quantity: 0, status: 'pending', date: '' };
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  filterOrders() {
    this.filteredOrders = this.orders.filter(
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
    this.isAddModalOpen = true;
  }

  closeModal() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
  }

  addOrder() {
    if (
      this.newOrder.productName &&
      this.newOrder.quantity >= 0 &&
      this.newOrder.date
    ) {
      this.orders.push({ ...this.newOrder });
      this.filterOrders();
      this.closeModal();
    }
  }

  openEditModal(order: any) {
    this.selectedOrder = { ...order };
    this.isEditModalOpen = true;
  }

  saveOrder() {
    const index = this.orders.findIndex(
      (o) =>
        o.productName === this.selectedOrder.productName &&
        o.date === this.selectedOrder.date,
    );
    if (index !== -1) {
      this.orders[index] = { ...this.selectedOrder };
      this.filterOrders();
    }
    this.closeModal();
  }

  deleteOrder(order: any) {
    this.orders = this.orders.filter(
      (o) => o.productName !== order.productName || o.date !== order.date,
    );
    this.filterOrders();
  }

  completeOrder(order: any) {
    const index = this.orders.findIndex(
      (o) => o.productName === order.productName && o.date === order.date,
    );
    if (index !== -1) {
      this.orders[index].status = 'delivered';
      this.filterOrders();
    }
  }
}
