import { ProductB } from "./product-b";

export interface ProductTranslationB {
  name: string;
  brandName?: string;
  description?: string;
  productId: number;
  Product?: ProductB | null; // تعيين الحقل ليكون اختياريًا ويسمح بـ null
}
