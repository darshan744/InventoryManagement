import * as types from '../../../../BackendType';

export type PaymentMethod = types.$Enums.PaymentMethod;
export type OrderStatus = types.$Enums.OrderStatus;
export type UnitType = types.$Enums.UnitType;

export type Product = types.Product;
export type Order = types.Order;
export type OrderItem = types.OrderItem;
export type OrderResponse = types.GetOrdersResponse;
export type RequestOrderResponse = types.RequestOrders;
export type IBaseResponse<T> = {
  message: string;
  data: T;
};
export type LoginResponse = {
  user: {
    id: string;
    email: string;
    name: string;
  };
};
export const UnitTypes: UnitType[] = ['PCS', 'KG', 'LITERS', 'BOX', 'OTHER'];
export class ProductResponse {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  image: string | null = null;
  unit: UnitType;
  category: string | null;
  lastRestocked: Date;
  userId: string;
  description: string;
  price: number;
  constructor() {
    this.id = '';
    this.name = '';
    this.quantity = 0;
    this.threshold = 0;
    this.unit = 'PCS';
    this.category = '';
    this.lastRestocked = new Date();
    this.userId = '';
    this.description = '';
    this.price = 0;
  }
}
export type ShopProductsResponse = types.AllProductResponse;
