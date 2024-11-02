import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentProductsService {
  private localStorageKey = 'lastViewedProducts';

  constructor() {}

  addProductToRecent(product: any): void {
    let recentProducts = this.getRecentProducts();

    // تحقق من وجود المنتج في القائمة بالفعل
    const exists = recentProducts.find((p: any) => p.id === product.id);
    if (!exists) {
      // حفظ المنتج مع الحقول المطلوبة فقط
      const productData = {
        id: product.id,
        name: product.translations?.[0]?.name || 'Unknown Product',
        image: product.images?.[0]?.url || 'https://placeholder.com/150'
      };
      
      recentProducts.unshift(productData); // أضف المنتج إلى بداية القائمة

      // الحد الأقصى لعدد المنتجات المسجلة مؤخرًا (يمكنك تغييره من 12 إلى أي عدد تريده)
      if (recentProducts.length > 12) {
        recentProducts.pop(); // حذف الأقدم إذا تجاوز العدد المحدد
      }

      // حفظ القائمة في localStorage
      localStorage.setItem(this.localStorageKey, JSON.stringify(recentProducts));
    }
  }

  getRecentProducts(): any[] {
    const recent = localStorage.getItem(this.localStorageKey);
    return recent ? JSON.parse(recent) : [];
  }
}

