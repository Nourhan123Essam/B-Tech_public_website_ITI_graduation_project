import { Component, Input, OnInit } from '@angular/core';
import { RecentProductsService } from '../../../service/recent-products/recent-products.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-last-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-view.component.html',
  styleUrl: './last-view.component.css'
})
export class LastViewComponent implements OnInit{
  
  @Input() data: any = {};
  lastViewedProducts: any[] = [];

  constructor(private recentProductsService: RecentProductsService, private router: Router) {}

  ngOnInit(): void {
    this.lastViewedProducts = this.recentProductsService.getRecentProducts();
  }

  openProductDetails(product: any) {
    this.recentProductsService.addProductToRecent(product); // إضافة المنتج إلى قائمة المشاهدات الأخيرة
    this.router.navigate(['/details', product.id]);
  }
}



