import { ProductB } from './product-b';
import { ProductSpecificationTranslationB } from './product-specification-translation-b';

export interface ProductSpecificationsB {
  id: number;
  productId: number;
  product: ProductB;
  translations: ProductSpecificationTranslationB[];
}
