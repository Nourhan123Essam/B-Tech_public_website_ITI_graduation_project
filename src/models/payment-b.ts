import { OrderB } from './order-b';

export interface PaymentB {
  id: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  gatewayResponse: string;
  orderId: number;
  order: OrderB;
}
