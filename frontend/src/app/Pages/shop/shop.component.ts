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
import { ActivatedRoute, Router } from '@angular/router';
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
  products = new Array<ShopProductsResponse>();
  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.productService.getAllAvailableProducts().subscribe((response) => {
      this.products = response.data;
    });
  }
  addToCart(product: ShopProductsResponse) {
    this.cart.addToCart(product);
  }
  alreadyInCart(product: ShopProductsResponse) {
    return this.cart.alreadyAddedToCart(product);
  }
  goToCart() {
    this.router.navigate(['/cart'], { relativeTo: this.activatedRoute });
  }
}
