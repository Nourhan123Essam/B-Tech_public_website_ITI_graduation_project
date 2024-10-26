import { ProductB } from './product-b';
import { CategoryB } from './category-b';

export interface ProductCategoryB {
  productId: number;
  product: ProductB;
  categoryId: number;
  category: CategoryB;
  isMainCategory: boolean;
}
