import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../../service/Category/category.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../service/localiztionService/localization.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  isArabic!: boolean;

  categories: { id: number; categoryName: string; categoryImage: string }[] =
    [];
  selectedCategoryId: number | null = null;

  @ViewChild('brandContainer', { static: true }) brandContainer!: ElementRef;

  constructor(
    private router: Router,
    private catservice: CategoryService,
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    this.loadBrands();
    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';
  }

  loadBrands() {
    const translationIndex = this.isArabic ? 1 : 0;
    this.catservice.getmainCategories().subscribe(
      (res: any[]) => {
        console.log('Sub Categories API response:', res);

        const uniqueCategoriesMap = new Map<
          number,
          { id: number; categoryName: string; categoryImage: string }
        >();

        res.forEach((item) => {
          const categoryId = item.category?.id;
          const categoryName =
            item.category?.translations?.[translationIndex]?.categoryName;
          const categoryImage = item.category?.imageUrl; // تأكد من الوصول إلى `imageUrl` بشكل صحيح

          // التأكد من أن `id` و`categoryName` و `categoryImage` موجودين وأن الفئة غير مكررة
          if (
            categoryId &&
            categoryName &&
            categoryImage &&
            !uniqueCategoriesMap.has(categoryId)
          ) {
            uniqueCategoriesMap.set(categoryId, {
              id: categoryId,
              categoryName,
              categoryImage,
            });
          }
        });

        // تحويل الـ Map إلى Array وتعيينها إلى `categories`
        this.categories = Array.from(uniqueCategoriesMap.values());
        console.log('Extracted Unique Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching sub categories:', error);
      }
    );
  }
  selectCategory(catId: number) {
    this.selectedCategoryId = catId;
    console.log('Selected Category ID:', this.selectedCategoryId);

    this.router.navigate(['/product-by-category', this.selectedCategoryId]);
  }

  scrollLeft() {
    const container = this.brandContainer.nativeElement as HTMLElement;
    const scrollAmount = 200;

    if (this.isArabic) {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  }

  scrollRight() {
    const container = this.brandContainer.nativeElement as HTMLElement;
    const scrollAmount = 200;

    if (this.isArabic) {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  
}
