import { Component, OnInit } from '@angular/core';
import { OrderService, Order,  OrderItem} from '../../service/Order/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/Identity/auth.service';
import { Router } from '@angular/router';
import {MyOrdersItemsComponent} from '../my-orders-items/my-orders-items.component';



@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, MyOrdersItemsComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})

export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMessage = '';
  selectedOrder:Order|null = null;
  details: boolean = false;

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const userId = this.authService.getUserIdNourhan();
    console.log("let's get orders", userId);
    
    if(userId){console.log("entered");
    
      this.orderService.getUserOrders(userId).subscribe({
        next: (data) => {
          console.log(data);
          
          this.orders = data;
          this.orders.forEach(element => {
            element.showItems = false;
          });
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load orders';
          this.loading = false;
        }
      });
    }
  }

  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.fetchOrders();
        //this.orders = this.orders.map(order =>
          //order.id === orderId ? { ...order, status: 'Canceled' } : order
       // );
      },
      error: (error) => {
        console.error('Failed to cancel order', error);
      }
    });
  }
  //////////////////////////////
  toggleOrderItems(orderId: number) {
    console.log("now let's see items");

    
    this.orders.forEach(ele =>{
      if(ele.id == orderId){
        this.selectedOrder = ele;
      }
    })
   console.log(this.selectedOrder);
  //  this.router.navigate(['/my-orders-items'], {
  //   state: { order: this.selectedOrder }
  // });
  this.details = true;
   
  }

  onCloseDetails() {
    this.details = false;
  }
}
