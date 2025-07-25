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

export type UnitType = 'PCS' | 'KG' | 'LITERS' | 'BOX' | 'OTHER';
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
export type OrderType = 'RESTOCK' | 'ISSUE';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export type OrderResponse = {
  id: string;
  quantity: number;
  status: OrderStatus;
  date: Date;
  notes: string | null;
  userId: string;
  price: number;
  paymentMethod: PaymentMethod;
};
export type ShopProductsResponse = {
  user: {
    name: string;
  };
  id: string;
  name: string;
  quantity: number;
  image: string | null;
  description: string;
  threshold: number;
  unit: UnitType;
  category: string | null;
  lastRestocked: Date;
  price: number;
};

// -------------------------------------- Frontend Types --------------------------------------
export type PaymentMethod = 'CARD' | 'CASH_ON_DELIVERY' | 'UPI';
