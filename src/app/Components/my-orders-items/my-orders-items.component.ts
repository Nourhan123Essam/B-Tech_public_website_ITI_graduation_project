import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService, Order,  OrderItem} from '../../service/Order/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-orders-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders-items.component.html',
  styleUrl: './my-orders-items.component.css'
})
export class MyOrdersItemsComponent {
  @Input() order: Order| null = null;

  @Output() closeDetails = new EventEmitter<void>();
  
  constructor(private orderService: OrderService, private router: Router) {
    // Retrieve the passed state data
  }

  goBack() {
    this.closeDetails.emit(); // Emit the event to signal the parent to close this component
  }

}
