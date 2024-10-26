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
  constructor(
    private translate: LocalizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  useLanguage() {
    this.translate.ChangeLanguage();
  }
}
