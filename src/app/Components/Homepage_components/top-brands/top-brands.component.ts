import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/Category/category.service';
import { CategoryB } from '../../../models/category-b';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../service/localiztionService/localization.service';

@Component({
  selector: 'app-top-brands',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './top-brands.component.html',
  styleUrl: './top-brands.component.css'
})
export class TopBrandsComponent  {
  isArabic!: boolean;

  topBrands=[
    {id:1 , name:'Samsung', image:'https://btech.com/media/homecontent/brand/cache/56x56/s/a/samsung.png'},
    {id:2 , name:'LG', image:'https://btech.com/media/homecontent/brand/cache/56x56/l/g/lg.png'},
    {id:3 , name:'white whale', image:'https://btech.com/media/homecontent/brand/cache/56x56/w/h/white_whale.png'},
    {id:4 , name:'oppo', image:'https://btech.com/media/homecontent/brand/cache/56x56/o/p/oppo.png'},
    {id:5 , name:'kenwood', image:'https://btech.com/media/homecontent/brand/cache/56x56/b/r/brands_logos_180x120__kenwood.png'},
    {id:6 , name:'xiaomi', image:'https://btech.com/media/homecontent/brand/cache/56x56/x/i/xiaomi.png'},
    {id:7 , name:'Huawei', image:'https://btech.com/media/homecontent/brand/cache/56x56/h/u/huawei.png'},
    {id:8 , name:'Toshiba', image:'https://btech.com/media/homecontent/brand/cache/56x56/b/r/brands_logos_180x120__toshiba.png'},
    {id:9 , name:'Tornado', image:'https://btech.com/media/homecontent/brand/cache/56x56/t/o/tornado.png'},
    {id:10 , name:'Braun', image:'https://btech.com/media/homecontent/brand/cache/56x56/b/r/braun.png'},
    {id:11 , name:'lenovo', image:'https://btech.com/media/homecontent/brand/cache/56x56/l/e/lenovo.png'},
    {id:12 , name:'kiriazi', image:'https://btech.com/media/homecontent/brand/cache/56x56/b/r/brands_logos_180x120__kiriazi.png'},
    {id:13 , name:'zanussi', image:'https://btech.com/media/homecontent/brand/cache/56x56/b/r/brands_logos_180x120__zanussi.png'},
    {id:14 , name:'ultra', image:'https://btech.com/media/homecontent/brand/cache/56x56/u/l/ultra.png'},

  ]
brandImage = this.topBrands.map(op=>op.image)
selectedBrand:any;
constructor(
  private router: Router,
  private translate: LocalizationService
){
   this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
}

navigateToBrandProducts(brandName: string): void {
  this.router.navigate(['/products-by-brand', brandName]);
}

}
