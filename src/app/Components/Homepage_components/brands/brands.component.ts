import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface Brand{
  name:string;
  icon:string
}

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  brands:Brand[]=[];

  @ViewChild('brandContainer', { static: true }) brandContainer!: ElementRef;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.http.get<Brand[]>('http://localhost:3000/brands').subscribe((data) => {
      this.brands = data;
    }, (error) => {
      console.error('Failed to load brand data:', error);
    });
  }


  scrollLeft() {
    this.brandContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.brandContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}