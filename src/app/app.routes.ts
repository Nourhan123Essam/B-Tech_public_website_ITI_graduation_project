import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { DetailsComponent } from './Components/details/details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PromotionComponent } from './Components/Home/promotion.component';
import {CartComponent} from './Components/cart/cart.component'
import { PaymentComponent } from './Components/payment/payment.component';


export const routes: Routes = [


    {path:'',redirectTo:'promotion',pathMatch:'full'},
    {path:'promotion',component:PromotionComponent,title:'Home Page'},

    {path:'products',component:ProductsComponent,title:'Product-List'},
    {path:'details/:id',component:DetailsComponent, title:'Details'},
    
    { path: 'payment', component: PaymentComponent },
    { path: 'cart', component: CartComponent },
   
    {path:'**',component:NotFoundComponent}
];
