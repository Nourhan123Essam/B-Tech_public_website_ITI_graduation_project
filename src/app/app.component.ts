import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/Components/main_component/Header/header.component';
import { PromotionComponent } from './Components/Home/promotion.component';
import { FooterComponent } from './Components/main_component/Footer/footer.component';
import { ProductListComponent } from './Components/ProductPage_Component/product-list/product-list.component';
import { BannerComponent } from './Components/Homepage_components/banner/banner.component';
import { FeaturesComponent } from './Components/Homepage_components/features/features.component';
import { BrandsComponent } from './Components/Homepage_components/brands/brands.component';
import { CartComponent } from './Components/cart/cart.component';
import { LastViewComponent } from './Components/Homepage_components/last-view/last-view.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,PromotionComponent,FooterComponent,ProductListComponent,BannerComponent,BrandsComponent,FeaturesComponent,CartComponent,LastViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'b-tech';
}
