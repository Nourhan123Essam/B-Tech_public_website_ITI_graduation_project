import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent  implements OnInit {

  constructor(
   private router: Router
  ) {}

  ngOnInit(): void {}
  productPage(){
    this.router.navigate(['/products'])
  }
}



