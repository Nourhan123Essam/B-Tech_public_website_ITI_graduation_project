import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllproductsService } from '../../service/product/allproducts.service';
import { ProductB } from '../../models/product-b';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../service/localiztionService/localization.service';

@Component({
  selector: 'app-products-by-brand',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './products-by-brand.component.html',
  styleUrl: './products-by-brand.component.css'
})
export class ProductsByBrandComponent implements OnInit {
  isArabic!: boolean;


  brandName: string = '';
  products: any[] = [];
  item: any;

  constructor(
    private router:Router,

    private route: ActivatedRoute,
    private productservice: AllproductsService,
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    this.brandName = this.route.snapshot.paramMap.get('brandName') || '';
    this.fetchProductsByBrand(this.brandName);
  }

  fetchProductsByBrand(brandName: string): void{
    this.productservice.getallproducts().subscribe((response: any) => {
      const allProducts: ProductB[] = response.entity || []; // الوصول إلى المنتجات داخل entity

      this.products = allProducts.filter(product =>
        product.translations.some(translation => translation.brandName?.toLowerCase() === brandName.toLocaleLowerCase())
      );

      console.log("Filtered products:", this.products); // التحقق من المنتجات بعد التصفية
    },
    error => {
      console.error("Error fetching products:", error); // في حالة حدوث خطأ في جلب البيانات
    });
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
  return this.isArabic ? `${price} ج.م` : `$${price}`;
}
}
