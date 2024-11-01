import { Component } from '@angular/core';
import { BannerComponent } from '../Homepage_components/banner/banner.component';
import { ProductListComponent } from '../ProductPage_Component/product-list/product-list.component';
import { BrandsComponent } from '../Homepage_components/brands/brands.component';
import { FeaturesComponent } from '../Homepage_components/features/features.component';
import { LastViewComponent } from '../Homepage_components/last-view/last-view.component';
import { TopOffersComponent } from '../Homepage_components/top-offers/top-offers.component';
<<<<<<< HEAD
=======
import { PromoCodesComponent } from '../Homepage_components/promo-codes/promo-codes.component';
>>>>>>> menna

@Component({
  selector: 'app-promotion',
  standalone: true,
<<<<<<< HEAD
  imports: [BannerComponent,BrandsComponent,FeaturesComponent,ProductListComponent,LastViewComponent,TopOffersComponent],
=======
  imports: [BannerComponent,BrandsComponent,FeaturesComponent,ProductListComponent,LastViewComponent,TopOffersComponent,PromoCodesComponent],
>>>>>>> menna
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {

}
