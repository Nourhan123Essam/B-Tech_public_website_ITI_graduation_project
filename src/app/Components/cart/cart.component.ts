
import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/Order/order.service'
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; 
  message: string = '';  
  totalCost: number = 0;
  n = 10; // Change this to set the maximum number
  numbers: number[] = [];
  Quantity:number = 0;
  tempPrice:number = 5;
  
  constructor(private orderService: OrderService, private router:Router, private modalService: NgbModal) {
    this.generateNumbers(this.n);
  }
  
  ngOnInit(): void {
    this.loadCartItems();
  }

  generateNumbers(n: number) {
    this.numbers = Array.from({ length: n }, (_, i) => i + 1);
  }

  calculateTotalCost() {
    this.totalCost = this.cartItems.reduce((sum, item) => sum + /*item.price*/ this.tempPrice * item.quantity, 0);
  }
  calulateQuantity(){
    this.Quantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Load items in the cart based on userId
  loadCartItems(): void {
    const userId = '10734A5F-4152-400A-8CB6-81ADF51742D2'; 

    this.orderService.viewCart(userId).subscribe(
      (data) => {
        console.log(data);
        this.cartItems = data;
        this.calculateTotalCost();
        this.calulateQuantity();
      },
      (error) => {
        this.message = 'Could not load cart items. Please try again later.';
        console.error(error);
      }
    );
  }

  // Add product to the cart
  addToCart(productId: number): void {
    const userId = '10734A5F-4152-400A-8CB6-81ADF51742D2'; 

    this.orderService.addToCart(productId, userId).subscribe(
      () => {
        this.loadCartItems();
        this.message = 'Item added to cart successfully!';
      },
      (error) => {
        this.message = 'Could not add item to cart. Please check the quantity.';
        console.error(error);
      }
    );
  }

  // Update the Quantity of item in the cart
  updateQuantity(orderItemId: number, newQuantity: number): void {
    console.log(orderItemId, newQuantity);
    
    this.orderService.updateOrderItemQuantity(orderItemId, newQuantity).subscribe(
      (response) => {
        console.log('Quantity updated successfully', response);
        this.loadCartItems();
      },
      (error) => {
        console.error('Error updating quantity', error);
      }
    );
  }

  // Delete order item
  deleteOrderItem(id: number) {
    if(id >= 0){
      this.orderService.deleteOrderItem(id).subscribe({
        next: () => {          
          this.cartItems = this.cartItems.filter(item => item.orderItemId !== id);
          this.calculateTotalCost();
          this.loadCartItems();
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error deleting order item", error);
          // Log details for further debugging
          console.log("Error details:", error.message, error.status, error.error);
        }
      });
    }
  }
  openRemoveModal(content: any, id:number) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Remove') {
        this.deleteOrderItem(id);
      }
    });
  }
  /////////////////////////////////////////
  goToCheckout() {
    this.router.navigate(['/payment']);
  }
  
}
