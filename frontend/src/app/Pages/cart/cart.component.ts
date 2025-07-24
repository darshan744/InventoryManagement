import { Component } from '@angular/core';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { CartService } from '../../Service/Cart/cart.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CommonModule , ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private cartService: CartService) { }
  get totalPrice() {
    return this.cartService.totalPrice$;
  }
  get cart() {
    return this.cartService.cart$;
  }
}
