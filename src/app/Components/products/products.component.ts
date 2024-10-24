import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllproductsService } from '../../service/product/allproducts.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/Category/category.service';
import { Router } from '@angular/router';
import { ProductListComponent } from '../ProductPage_Component/product-list/product-list.component';
import { SelectCheckboxComponent } from '../ProductPage_Component/select-checkbox/select-checkbox.component';

interface Product {
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,ProductListComponent,SelectCheckboxComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent   implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: any[] =[];
  brands: string[] = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell'];
  cartProducts:any[]=[];

  selectedCategory: string | null = null;
  selectedBrand: string | null = null;

  constructor(private service:AllproductsService, private catservice:CategoryService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getallproducts();
    this.getallcateory();
  }
  
  getallproducts(){
   this.service.getallproducts().subscribe((res:Product[])=>{
    this.products=res
    this.filteredProducts = res; 
   })
  }

   getallcateory(){
    this.catservice.getallcategory().subscribe((res :any)=>{
      this.categories=res
    })
  }

  onCategoryChange(category: string | null): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
  
  onBrandChange(brand: string | null): void {
    this.selectedBrand = brand;
    this.applyFilters();
  }
  
applyFilters(): void {
  this.filteredProducts = this.products.filter(product => {
    const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
    const matchesBrand = this.selectedBrand ? product.brand === this.selectedBrand : true;
    return matchesCategory && matchesBrand;
  });
}

clearFilter(): void {
  this.selectedCategory = null;
  this.selectedBrand = null;
  this.filteredProducts = this.products; 
}

addToCart(event:any){
  if("card" in localStorage){
    this.cartProducts=JSON.parse(localStorage.getItem("card")!)
    let exist=this.cartProducts.find(item=>item.id==event.id)
    if(exist){
        alert("this product is already exist")
    }else{
      this.cartProducts.push(event)
      localStorage.setItem("card",JSON.stringify(this.cartProducts))
    }
  
  }else{
    this.cartProducts.push(event)
    localStorage.setItem("card",JSON.stringify(this.cartProducts))
  }
}


}





  

