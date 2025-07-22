import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../Types/Response';
import { ProductService } from '../../Service/Product/product.service';
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
  constructor(private productService: ProductService) { }

  totalProducts: number = 50; // Mock data
  lowStockCount: number = 3; // Mock data
  salesToday: number = 10; // Mock data
  productsData: ProductResponse[] = new Array();

  ngOnInit() {
    this.productService.getProductOfUser().subscribe((res) => {
      this.productsData = res.data;
    });
  }

  // Boilerplate function for reordering
  onReorder(product: Product) {
    // Placeholder for reorder logic
    console.log(`Reorder initiated for ${product.name}: ${product.prediction}`);
  }
  lowStockProducts() {
    let count : number = 0;
    for (let product of this.productsData) {
      if (product.quantity < product.threshold) {
        count++;
      }
    }
    return count;
  }
  // Boilerplate function for adding product
  onAddProduct() {
    // Placeholder for navigation to Add Product page
    console.log('Add Product clicked');
  }
}
