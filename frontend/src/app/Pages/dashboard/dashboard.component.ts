import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Product {
  id: number;
  name: string;
  quantity: number;
  minStockThreshold: number;
  prediction: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  totalProducts: number = 50; // Mock data
  lowStockCount: number = 3; // Mock data
  salesToday: number = 10; // Mock data
  lowStockProducts: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      quantity: 5,
      minStockThreshold: 10,
      prediction: 'Restock 50',
    },
    {
      id: 2,
      name: 'T-Shirt',
      quantity: 2,
      minStockThreshold: 5,
      prediction: 'Restock 30',
    },
    {
      id: 3,
      name: 'Phone',
      quantity: 8,
      minStockThreshold: 15,
      prediction: 'Restock 40',
    },
  ];

  ngOnInit() {
    // Placeholder for fetching real data later
    console.log('Dashboard initialized');
  }

  // Boilerplate function for reordering
  onReorder(product: Product) {
    // Placeholder for reorder logic
    console.log(`Reorder initiated for ${product.name}: ${product.prediction}`);
  }

  // Boilerplate function for adding product
  onAddProduct() {
    // Placeholder for navigation to Add Product page
    console.log('Add Product clicked');
  }
}
