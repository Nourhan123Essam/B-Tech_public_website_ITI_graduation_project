import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/Category/category.service';
import { CategoryB } from '../../../models/category-b';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cats-names',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cats-names.component.html',
  styleUrl: './cats-names.component.css'
})
export class CatsNamesComponent implements OnInit{
  categories: CategoryB[] = [];
  categoryNames: string[] = []; 
  selectedCategory: string | null = null;

  constructor( 
    private catservice: CategoryService
   
  ){}
  
  ngOnInit(): void {
    this.getallcateory();

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

  selectCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }

 
}
