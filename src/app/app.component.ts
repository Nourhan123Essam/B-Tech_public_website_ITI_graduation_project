import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './shared/Header/header.component';
import { PromotionComponent } from './Components/home/promotion.component';
import { FooterComponent } from './shared/Footer/footer.component';
import { ProductListComponent } from './Components/ProductPage_Component/product-list/product-list.component';
import { BannerComponent } from './Components/Homepage_components/banner/banner.component';
import { FeaturesComponent } from './Components/Homepage_components/features/features.component';
import { BrandsComponent } from './Components/Homepage_components/brands/brands.component';
import { CartComponent } from './Components/cart/cart.component';
import { LastViewComponent } from './Components/Homepage_components/last-view/last-view.component';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    PromotionComponent,
    FooterComponent,
    ProductListComponent,
    BannerComponent,
    BrandsComponent,
    FeaturesComponent,
    CartComponent,
    LastViewComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
  title = 'b-tech';
  showHeader:boolean = true;
  constructor(private router:Router,private translate: TranslateService) {
    let lang=localStorage.getItem('language');
    translate.use(lang as string);
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes( '/checkout'))
          this.showHeader=false;
        else
        this.showHeader=true;
      }
    });
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
