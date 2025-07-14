import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  products = [
    { name: 'Laptop', quantity: 5, threshold: 10 },
    { name: 'T-Shirt', quantity: 2, threshold: 5 },
    { name: 'Phone', quantity: 8, threshold: 10 },
  ];
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

  getProducts() {
    return [...this.products];
  }

  getOrders() {
    return [...this.orders];
  }

  addOrder(order: any) {
    this.orders.push(order);
  }

  updateProduct(product: any) {
    const index = this.products.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      this.products[index] = product;
    }
  }
}
