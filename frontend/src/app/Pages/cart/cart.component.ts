import { Component } from '@angular/core';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';
import { CartService } from '../../Service/Cart/cart.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { PaymentMethod } from '../../Types/Response';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../Service/Toast/toast.service';
@Component({
  selector: 'app-cart',
  imports: [
    CartItemComponent,
    CommonModule,
    ButtonModule,
    SelectModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  paymentMethods = [
    {
      value: 'CASH_ON_DELIVERY',
      label: 'Cash on Delivery',
      icon: 'pi-wallet',
    },
    {
      value: 'UPI',
      label: 'UPI',
      icon: 'pi-mobile',
    },
    {
      value: 'CARD',
      label: 'Card Payment',
      icon: 'pi-credit-card',
    },
  ];
  selectedPaymentMethod: PaymentMethod | null = null;
  constructor(
    private cartService: CartService,
    private toastService: ToastService,
  ) { }
  get totalPrice() {
    return this.cartService.totalPrice$;
  }
  get cart() {
    return this.cartService.cart$;
  }

  buyNow() {
    if (!this.selectedPaymentMethod) {
      this.toastService.error(
        'Please select a payement method',
        'Payment Method Required',
      );
      return;
    }
  }
}
