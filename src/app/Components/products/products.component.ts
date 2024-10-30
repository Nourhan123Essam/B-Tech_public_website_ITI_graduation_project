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
  brands: string[] = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell'];
  cartProducts: any[] = [];
  productCategories:ProductCategoryB[]=[];

  selectedCategory: string | null = null;
  selectedBrand: string | null = null;

  constructor(
    private service: AllproductsService,
    private catservice: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getallcateory();
  }

  getAllProducts() {
    this.service.getallproducts().subscribe(
      (res: any) => {
        console.log("Products API response:", res);
        if (res.isSuccess && Array.isArray(res.entity)) {
          this.products = res.entity;
          this.filteredProducts = this.products; // Display all products initially
        } else {
          console.error("Unexpected data format:", res);
        }
      },
      error => {
        console.error("Error fetching products:", error);
      }
    );
  }
  
  getallcateory() {
    this.catservice.getallcategory().subscribe((res: any) => {
        if (res.isSuccess && Array.isArray(res.entity)) {
            this.categories = res.entity;
            this.categoryNames = res.entity.map((category: CategoryB) => 
              category.translations?.[0]?.categoryName
            ).filter(Boolean);
        }
    });
  }


  // onBrandChange(brand: string | null): void {
  //   this.selectedBrand = brand;
  //   this.applyFilters();
  // }

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
  
  
  clearFilter(): void {
    this.selectedCategory = null;
    this.filteredProducts = this.products;
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
