import { Component } from '@angular/core';
import { DataService } from '../../Service/data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  products: any;
  orders: any;

  constructor(private dataService: DataService) {
    this.products = this.dataService.getProducts();
    this.orders = this.dataService.getOrders();
  }

  getLowStockCount(): number {
    return this.products.filter((p: any) => p.quantity < p.threshold).length;
  }

  getOrderStatusCount(status: string): number {
    return this.orders.filter((o: any) => o.status === status).length;
  }
}
