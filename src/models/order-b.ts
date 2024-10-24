import { DiscountB } from './discount-b';
import { ApplicationUserB } from './application-user-b';
import { ShippingB } from './shipping-b';
import { PaymentB } from './payment-b';
import { OrderItemB } from './order-item-b';

export interface OrderB {
  id: number;
  orderDate: Date;
  totalPrice: number;
  currentStatus: Status;
  orderItems: OrderItemB[];
  discounts: DiscountB[];
  applicationUserId: string;
  applicationUser: ApplicationUserB;
  shippingId: number;
  shipping: ShippingB;
  paymentId: number;
  payment: PaymentB;
}

export enum Status {
  InCart = 'InCart',
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}
