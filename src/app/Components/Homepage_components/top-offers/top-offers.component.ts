import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductB } from '../../../models/product-b';
import { CommonModule } from '@angular/common';
import { AllproductsService } from '../../../service/product/allproducts.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../service/localiztionService/localization.service';

@Component({
  selector: 'app-top-offers',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './top-offers.component.html',
  styleUrl: './top-offers.component.css',
})
export class TopOffersComponent implements OnInit {
  isArabic!: boolean;
  products: ProductB[] = [];
  expensiveProducts: ProductB[] = [];
  @ViewChild('productContainer', { static: false })
  productContainer!: ElementRef;

  constructor(
    private router: Router,
    private productService: AllproductsService,
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    this.fetchExpensiveProducts();
  }


  // fetchExpensiveProducts(): void {
  //   this.productService.getallproducts().subscribe((response: any) => {
  //     console.log('Fetched Response:', response); // Verify response structure in console

  //     // Check if response contains entity array
  //     if (response.isSuccess && Array.isArray(response.entity)) {
  //       this.products = response.entity;
  //       this.expensiveProducts = this.products
  //         .filter((product) => typeof product.price === 'number') // Ensure each product has a price
  //         .sort((a, b) => b.price - a.price)
  //         .slice(0, 5)
  //     } else {
  //       console.error('Entity is not an array or request failed:', response);
  //       this.products = [];
  //       this.expensiveProducts = [];
  //     }
  //   });
  // }

  // getallproducts(): void {
  //   this.productService.getallproducts().subscribe(
  //     (products: ProductB[]) => {
  //       console.log('API Response:', products);

  //       if (Array.isArray(products) && products.length > 0) {
  //         this.products = products.map(productItem => ({
  //           ...productItem,
  //           product: {
  //             ...productItem.product,
  //             translations: productItem.product.translations || [],
  //             images: productItem.product.images || [],
  //             name: productItem.product.translations?.[this.isArabic ? 1 : 0]?.name || 'No name available'
  //           }
  //         }));

  //         // Optionally, filter and sort for the top 5 expensive products
  //         this.expensiveProducts = this.products
  //           .filter(product => typeof product.product.price === 'number') // Ensure each product has a price
  //           .sort((a, b) => b.product.price - a.product.price) // Sort by price descending
  //           .slice(0, 5); // Get top 5 expensive products

  //         console.log('Filtered products:', this.products);
  //         console.log('Expensive products:', this.expensiveProducts);
  //       } else {
  //         console.error('Entity is not an array or request failed:', products);
  //         this.products = [];
  //         this.expensiveProducts = [];
  //       }
  //     },
  //     error => {
  //       console.error("Error fetching products:", error);
  //       this.products = [];
  //       this.expensiveProducts = [];
  //     }
  //   );
  // }

  fetchExpensiveProducts(): void {
    this.productService.getallproducts().subscribe((response: any) => {
      console.log('Fetched Response:', response); // Verify response structure in console
  
      // Check if response contains entity array
      if (response.isSuccess && Array.isArray(response.entity)) {
        this.products = response.entity;
        this.expensiveProducts = this.products
          .filter((product) => typeof product.price === 'number') // Ensure each product has a price
          .sort((a, b) => b.price - a.price)
          .slice(0, 5)
          .map((product) => {
            // Set the product name based on the current language
            const translation = this.isArabic ? product.translations[1] : product.translations[0];
            return {
              ...product,
              displayName: translation ? translation.name : 'Name not available',
            };
          });
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
  getFormattedPrice(price: number): string {
    return this.isArabic ? `${price} ج.م` : `EGP ${price}`;
  }

  scrollCarousel(direction: number): void {
    const container = this.productContainer.nativeElement;
    const scrollAmount = (container.clientWidth / 2) * direction;
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
  productPage(){
    this.router.navigate(['/products'])
  }
}
