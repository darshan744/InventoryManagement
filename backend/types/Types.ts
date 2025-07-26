import * as PrismaTypes from "../generated/prisma/index";
export type GetOrdersResponse = {
  OrderItem: {
    productPrice: number;
    quantity: number;
    product: { image: string | null; name: string; description: string };
  }[];
} & {
  id: string;
  status: PrismaTypes.$Enums.OrderStatus;
  date: Date;
  notes: string | null;
  price: number;
  paymentMethod: PrismaTypes.$Enums.PaymentMethod;
  buyerId: string;
}[];
