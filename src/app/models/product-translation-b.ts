import { ProductB } from "./product-b";

export interface ProductTranslationB {
  name: string;
  BrandName?: string;
  Description?: string;
  ProductId: number;
  Product?: ProductB | null; // تعيين الحقل ليكون اختياريًا ويسمح بـ null
}
