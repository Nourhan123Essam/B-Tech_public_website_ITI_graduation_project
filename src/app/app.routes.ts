import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { DetailsComponent } from './Components/details/details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PromotionComponent } from './Components/Home/promotion.component';

export const routes: Routes = [


    {path:'',redirectTo:'promotion',pathMatch:'full'},
    {path:'promotion',component:PromotionComponent,title:'Home Page'},

    {path:'products',component:ProductsComponent,title:'Product-List'},
    {path:'details/:id',component:DetailsComponent, title:'Details'},

    {path:'**',component:NotFoundComponent}
];
