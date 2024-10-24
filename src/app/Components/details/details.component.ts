import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllproductsService } from '../../service/product/allproducts.service';
import { CommonModule } from '@angular/common';
import { RecentProductsService } from '../../service/recent-products/recent-products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  product:any;
  constructor(
    private route: ActivatedRoute,
    private allProductsService: AllproductsService,
    private  Recentproduct:RecentProductsService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.allProductsService.getProductById(productId).subscribe(
      (data) => {
        this.product = data;
        this.Recentproduct.addProductToRecent(data);

      },
      (error) => {
        console.error('Error fetching product details', error);
      } 
    );
  }

//   loadProduct(productId: string | null): void {
//     const protId = Number(this.route.snapshot.paramMap.get('id'))

//     if (productId) {
//       this.allProductsService.getProductById(protId).subscribe((product: any) => {
//         this.product = product;
//         this.Recentproduct.addProductToRecent(product);
//       });
//     }

// }
}