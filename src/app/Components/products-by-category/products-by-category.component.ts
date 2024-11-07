import { Component, OnInit } from '@angular/core';
import { AllproductsService } from '../../service/product/allproducts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductB } from '../../models/product-b';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../service/localiztionService/localization.service';

@Component({
  selector: 'app-products-by-category',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  imports: [CommonModule,TranslateModule],
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css'
})
export class ProductsByCategoryComponent implements OnInit {
  categoryId!: number;
  products: ProductB[] = [];
  item: any;
  isArabic!: boolean;
  p:number=1;
  ItemsPerPage : number = 6;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: AllproductsService,
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));}

  ngOnInit(): void {
    // الاشتراك في تغييرات categoryId لمتابعة التحديثات في الرابط
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!; // تحديث categoryId من الرابط
      this.loadProductsByCategory(this.categoryId); // تحميل المنتجات للفئة الحالية
    });
  }

  loadProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategoryId(categoryId).subscribe(
      (products: ProductB[]) => {
        console.log('API Response:', products);
        if (Array.isArray(products) && products.length > 0) {
          this.products = products.map(productItem => ({
            ...productItem,
            product: {
              ...productItem.product,
              translations: productItem.product.translations || [],
              images: productItem.product.images || []
            }
          }));
          console.log('Filtered products:', this.products);
        } else {
          console.warn('No products found for this category.');
          this.products = [];
        }
      },
      error => {
        console.error("Error fetching products by category:", error);
      }
    );
  }

  openProductDetails(data: any) {
    const productId = data?.id || data.product?.id;

    if (productId) {
      console.log('Navigating to product details with ID:', productId);
      this.router.navigate(['/details', productId]);
    } else {
      console.error('Product ID is undefined or data is invalid:', data);
    }
  }

  add(event: Event) {
    event.stopPropagation(); // Prevent click event from bubbling up
    this.item.emit(this.products);
  }

  getFormattedPrice(price: number): string {
    return this.isArabic ? `${price} ج.م` : `EGP ${price}`;
  }
}
