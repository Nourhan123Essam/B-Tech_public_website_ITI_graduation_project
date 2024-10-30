import { AfterViewInit, Component, OnInit ,NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { ProductCategoryB } from '../../models/product-category-b';
import { CategoryB } from '../../models/category-b';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit , OnInit{
  url: string = 'assets/i18n/.json';
  isArabic!: boolean;
  isLoggedIn: boolean = true;

  categoryNames: string[] = [];

  constructor(
    private translate: LocalizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth:AuthService,
    private catservice: CategoryService,
    
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getmainCategories();
  }
  
  // getmainCategories() {
  //   this.catservice.getmainCategories().subscribe((mainCategories) => {
  //     console.log("Main Categories:", mainCategories);
  
  //     mainCategories.forEach((mainCategory) => {
  //       const mainCategoryName = mainCategory.productCategories[0].category.translations[0]?.categoryName; // الوصول إلى اسم الفئة الرئيسية
  //       const mainCategoryId = mainCategory.productCategories[0].categoryId; // الوصول إلى المعرف
  
  //       // جلب الفئات الفرعية باستخدام المعرف الرئيسي
  //       this.catservice.getebcategoriesbuMainId(mainCategoryId).subscribe(
  //         (subCategories) => {
  //           console.log(`Subcategories for ${mainCategoryId}:`, subCategories);
  
  //           const categoryData = {
  //             mainCategory: mainCategoryName,
  //             subCategories: subCategories.map(
  //               (sub) => sub.productCategories[0].category.translations[0]?.categoryName // الوصول إلى اسم الفئة الفرعية
  //             ).filter(Boolean),
  //           };
  
  //           this.categoryNames.push(categoryData);
  //         },
  //         (error) => console.error("Error fetching subcategories:", error)
  //       );
  //     });
  //   },
  //   (error) => console.error("Error fetching main categories:", error));
  // }
  
  getmainCategories() {
    this.catservice.getmainCategories().subscribe((res: any[]) => {
        console.log("Category API full response:", res);

        this.categoryNames = res.map((item) => {
            const categoryName = item.category?.translations?.[0]?.categoryName;
            console.log("Extracted Category Name:", categoryName);
            return categoryName;
        }).filter(Boolean); // فلتر للتأكد من عدم وجود قيم undefined
    }, 
    error => {
        console.error("Error fetching main categories:", error);
    });
}
  
  // getmainCategories() {
  //   this.catservice.getmainCategories().subscribe(
  //     (res: any[]) => {
  //       console.log("Category API full response:", res);

  //       // Extracting main category names and their respective subcategories
  //       this.categoryNames = res.map((item) => ({
  //         mainCategory: item.category?.translations?.[0]?.categoryName || '',
  //         subCategories: item.subCategories?.map(
  //           (sub) => sub?.translations?.[0]?.categoryName || ''
  //         ).filter(Boolean), // Filter out any undefined values
  //       }));

  //       console.log("Main Categories with Subcategories:", this.categoryNames);
  //     },
  //     (error) => {
  //       console.error("Error fetching main categories:", error);
  //     }
  //   );
  // }

  // getmainCategories() {
  //   this.catservice.getmainCategories().subscribe(
  //     (mainCategories: CategoryB[]) => { // تغيير نوع البيانات المستلمة
  //       console.log("Main Categories:", mainCategories);
  
  //       mainCategories.forEach((mainCategory) => {
  //         const mainCategoryName = mainCategory.translations[0]?.categoryName || 'Unnamed'; // الوصول إلى اسم الفئة الرئيسية
  //         const mainCategoryId = mainCategory.id; // استخدم id بدلاً من categoryId
  
  //         // جلب الفئات الفرعية باستخدام المعرف الرئيسي
  //         this.catservice.getebcategoriesbuMainId(mainCategoryId).subscribe(
  //           (subCategories: CategoryB[]) => { // تغيير نوع البيانات المستلمة
  //             console.log(`Subcategories for ${mainCategoryId}:`, subCategories);
  
  //             const categoryData = {
  //               mainCategory: mainCategoryName,
  //               subCategories: subCategories.map(
  //                 (sub) => sub.translations[0]?.categoryName || 'Unnamed' // الوصول إلى اسم الفئة الفرعية
  //               ).filter(Boolean),
  //             };
  
  //             this.categoryNames.push(categoryData);
  //           },
  //           (error) => console.error("Error fetching subcategories:", error)
  //         );
  //       });
  //     },
  //     (error) => console.error("Error fetching main categories:", error)
  //   );
  // }
  
  
  
  
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
  
}
