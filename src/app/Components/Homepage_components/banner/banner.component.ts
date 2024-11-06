import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { LocalizationService } from '../../../service/localiztionService/localization.service';
interface Image {
  url_en: string;
  url_ar: string;
  url: string;
  createdAt: Date;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  imports: [CommonModule]
})
export class BannerComponent implements OnInit {
  images: Image[] = [];
  isArabic!: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    this.localizationService.IsArabic.subscribe((ar) => {
      this.isArabic = ar;
    });
  }

  ngOnInit(): void {
    this.loadImages();
  }


  loadImages() {
    this.http.get<Image[]>('http://localhost:3000/Images').subscribe((data) => {
      this.images = data
        .map((image) => ({
          ...image,
          url: this.isArabic ? image.url_ar : image.url_en
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    });
  }
  productPage(){
    this.router.navigate(['/products'])
  }
}
