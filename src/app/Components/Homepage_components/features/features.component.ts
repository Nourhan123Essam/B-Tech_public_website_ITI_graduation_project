import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../../service/localiztionService/localization.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent implements OnInit {
  isArabic!: boolean;
  constructor(private router: Router, private translate: LocalizationService) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {}

  productPage() {
    this.router.navigate(['/products']);
  }
}
