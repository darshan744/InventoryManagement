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
  unit: UnitType;
  category: string | null;
  lastRestocked: Date;
  userId: string;

  constructor(
    id: string,
    name: string,
    quantity: number,
    threshold: number,
    unit: UnitType,
    category: string | null,
    lastRestocked: Date,
    userId: string,
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.threshold = threshold;
    this.unit = unit;
    this.category = category;
    this.lastRestocked = lastRestocked;
    this.userId = userId;
  }
}
export type OrderType = 'RESTOCK' | 'ISSUE';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export type OrderResponse = {
  id: string;
  productId: string;
  quantity: number;
  type: OrderType;
  status: OrderStatus;
  date: Date;
  notes: string | null;
  userId: string;
};
export type ShopProductsResponse = {
  user: {
    name: string;
  };
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  unit: UnitType;
  category: string | null;
  lastRestocked: Date;
};
