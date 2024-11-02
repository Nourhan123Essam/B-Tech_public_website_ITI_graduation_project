import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllproductsService } from '../../service/product/allproducts.service';
import { CommonModule } from '@angular/common';
import { RecentProductsService } from '../../service/recent-products/recent-products.service';
import { ProductB } from '../../models/product-b';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../service/localiztionService/localization.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  isArabic!: boolean;
  product: any;
  productTranslation: any;
  productspecification: ProductB[] = [];
  constructor(
    private route: ActivatedRoute,
    private allProductsService: AllproductsService,
    private recentProductsService: RecentProductsService, // إضافة خدمة المنتجات المشاهدة
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProductDetails(id);
    } else {
      console.error('Product ID is null or undefined');
    }
  }

  getProductDetails(id: string) {
    const productId = Number(id); // تحويل id إلى رقم
    this.allProductsService.getProductById(productId).subscribe(
      (data) => {
        if (data.isSuccess) {
            this.product = data.entity; // تخزين بيانات المنتج من الكائن entity
            this.recentProductsService.addProductToRecent(this.product); // إضافة المنتج إلى قائمة المشاهدات الأخيرة
          this.product = data.entity; // تخزين بيانات المنتج من الكائن entity
        } else {
          console.warn('Product not found or error occurred:', data.msg);
        }
        console.log('Product details:', this.product);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  getSpecificationDetail(spec: any): { key: string; value: string } {
    const translation = spec.translations[this.isArabic ? 1 : 0];
    return translation
      ? { key: translation.translatedKey || 'N/A', value: translation.translatedValue || 'N/A' }
      : { key: 'N/A', value: 'N/A' };
  }

  getFormattedPrice(price: number): string {
    return this.isArabic ? `${price} ج.م` : `$${price}`;
  }

}


