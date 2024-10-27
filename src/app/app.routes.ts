import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { DetailsComponent } from './Components/details/details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PromotionComponent } from './Components/Home/promotion.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { RemeberByPhooneComponent } from './Components/remeber-by-phoone/remeber-by-phoone.component';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

export const routes: Routes = [


    {path:'',redirectTo:'promotion',pathMatch:'full'},
    {path:'promotion',component:PromotionComponent,title:'Home Page'},

    {path:'products',component:ProductsComponent,title:'Product-List'},
    {path:'details/:id',component:DetailsComponent, title:'Details'},
    { path: 'sign-in', component: SignInComponent, data: { hideHeaderFooter: true } },
    { path: 'sign-up', component: SignUpComponent },

    {path:'remember-by-phoone',component:RemeberByPhooneComponent,title:'remember-me', data: { hideHeaderFooter: true } },


    {path:'**',component:NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
