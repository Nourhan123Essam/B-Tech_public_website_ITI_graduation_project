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
import { Observable } from 'rxjs';


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
  public get router(): Router {
    return this._router;
  }
  public set router(value: Router) {
    this._router = value;
  }
  url: string = 'assets/i18n/.json';
  isArabic!: boolean;
  // isLoggedIn: boolean = true;
  searchQuery: string = '';
  isUserLoggedIn: boolean = false;


  // categoryNames: string[] = [];
  // categories: any;
  categories: { id: number; categoryName: string }[] = []; 

  searchTerm: string = ''; // Holds the search term
  searchResults: CategoryB[] = []; // Holds the search results
  selectedCategoryId: number | null = null;
  subCategories: { id: number; categoryName: string }[] = []; // Holds the subcategories of the selected main category


  constructor(
    private translate: LocalizationService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private auth:AuthService,
    private catservice: CategoryService,

    // private catservice:CategoryService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getallcategory();
    this.isUserLoggedIn = this.auth.isLoggedIn();
  }

  



getallcategory() {
  this.catservice.getmainCategories().subscribe(
    (res: any[]) => {
      console.log("main Categories API response:", res);

      // Use reduce to create a unique list directly
      this.categories = res.reduce((uniqueCategories, item) => {
        const translationIndex = this.isArabic ? 1 : 0;
        const categoryId = item.category?.id;
        const categoryName = item.category?.translations?.[translationIndex]?.categoryName;

        if (categoryId && categoryName && !uniqueCategories.some((cat: { id: any; }) => cat.id === categoryId)) {
          uniqueCategories.push({ id: categoryId, categoryName });
        }
        return uniqueCategories;
      }, []);
      
      console.log("Extracted Unique Categories:", this.categories);
    },
    (error) => {
      console.error("Error fetching main categories:", error);
    }
  );
}

onCategoryHover(categoryId: number) {
 
   if (this.selectedCategoryId !== categoryId) {
    this.subCategories = []; // Clear previous subcategories
    this.selectedCategoryId = categoryId;
    console.log("Hovered Category ID:", this.selectedCategoryId);
    this.getSubCategories(this.selectedCategoryId); // Load new subcategories
  }
}

getSubCategories(categoryId: number) {
  this.catservice.getsubcategoriesbuyMainId(categoryId).subscribe(
    (res: CategoryB[]) => {
      console.log("Subcategories API response:", res);
      this.subCategories = res.map(subCategory => ({
        id: subCategory.id, // Ensure you extract the ID
        categoryName: subCategory.translations?.[this.isArabic ? 1 : 0]?.categoryName || ''
      })).filter(Boolean);
      console.log("Fetched Subcategories:", this.subCategories);
    },
    (error) => {
      console.error("Error fetching subcategories:", error);
    }
  );
}

onSubCategorySelect(subCategoryId: number) {
  this.selectedCategoryId = subCategoryId; // Store the selected subcategory ID
  console.log("Selected Subcategory ID:", subCategoryId);
  // this.router.navigate(['/product-by-category', subCategoryId]); // Navigate to the product page
  this.router.navigate(['/product-by-category', this.selectedCategoryId]).then(() => {
    // إعادة ضبط selectedCategoryId بعد التنقل لضمان استقبال اختيارات جديدة
    this.selectedCategoryId = null;
  });
}


  useLanguage() {
    this.translate.ChangeLanguage();
  }

  opensignin() {
    this.router.navigate(['remember-by-phoone']);
  }
  onSignOut() {
    this.auth.signOut();
    this.isUserLoggedIn = false;
    this.router.navigate(['/']);  // توجيه المستخدم إلى صفحة تسجيل الدخول
  }
  // signOut() {
  //   this.auth.signOut().subscribe(
  //     () => {
  //       localStorage.removeItem('authToken'); // مسح التوكن من التخزين المحلي
  //       this.isLoggedIn = false; // تحديث حالة تسجيل الدخول
  //       this.router.navigate(['/sign-in']); // إعادة توجيه المستخدم للصفحة الرئيسية
  //     },
  //     (error) => console.error('Logout failed:', error)
  //   );
  // }

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

