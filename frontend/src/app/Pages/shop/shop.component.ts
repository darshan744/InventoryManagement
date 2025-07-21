import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { ProductService } from '../../Service/Product/product.service';
import { ShopProductsResponse } from '../../Types/Response';
import { ProductviewcardComponent } from '../../shared/productviewcard/productviewcard.component';
@Component({
  selector: 'app-shop',
  imports: [SelectModule, InputTextModule, FormsModule, CommonModule , ProductviewcardComponent],
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
    });
  }
}
