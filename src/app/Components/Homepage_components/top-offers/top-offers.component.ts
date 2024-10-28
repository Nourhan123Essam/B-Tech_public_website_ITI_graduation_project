import { Component, OnInit } from '@angular/core';
import { ProductB } from '../../../models/product-b';
import { CommonModule } from '@angular/common';
import { AllproductsService } from '../../../service/product/allproducts.service';

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

  constructor(private productService: AllproductsService) {}

  ngOnInit(): void {
    this.fetchExpensiveProducts();
  }

  fetchExpensiveProducts(): void {
    this.productService.getproducts().subscribe((data: ProductB[]) => {
      console.log('Fetched Products:', data); // Verify data structure in console
      this.products = data;
      this.expensiveProducts = this.products
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);
    });
  }

  getMonthlyPayment(product: ProductB): number {
    return Math.round(product.price / 12); // Assume a 12-month payment plan
  }
}