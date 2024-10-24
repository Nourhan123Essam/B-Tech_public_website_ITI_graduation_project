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

openProductDetails(data: any) {
  this.router.navigate(['/details', data.id]);
}



add(){
  this.item.emit(this.data)
}
}