import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresult',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchresult.component.html',
  styleUrl: './searchresult.component.css'
})
export class SearchresultComponent  implements OnInit {
  products: any[] = [];
  @Input() data:any={}

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['products']) {
      this.products = navigation.extras.state['products'];
    }
  }

  ngOnInit(): void {}

  
openProductDetails(data: any) {
  const productId = data?.id || data.product?.id;

  if (productId) {
    console.log('Navigating to product details with ID:', productId);
    this.router.navigate(['/details', productId]);
  } else {
    console.error('Product ID is undefined or data is invalid:', data);
  }
}

}



