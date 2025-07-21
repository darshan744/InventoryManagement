import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Service/Product/product.service';
import { ProductResponse, ShopProductsResponse } from '../../Types/Response';
@Component({
  selector: 'app-shop',
  imports: [SelectModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  searchBy: 'Product' | 'Supplier' = 'Product';
  products = new Array<ShopProductsResponse>();
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getAllAvailableProducts().subscribe((response) => {
      this.products = response.data;
      console.log(this.products);
    });
  }
}
