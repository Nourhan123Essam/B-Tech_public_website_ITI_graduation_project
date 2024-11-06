import { Component, Input, OnInit } from '@angular/core';
import { RecentProductsService } from '../../../service/recent-products/recent-products.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../service/localiztionService/localization.service';

@Component({
  selector: 'app-last-view',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './last-view.component.html',
  styleUrl: './last-view.component.css',
})
export class LastViewComponent implements OnInit {
  isArabic!: boolean;

  @Input() data: any = {};
  lastViewedProducts: any[] = [];

  constructor(
    private recentProductsService: RecentProductsService,
    private router: Router,
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    this.lastViewedProducts = this.recentProductsService.getRecentProducts();
  }

  openProductDetails(product: any) {
    this.recentProductsService.addProductToRecent(product); // إضافة المنتج إلى قائمة المشاهدات الأخيرة
    this.router.navigate(['/details', product.id]);
  }
}
