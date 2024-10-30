import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
@Input() data:any={}
@Output() item= new EventEmitter()
constructor(private router:Router
) {}

ngOnChanges() {
  console.log('Product data:', this.data);
}

openProductDetails(data: any) {
  if (data && data.product && data.product.id) {
    const productId = data.product.id; // استخدم المعرف من كائن المنتج
    console.log('Navigating to product details with ID:', productId);
    this.router.navigate(['/details', productId]);
  } else {
    console.error('Product ID is undefined or data is invalid:', data);
  }
}




add(){
  this.item.emit(this.data)
}
}