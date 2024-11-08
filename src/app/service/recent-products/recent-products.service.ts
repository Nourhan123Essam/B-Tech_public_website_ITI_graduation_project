import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentProductsService {
  private localStorageKey = 'lastViewedProducts';
  private maxDays = 30; // مدة الحفظ بالأيام

  constructor() {}

  addProductToRecent(product: any): void {
    let recentProducts = this.getRecentProducts();

    // تحقق من وجود المنتج في القائمة بالفعل
    const exists = recentProducts.find((p: any) => p.id === product.id);
    if (!exists) {
     
      // حفظ المنتج مع الحقول المطلوبة فقط وإضافة التاريخ
      const productData = {
        id: product.id,
        nameAr: product.translations?.[1]?.name || 'منتج غير معرف',
        nameEn: product.translations?.[0]?.name || 'Unknown Product',

        image: product.images?.[0]?.url || 'https://placeholder.com/150',
        addedDate: new Date().getTime() // تاريخ إضافة المنتج بالميللي ثانية
      };
      
      recentProducts.unshift(productData); // أضف المنتج إلى بداية القائمة

      // حفظ القائمة في localStorage
      localStorage.setItem(this.localStorageKey, JSON.stringify(recentProducts));
    }
  }

  getRecentProducts(): any[] {
    const recent = localStorage.getItem(this.localStorageKey);
    let recentProducts = recent ? JSON.parse(recent) : [];

    // فلترة المنتجات حسب مدة الحفظ (30 يومًا)
    const currentTime = new Date().getTime();
    recentProducts = recentProducts.filter((product: any) => {
      const productAgeInDays = (currentTime - product.addedDate) / (1000 * 60 * 60 * 24);
      return productAgeInDays <= this.maxDays;
    });

    // تحديث `localStorage` بعد الفلترة
    localStorage.setItem(this.localStorageKey, JSON.stringify(recentProducts));

    return recentProducts;
  }
}