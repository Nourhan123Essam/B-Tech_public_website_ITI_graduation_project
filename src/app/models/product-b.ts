import { ProductCategoryB } from './product-category-b';
import { ProductImageB } from './product-image-b';
import { ProductSpecificationsB } from './product-specifications-b';
import { ProductTranslationB } from './product-translation-b'
import { OrderItemB } from './order-item-b';

export interface ProductB {
displayName: any;
  product: any;
  id: number;
  price: number;
  stockQuantity: number;
  productCategories: ProductCategoryB[];
  images: ProductImageB[];
  orderItems: OrderItemB[];
  specifications: ProductSpecificationsB[];
  translations: ProductTranslationB[];
}
