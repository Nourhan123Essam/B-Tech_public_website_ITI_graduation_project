import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/Order/order.service'
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
// export class PaymentComponent {
//   totalCost:number = 0;
//   Quantity:number = 0;

//   goToCheckout(){

//   }
// }

export class PaymentComponent implements OnInit {
  currentStep = 1;
  deliveryDetails = { city: '' };
  paymentInfo = { cardNumber: '' };
  cartItems: any[] = []; 
  fee:number = 22;

  constructor(private orderService: OrderService, private router:Router, private modalService: NgbModal){}
  ngOnInit(): void {
    this.loadCartItems();
  }
  cities = ['Cairo', 'Alexandria', 'Giza'];

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  validateStep(step: number) {
    // Example validation logic
    if (step === 2 && this.paymentInfo.cardNumber.length >= 16) {
      this.currentStep++;
    }
  }
  
  //===========fetch order items=============
  loadCartItems(): void {
    const userId = '10734A5F-4152-400A-8CB6-81ADF51742D2'; 
     

    this.orderService.viewCart(userId).subscribe(
      (data) => {
        console.log(data);
        this.cartItems = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}