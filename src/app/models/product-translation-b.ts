import { ProductB } from "./product-b";

export interface ProductTranslationB {
<<<<<<< HEAD
  Name: string;
=======
  name: string;
>>>>>>> menna
  BrandName?: string;
  Description?: string;
  ProductId: number;
  Product?: ProductB | null; // تعيين الحقل ليكون اختياريًا ويسمح بـ null
}
