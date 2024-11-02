import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../../service/Category/category.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  categories: { id: number; categoryName: string ;categoryImage :string }[] = []; 
  selectedCategoryId: number | null = null;

  @ViewChild('brandContainer', { static: true }) brandContainer!: ElementRef;


  constructor(
    private router:Router,
    private catservice: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  

  loadBrands(){
    this.catservice.getmainCategories().subscribe(
      (res: any[]) => {
        console.log("Sub Categories API response:", res);
  
        const uniqueCategoriesMap = new Map<number, { id: number; categoryName: string; categoryImage: string }>();
  
        res.forEach((item) => {
          const categoryId = item.category?.id;
          const categoryName = item.category?.translations?.[0]?.categoryName;
          const categoryImage = item.category?.imageUrl; // تأكد من الوصول إلى `imageUrl` بشكل صحيح
  
          // التأكد من أن `id` و`categoryName` و `categoryImage` موجودين وأن الفئة غير مكررة
          if (categoryId && categoryName && categoryImage && !uniqueCategoriesMap.has(categoryId)) {
            uniqueCategoriesMap.set(categoryId, { id: categoryId, categoryName, categoryImage });
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
  
  scrollLeft() {
    this.brandContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.brandContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}