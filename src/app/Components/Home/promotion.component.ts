import { Component } from '@angular/core';
import { BannerComponent } from '../Homepage_components/banner/banner.component';
import { ProductListComponent } from '../ProductPage_Component/product-list/product-list.component';
import { BrandsComponent } from '../Homepage_components/brands/brands.component';
import { FeaturesComponent } from '../Homepage_components/features/features.component';
import { LastViewComponent } from '../Homepage_components/last-view/last-view.component';
import { TopOffersComponent } from '../Homepage_components/top-offers/top-offers.component';
import { PromoCodesComponent } from '../Homepage_components/promo-codes/promo-codes.component';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [BannerComponent,BrandsComponent,FeaturesComponent,ProductListComponent,LastViewComponent,TopOffersComponent,PromoCodesComponent],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {

}
