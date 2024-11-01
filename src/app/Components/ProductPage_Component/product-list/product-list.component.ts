import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../service/Order/order.service';


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
constructor(private router:Router, private orderService: OrderService
) {}

openProductDetails(data: any) {
  this.router.navigate(['/details', data.id]);
}



  add(productId: number, userId: string): void{
    this.orderService.addToCart(productId, userId).subscribe(
      () => {
        console.log('Product added to cart successfully!');
        // Optionally, trigger a notification or update UI here
      },
      (error) => {
        console.error('Could not add product to cart:', error);
        // Optionally, show an error message
      }
    );
    //this.item.emit(this.data)
  }
}