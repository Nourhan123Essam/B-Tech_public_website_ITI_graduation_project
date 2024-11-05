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

  // categories = [
  //   { name: 'Mobiles', imageUrl: 'assets/images/mobile.jpg' },
  //   { name: 'Appliances', imageUrl: 'assets/images/appliances.jpg' },
  //   { name: 'Electronics', imageUrl: 'assets/images/electronics.jpg' }
  // ];

  constructor(private translate: LocalizationService) {
    this.translate.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }

  ngOnInit(): void {}
}
