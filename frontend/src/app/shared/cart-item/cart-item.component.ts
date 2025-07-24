import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ProductResponse, ShopProductsResponse } from '../../Types/Response';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { CartService } from '../../Service/Cart/cart.service';
@Component({
  selector: 'app-cart-item',
  imports: [
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  product = input<ProductResponse | ShopProductsResponse>(
    {} as ProductResponse | ShopProductsResponse,
  );
  constructor(private cartService: CartService) { }
  get name() {
    return this.product().name;
  }
  get image() {
    return `${environment.apiUrl}/${this.product().image}`;
  }
  get quantity() {
    return this.product().quantity;
  }
  get description() {
    return this.product().description;
  }
  get user() {
    const product = this.product();
    return product && 'user' in product ? product.user.name : '';
  }
  get price() {
    return this.product().price;
  }

  increaseQuantity() {
    this.product().quantity++;
    this.cartService.updateTotalPrice();
  }

  decreaseQuantity() {
    if (this.product().quantity > 1) {
      this.product().quantity--;
      this.cartService.updateTotalPrice();
    }
  }
}
