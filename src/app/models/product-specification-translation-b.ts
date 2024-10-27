import { ProductSpecificationsB } from './product-specifications-b';

export interface ProductSpecificationTranslationB {
  translatedKey: string;
  translatedValue: string;
  specificationId: number;
  productSpecification: ProductSpecificationsB;
}
