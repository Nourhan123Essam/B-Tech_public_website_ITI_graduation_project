import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/Identity/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../service/localiztionService/localization.service';
import {MyOrdersComponent} from '../my-orders/my-orders.component';


@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, TranslateModule, MyOrdersComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit {
  userName: string = '';
  phoneNumber: string = '';
  isUserLoggedIn: boolean = false;
  isArabic!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef, // إضافة ChangeDetectorRef هنا
    private translate: LocalizationService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {
    this.userName = this.authService.getUserNameFromToken() || ''; // إذا كان null أو undefined يتم تعيينه كـ ''
  }

  signOut() {
    this.authService.signOut();
    this.isUserLoggedIn = false;
    this.router.navigate(['/']);
    this.cdr.detectChanges(); // تحديث العرض بعد تسجيل الخروج
  }

  //======= my orders ========
  navigateMyOrders():void{
    // this.router.navigate(['/my-orders']);
    
    const ele = document.getElementById("orderSection");
    if(ele){
      ele.style.display = "block";
      const other = document.getElementById("userSection");
      if(other)other.style.display = "none";
    }
  }
  returnToUserData(){
    const ele = document.getElementById("userSection");
    if(ele){
      ele.style.display = "block";
      const other = document.getElementById("orderSection");
      if(other)other.style.display = "none";
    }
  }
}
