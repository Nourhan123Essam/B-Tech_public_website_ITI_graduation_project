import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllproductsService } from '../../service/product/allproducts.service';
import { CommonModule } from '@angular/common';
import { RecentProductsService } from '../../service/recent-products/recent-products.service';
import { ProductB } from '../../models/product-b';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  product:any;
    productTranslation: any; 
  productspecification :ProductB[]=[];
  constructor(
    private route: ActivatedRoute,
    private allProductsService: AllproductsService,
    private recentProductsService: RecentProductsService // إضافة خدمة المنتجات المشاهدة

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { 
      this.getProductDetails(id);
    } else {
      console.error('Product ID is null or undefined');
    }
  }

  getProductDetails(id: string) {
    const productId = Number(id); // تحويل id إلى رقم
    this.allProductsService.getProductById(productId).subscribe(data => {
        if (data.isSuccess) {
            this.product = data.entity; // تخزين بيانات المنتج من الكائن entity
            this.recentProductsService.addProductToRecent(this.product); // إضافة المنتج إلى قائمة المشاهدات الأخيرة
        } else {
            console.warn('Product not found or error occurred:', data.msg);
        }
        console.log('Product details:', this.product);
    }, error => {
        console.error('Error fetching product details:', error);
    });
  }

  getSpecificationDetail(spec: any, languageId: number) {
    const translation = spec.translations.find((t: any) => t.languageId === languageId);
    return translation ? { key: translation.translatedKey, value: translation.translatedValue } : { key: 'N/A', value: 'N/A' };
  }
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