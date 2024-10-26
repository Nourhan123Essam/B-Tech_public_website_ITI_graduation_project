import { ProductB } from './product-b';

export interface ProductImageB {
  id: number;
  url: string;
  productId: number;
  product: ProductB;
}
