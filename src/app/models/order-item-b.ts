import { OrderB } from './order-b';
import { ProductB } from './product-b';

export interface OrderItemB {
  id: number;
  orderId: number;
  order: OrderB;
  productId: number;
  product: ProductB;
  quantity: number;
}
