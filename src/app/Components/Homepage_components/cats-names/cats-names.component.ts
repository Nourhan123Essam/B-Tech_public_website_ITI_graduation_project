// import { Component, OnInit } from '@angular/core';
// import { CategoryService } from '../../../service/Category/category.service';
// import { CategoryB } from '../../../models/category-b';
// import { CommonModule } from '@angular/common';
// import { AllproductsService } from '../../../service/product/allproducts.service';
// import { ProductB } from '../../../models/product-b';

// @Component({
//   selector: 'app-cats-names',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cats-names.component.html',
//   styleUrl: './cats-names.component.css'
// })
// export class CatsNamesComponent implements OnInit{
  
//   categories: { id: number; categoryName: string }[] = []; 
//   selectedCategoryId: number | null = null;
//   products: ProductB[] = []; 

//   constructor( 
//     private catservice: CategoryService,
//     private productservice: AllproductsService
//   ){}
  
//   ngOnInit(): void {
//     this.getcatsname();
//   }

  

  
  
//   getcatsname() {
//     this.catservice.getmainCategories().subscribe(
//       (res: any[]) => {
//         console.log("Sub Categories API response:", res);
//         this.categories = res
//           .map((item) => ({
//             id: item.category?.id,
//             categoryName: item.category?.translations?.[0]?.categoryName
//           }))
//           .filter(category => category.id && category.categoryName); // التأكد من وجود قيم صالحة
//         console.log("Extracted Categories:", this.categories);
//       },
//       (error) => {
//         console.error("Error fetching sub categories:", error);
//       }
//     );
//   }

//   selectCategory(catId: number) {
//     this.selectedCategoryId = catId;
//     console.log("Selected Category ID:", this.selectedCategoryId); 
//     if (this.selectedCategoryId) {
//       this.getproducts(this.selectedCategoryId);
//     }
//   }

//  getproducts(categoryId: number): void {
//   this.productservice.getProductsByCategoryId(categoryId).subscribe(
//     (products: ProductB[]) => {
//       if (Array.isArray(products)) {
//         console.log('Product entity data:', products); 
//         this.products = products; 
//         console.log('Filtered products:', this.products); // تسجيل هنا
//       } else {
//         console.error('Unexpected data format:', products);
//       }
//     },
//     error => {
//       console.error("Error fetching products by category:", error);
//     }
//   );

// }



// }
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/Category/category.service';
import { CategoryB } from '../../../models/category-b';
import { CommonModule } from '@angular/common';
import { AllproductsService } from '../../../service/product/allproducts.service';
import { ProductB } from '../../../models/product-b';

@Component({
  selector: 'app-cats-names',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cats-names.component.html',
  styleUrls: ['./cats-names.component.css']
})
export class CatsNamesComponent implements OnInit {
  
  categories: { id: number; categoryName: string }[] = []; 
  selectedCategoryId: number | null = null;
  products: ProductB[] = []; 

  constructor( 
    private catservice: CategoryService,
    private productservice: AllproductsService
  ){}

  ngOnInit(): void {
    this.getcatsname();
  }

  getcatsname() {
    this.catservice.getmainCategories().subscribe(
      (res: any[]) => {
        console.log("Sub Categories API response:", res);
        this.categories = res.map((item) => ({
          id: item.category?.id,
          categoryName: item.category?.translations?.[0]?.categoryName
        })).filter(category => category.id && category.categoryName);
        console.log("Extracted Categories:", this.categories);
      },
      (error) => {
        console.error("Error fetching sub categories:", error);
      }
    );
  }

  selectCategory(catId: number) {
    this.selectedCategoryId = catId;
    console.log("Selected Category ID:", this.selectedCategoryId);
    this.getproducts(this.selectedCategoryId);
  }

  getproducts(categoryId: number): void {
    this.productservice.getProductsByCategoryId(categoryId).subscribe(
      (products: ProductB[]) => {
        if (Array.isArray(products)) {
          console.log('Product entity data:', products);
          this.products = products;
          console.log('Filtered products:', this.products);
        } else {
          console.error('Unexpected data format:', products);
        }
      },
      error => {
        console.error("Error fetching products by category:", error);
      }
    );
  }

  trackByProductId(index: number, product: ProductB): number {
    return product.id;
  }
}
