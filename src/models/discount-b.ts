import { OrderB } from './order-b';

export interface DiscountB {
  id: number;
  name: string;
  code?: string;
  type: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  isOneTimeUse: boolean;
  appliesToShipping: boolean;
  isActive: boolean;
  minimumPurchaseAmount: number;
  orders: OrderB[];
}

