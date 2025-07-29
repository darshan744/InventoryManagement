import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { ProductService } from '../../Service/Product/product.service';
import { ShopProductsResponse } from '../../Types/Response';
import { ProductviewcardComponent } from '../../shared/productviewcard/productviewcard.component';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../Service/Cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [
    SelectModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    ProductviewcardComponent,
    ButtonModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  searchBy: 'Product' | 'Supplier' = 'Product';
  searchValue: string = '';
  private products = new Array<ShopProductsResponse>();
  filteredProducts = new Array<ShopProductsResponse>();
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.productService.getAllAvailableProducts().subscribe((response) => {
      this.products = response.data;
      this.filteredProducts = response.data;
    });
  }
  addToCart(product: ShopProductsResponse): void {
    this.cart.addToCart(product);
  }
  alreadyInCart(product: ShopProductsResponse): boolean {
    return this.cart.alreadyAddedToCart(product);
  }
  goToCart(): void {
    this.router.navigateByUrl('user/cart');
  }
  filterProducts(event: string): void {
    if (event === '') {
      this.filteredProducts = this.products;
      return;
    }
    if (this.searchBy === 'Product') {
      this.filteredProducts = this.products.filter((product) =>
        product.name.includes(event),
      );
      return;
    }
    this.filteredProducts = this.products.filter((product) =>
      product.user.name.includes(event),
    );
  }
}
