import { Component } from '@angular/core';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { CartService } from '../../Service/Cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent , CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private cartService: CartService) { }

  get cart() {
    
    return this.cartService.cart$;
  }
}
