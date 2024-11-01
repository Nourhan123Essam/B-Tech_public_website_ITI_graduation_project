import { ProductCategoryB } from './product-category-b';
import { CategoryTranslationB } from './category-translation-b';

export interface CategoryB {
  categoryId: number;
  category: any;
  id: number;
  imageUrl?: string;
  productCategories: ProductCategoryB[];
  translations: CategoryTranslationB[];
}
