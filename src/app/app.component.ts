import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/Components/main_component/Header/header.component';
import { PromotionComponent } from './Components/Home/promotion.component';
import { FooterComponent } from './Components/main_component/Footer/footer.component';
import { ProductListComponent } from './Components/ProductPage_Component/product-list/product-list.component';
import { BannerComponent } from './Components/Homepage_components/banner/banner.component';
import { FeaturesComponent } from './Components/Homepage_components/features/features.component';
import { BrandsComponent } from './Components/Homepage_components/brands/brands.component';
import { CartComponent } from './Components/cart/cart.component';
import { LastViewComponent } from './Components/Homepage_components/last-view/last-view.component';
import { SignInComponent } from './Components//sign-in/sign-in.component';
import { RemeberByPhooneComponent } from './Components/remeber-by-phoone/remeber-by-phoone.component';
import { filter } from 'rxjs/internal/operators/filter';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterOutlet,HeaderComponent,PromotionComponent,FooterComponent,ProductListComponent,BannerComponent,BrandsComponent,FeaturesComponent,CartComponent,LastViewComponent,SignInComponent,RemeberByPhooneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'b-tech';
  
    showHeaderFooter = true;

    private hiddenRoutes = ['/sign-in', '/remember-by-phoone','/sign-up'];

  
    constructor(private router: Router) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.showHeaderFooter = !this.hiddenRoutes.includes(event.url);
        });
    }
  
}
