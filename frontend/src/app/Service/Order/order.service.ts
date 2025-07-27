import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  IBaseResponse,
  Order,
  OrderResponse,
  PaymentMethod,
} from '../../Types/Response';
import { CartService } from '../Cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private cart: CartService,
  ) { }

  getOrders() {
    const url = `${environment.apiUrl}/api/orders`;
    return this.http.get<IBaseResponse<OrderResponse[]>>(url, {
      withCredentials: true,
    });
  }
  placeOrderUsingCart(paymentMethod: PaymentMethod) {
    const cartItems = this.cart.cartItems;
    if (cartItems.length === 0) {
      return;
    }
    const totalPrice = this.cart.totalPriceValue;
    const body = {
      products: cartItems,
      paymentMethod: paymentMethod,
      price: totalPrice,
    };
    const url = `${environment.apiUrl}/api/order`;
    console.log(body);
    return this.http.post<IBaseResponse<Order>>(url, body, {
      withCredentials: true,
    });
  }
}
