import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentProductsService {
  private localStorageKey = 'lastViewedProducts';

  constructor() {}

  addProductToRecent(product: any): void {
    let recentProducts = this.getRecentProducts();
    
    const exists = recentProducts.find((p: any) => p.id === product.id);
    if (!exists) {
      recentProducts.unshift(product); // أضف المنتج إلى بداية القائمة
      if (recentProducts.length > 12) { // حدّد أقصى عدد للمنتجات المشاهدة مؤخرًا (مثلاً 5)
        recentProducts.pop(); // احذف الأقدم إذا تجاوزت العدد المسموح
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(recentProducts));
    }
  }

  getRecentProducts(): any[] {
    const recent = localStorage.getItem(this.localStorageKey);
    return recent ? JSON.parse(recent) : [];
  }
}
