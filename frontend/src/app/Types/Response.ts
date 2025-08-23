
export type PaymentMethod = "CARD" | "CASH_ON_DELIVERY" | "UPI";

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";
export type UnitType = "PCS" | "KG" | "LITERS" | "BOX" | "OTHER";

export type Product = {
    name: string;
    id: string;
    image: string | null;
    description: string;
    price: number;
    quantity: number;
    threshold: number;
    unit: UnitType;
    category: string | null;
    lastRestocked: Date;
    userId: string;
}
export type Order ={
    id: string;
    date: Date;
    notes: string | null;
    price: number;
    paymentMethod: PaymentMethod;
    buyerId: string;
};
export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    productPrice: number;
    quantity: number;
    sellerId: string;
    status: OrderStatus;
}
export type OrderResponse = {
    OrderItem: {
        product: {
            name: string;
            image: string | null;
            description: string;
        };
        quantity: number;
        productPrice: number;
        status: OrderStatus;
    }[];
} & {
    id: string;
    price: number;
    date: Date;
    notes: string | null;
    paymentMethod: PaymentMethod;
    buyerId: string;
}
export type RequestOrderResponse ={
    product: {
        name: string;
        image: string | null;
        description: string;
    };
} & {
    id: string;
    quantity: number;
    orderId: string;
    productId: string;
    productPrice: number;
    sellerId: string;
    status: OrderStatus;
}
export type RequestOrderStatusChange = {
    id: string;
    status: OrderStatus;
}

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

export type ShopProductsResponse = {
    user: {
        id: string;
        name: string;
    };
} & {
    id: string;
    name: string;
    image: string | null;
    description: string;
    price: number;
    quantity: number;
    threshold: number;
    unit: UnitType;
    category: string | null;
    lastRestocked: Date;
}

export type SignUpResponse = {
  user: {
    id: string;
    email: string;
  };
};
