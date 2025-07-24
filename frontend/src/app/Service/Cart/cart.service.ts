import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductResponse, ShopProductsResponse } from '../../Types/Response';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartLen = new BehaviorSubject<number>(0);
  cartLen$ = this.cartLen.asObservable();
  private cart = new BehaviorSubject<
    (ProductResponse | ShopProductsResponse)[]
  >([]);
  cart$ = this.cart.asObservable();
  private totalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPrice.asObservable();
  constructor() { }

  addToCart(product: ProductResponse | ShopProductsResponse) {
    const currentCart = this.cart.getValue();
    this.cartLen.next(currentCart.length + 1);
    product.quantity = 1;
    this.totalPrice.next(
      this.totalPrice.getValue() + product.price * product.quantity,
    );
    this.cart.next([...currentCart, product]);
  }
  updateTotalPrice() {
    const products = this.cart.getValue();
    let total = 0;
    for (const prod of products) {
      total += prod.price * prod.quantity;
    }
    this.totalPrice.next(total);
  }
  alreadyAddedToCart(product: ProductResponse | ShopProductsResponse) {
    const currentCart = this.cart.getValue();
    return currentCart.includes(product);
  }
}
