import { AfterViewInit, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { LocalizationService } from '../../service/localiztionService/localization.service';
import { AuthService } from '../../service/Identity/auth.service';
import { CategoryService } from '../../service/Category/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit {
  url: string = 'assets/i18n/.json';
  isArabic!: boolean;
  isLoggedIn: boolean = true;
  searchQuery: string = '';


  constructor(
    private translate: LocalizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth:AuthService,
    private catservice:CategoryService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  useLanguage() {
    this.translate.ChangeLanguage();
  }

  opensignin() {
    this.router.navigate(['remember-by-phoone']);
  }
  signOut() {
    this.auth.signOut().subscribe(
      () => {
        localStorage.removeItem('authToken'); // مسح التوكن من التخزين المحلي
        this.isLoggedIn = false; // تحديث حالة تسجيل الدخول
        this.router.navigate(['/']); // إعادة توجيه المستخدم للصفحة الرئيسية
      },
      (error) => console.error('Logout failed:', error)
    );
  }

  onSearch(event: Event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    if (this.searchQuery) {
      this.catservice.getProductsByCategoryName(this.searchQuery).subscribe(
        (res) => {
          if (res && res.length) {
            // تصفية المنتجات بحيث تتطابق فقط مع اسم الكاتيجوري المطلوب
            const filteredProducts = res.filter((product: any) =>
              product.category.translations.some(
                (translation: any) => translation.categoryName.toLowerCase() === this.searchQuery.toLowerCase()
              )
            );
  
            if (filteredProducts.length) {
              // التنقل إلى صفحة نتائج البحث وتمرير المنتجات كـ state
              this.router.navigate(['/searchresult'], {
                state: { products: filteredProducts }
              });
            } else {
              console.log("No matching products found for this category");
            }
          } else {
            console.log("No products found for this category");
          }
        },
        error => {
          console.error("Error fetching products:", error);
        }
      );
    }
  }
  
  
  
  
  }

