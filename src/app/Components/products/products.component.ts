import { Component, OnInit } from '@angular/core';
import { AllproductsService } from '../../service/product/allproducts.service';
import { CategoryService } from '../../service/Category/category.service';
import { Router } from '@angular/router';
import { ProductListComponent } from '../ProductPage_Component/product-list/product-list.component';
import { SelectCheckboxComponent } from '../ProductPage_Component/select-checkbox/select-checkbox.component';
import { ProductB } from '../../models/product-b';
import { CategoryB } from '../../models/category-b';
import { CommonModule } from '@angular/common';
import { ProductCategoryB } from '../../models/product-category-b';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent, SelectCheckboxComponent,CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductB[] = [];
  filteredProducts: ProductB[] = [];
  categories: CategoryB[] = [];
  categoryNames: string[] = [];
  brands: string[] = [];


  cartProducts: any[] = [];
  productCategories:ProductCategoryB[]=[];

  selectedCategory: string | null = null;
  selectedBrand: string | null = null;
 selectedPrice: any;

 isCategoryOpen: boolean = false;
isBrandOpen: boolean = false;
isPriceOpen: boolean = false;

  priceOptions = [
    { id: 1, name: 'Under 1000', min: 0, max: 999 },
    { id: 2, name: '1000 - 15000', min: 1000, max: 15000 },
    { id: 3, name: '15000 - 25000', min: 15001, max: 25000 },
    { id: 4, name: 'Over 25000', min: 25001, max: Infinity }
  ];

  priceNames = this.priceOptions.map(option => option.name);

  constructor(
    private service: AllproductsService,
    private catservice: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
       }
       getAllProducts() {
        this.service.getallproducts().subscribe(
          (res: any) => {
            console.log("Products API response:", res);
            if (res.isSuccess && Array.isArray(res.entity)) {
              this.products = res.entity;
              this.filteredProducts = this.products;

              // استخراج أسماء البراندات بدون تكرار
              this.getAllBrands();
            } else {
              console.error("Unexpected data format:", res);
            }
          },
          error => {
            console.error("Error fetching products:", error);
          }
        );
      }

      getAllBrands(): void {
        const brandSet = new Set<string>();
        this.products.forEach(product => {
          const brand = product.translations?.[0]?.brandName;
          if (brand) {
            brandSet.add(brand); // إضافة البراندات بدون تكرار
          }
        });
        this.brands = Array.from(brandSet); // تحويل Set إلى مصفوفة
      }

  getAllCategory() {
    this.catservice.getallcategory().subscribe((res: any) => {
        if (res.isSuccess && Array.isArray(res.entity)) {
            this.categories = res.entity;
            this.categoryNames = res.entity.map((category: CategoryB) =>
              category.translations?.[0]?.categoryName
            ).filter(Boolean);
        }
    });
  }




  onCategoryChange(categoryName: string | null): void {
    this.selectedCategory = categoryName;

    const selectedCategory = this.categories.find(
      category => category.translations?.[0]?.categoryName === categoryName
    );

    if (selectedCategory) {
      this.service.getProductsByCategoryId(selectedCategory.id).subscribe(
        (products: ProductB[]) => {
          if (Array.isArray(products)) {
            console.log('Product entity data:', products);
            this.filteredProducts = products;
            console.log('Filtered products:', this.filteredProducts); // تسجيل هنا
          } else {
            console.error('Unexpected data format:', products);
          }
        },
        error => {
          console.error("Error fetching products by category:", error);
        }
      );
    }
  }

  onPriceChange(selectedPrice: any): void {
    this.selectedPrice = selectedPrice;
    this.applyFilters();
  }



  onBrandChange(brand: string | null): void {
    this.selectedBrand = brand;
    this.filteredProducts = this.products.filter(product =>
      this.selectedBrand ? product.translations?.[0]?.brandName === this.selectedBrand : true
    );
  }




  applyFilters(): void {
    const selectedPriceOption = this.priceOptions.find(option => option.name === this.selectedPrice);
    const minPrice = selectedPriceOption ? selectedPriceOption.min : 0;
    const maxPrice = selectedPriceOption ? selectedPriceOption.max : Infinity;

    this.filteredProducts = this.products.filter(product => {
      product.translations?.[0]?.brandName;

      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return  matchesPrice;
    });
  }

  clearFilter(): void {
    this.selectedCategory = null;
    this.selectedPrice = null;
    this.filteredProducts = this.products;
    this.selectedBrand=null;
  }





  addToCart(event: any) {
    if ("card" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("card")!);
      let exist = this.cartProducts.find(item => item.id == event.id);
      if (exist) {
        alert("This product is already in the cart");
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("card", JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("card", JSON.stringify(this.cartProducts));
    }
  }
}
