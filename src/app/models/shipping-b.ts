import { OrderB } from './order-b';

export interface ShippingB {
  id: number;
  shippingAddress: string;
  shippingMethod: string;
  shippingCost: number;
  shippedDate: Date;
  estimatedDeliveryDate: Date;
  orderId: number;
  order: OrderB;
}
