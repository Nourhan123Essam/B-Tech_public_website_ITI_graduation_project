import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Image {
  url: string;
  createdAt: Date;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  imports:[CommonModule]
})
export class BannerComponent implements OnInit {
  images: Image[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.http.get<Image[]>('http://localhost:3000/Images').subscribe((data) => {
      this.images = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }
}
