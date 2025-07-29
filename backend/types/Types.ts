import * as PrismaTypes from "../generated/prisma/index";

export type GetOrdersResponse = {
  OrderItem: {
    product: { name: string; image: string | null; description: string };
    quantity: number;
    productPrice: number;
    status: PrismaTypes.$Enums.OrderStatus;
  }[];
} & {
  id: string;
  price: number;
  date: Date;
  notes: string | null;
  paymentMethod: PrismaTypes.$Enums.PaymentMethod;
  buyerId: string;
};
export type AllProductResponse = {
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
  unit: PrismaTypes.$Enums.UnitType;
  category: string | null;
  lastRestocked: Date;
};

export type RequestOrders = {
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
  status: PrismaTypes.$Enums.OrderStatus;
};

export type UpdateRequestOrderStatus = {
  id: string;
  status: PrismaTypes.$Enums.OrderStatus;
};
