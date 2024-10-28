import { AfterViewInit, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { LocalizationService } from '../../service/localiztionService/localization.service';
import { AuthService } from '../../service/Identity/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit {
  url: string = 'assets/i18n/.json';
  isArabic!: boolean;
  isLoggedIn: boolean = true;

  constructor(
    private translate: LocalizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth:AuthService
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  useLanguage() {
    this.translate.ChangeLanguage();
  }

  opensignin() {
    this.router.navigate(['remember-by-phoone']);
  }
  signOut() {
    this.auth.signOut().subscribe(
      () => {
        localStorage.removeItem('authToken'); // مسح التوكن من التخزين المحلي
        this.isLoggedIn = false; // تحديث حالة تسجيل الدخول
        this.router.navigate(['/']); // إعادة توجيه المستخدم للصفحة الرئيسية
      },
      (error) => console.error('Logout failed:', error)
    );
  }
  
}
