import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/Category/category.service';
import { CategoryB } from '../../../models/category-b';
import { CommonModule } from '@angular/common';
import { AllproductsService } from '../../../service/product/allproducts.service';
import { ProductB } from '../../../models/product-b';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../service/localiztionService/localization.service';

@Component({
  selector: 'app-cats-names',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './cats-names.component.html',
  styleUrl: './cats-names.component.css'
})
export class CatsNamesComponent implements OnInit{
  isArabic!: boolean;

  categories: { id: number; categoryName: string }[] = [];
  selectedCategoryId: number | null = null;
  products: ProductB[] = [];

  constructor(
    private router:Router,
    private catservice: CategoryService,
    private productservice: AllproductsService,
    private translate: LocalizationService

  ){
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    this.getcatsname();
  }


  getcatsname() {
    const translationIndex = this.isArabic ? 1 : 0;
    this.catservice.getmainCategories().subscribe(
      (res: any[]) => {
        console.log("Sub Categories API response:", res);

        const uniqueCategoriesMap = new Map<number, { id: number; categoryName: string }>();

        res.forEach((item) => {
          const categoryId = item.category?.id;
          const categoryName = item.category?.translations?.[translationIndex]?.categoryName;

          // تأكد من أن `id` و`categoryName` موجودين وأن الفئة غير مكررة
          if (categoryId && categoryName && !uniqueCategoriesMap.has(categoryId)) {
            uniqueCategoriesMap.set(categoryId, { id: categoryId, categoryName });
          }
        });

        // تحويل الـ Map إلى Array وتعيينها إلى `categories`
        this.categories = Array.from(uniqueCategoriesMap.values());
        console.log("Extracted Unique Categories:", this.categories);
      },
      (error) => {
        console.error("Error fetching sub categories:", error);
      }
    );
  }

  selectCategory(catId: number) {
    this.selectedCategoryId = catId;
    console.log("Selected Category ID:", this.selectedCategoryId);
    if (this.selectedCategoryId) {
      this.getproducts(this.selectedCategoryId);
    }
  }

  getproducts(categoryId: number): void {
    this.productservice.getProductsByCategoryId(categoryId).subscribe(
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

  getFormattedPrice(price: number): string {
    return this.isArabic ? `${price} ج.م` : `EGP ${price}`;
  }
}


