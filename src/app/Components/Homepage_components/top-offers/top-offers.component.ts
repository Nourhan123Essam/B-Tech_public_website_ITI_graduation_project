import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductB } from '../../../models/product-b';
import { CommonModule } from '@angular/common';
import { AllproductsService } from '../../../service/product/allproducts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-offers.component.html',
  styleUrl: './top-offers.component.css'
})
export class TopOffersComponent implements OnInit {
  products: ProductB[] = [];
  expensiveProducts: ProductB[] = [];
  @ViewChild('productContainer', { static: false }) productContainer!: ElementRef;


  constructor(
    private router:Router,

    private productService: AllproductsService) {}

  ngOnInit(): void {
    this.fetchExpensiveProducts();
  }

  fetchExpensiveProducts(): void {
    this.productService.getallproducts().subscribe((response: any) => {
      console.log('Fetched Response:', response); // Verify response structure in console

      // Check if response contains entity array
      if (response.isSuccess && Array.isArray(response.entity)) {
        this.products = response.entity;
        this.expensiveProducts = this.products
          .filter(product => typeof product.price === 'number') // Ensure each product has a price
          .sort((a, b) => b.price - a.price)
          .slice(0, 5);
      } else {
        console.error('Entity is not an array or request failed:', response);
        this.products = [];
        this.expensiveProducts = [];
      }
    });
  }

  getMonthlyPayment(product: ProductB): number {
    return Math.round(product.price / 12); // Assume a 12-month payment plan
  }

  scrollCarousel(direction: number): void {
    const container = this.productContainer.nativeElement;
    const scrollAmount = container.clientWidth / 2 * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  openProductDetails(data: any) {
    const productId = data?.id || data.product?.id;

    if (productId) {
      console.log('Navigating to product details with ID:', productId);
      this.router.navigate(['/details', productId]);
    } else {
      console.error('Product ID is undefined or data is invalid:', data);
    }
  }

}
