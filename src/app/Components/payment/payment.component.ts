import { Component, Input, input, OnInit } from '@angular/core';
import {OrderService} from '../../service/Order/order.service'
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PaypalButtonComponent} from "../paypal-button/paypal-button.component";
import {PaypalPaymentService } from '../../service/payment/paypal-payment.service'
import { AuthService } from '../../service/Identity/auth.service';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, PaypalButtonComponent],
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
  selectedPaymentMethod: string = "paypal";
  totalAmount:number = 100;
  isExpanded:boolean = false;
  @Input()orderId:number = 0;
 

  constructor(private orderService: OrderService, private router:Router, private modalService: NgbModal,
              private paypalService: PaypalPaymentService, private authService: AuthService){}
  ngOnInit(): void {
    this.loadCartItems();
  }
  cities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El-Kheima",
    "Port Said",
    "Suez",
    "Mansoura",
    "Tanta",
    "Asyut",
    "Fayoum",
    "Zagazig",
    "Ismailia",
    "Aswan",
    "Damanhur",
    "Damietta",
    "Luxor",
    "Qena",
    "Beni Suef",
    "Sohag",
    "Hurghada",
    "Sharm El-Sheikh",
    "Minya",
    "Qalyub",
    "Gharbia",
    "Beheira",
    "Matruh",
    "El-Mahalla El-Kubra",
    "Kafr El-Sheikh",
    "Al-Arish",
    "6th of October City",
    "Sadat City",
    "Helwan",
    "Obour City",
    "New Cairo",
    "Badr City"
  ];
  
  //====== finishing the payment =============
  completePayment() {
    const paymentDetails = {
      transactionId: (this.selectedPaymentMethod == 'cash')?'':'sample-transaction-id',
      orderId: 'sample-order-id',
      shippingCost: 10.0,
      shippingAddress: '123 Example St, City, Country'
    };

    this.paypalService.completePayment(paymentDetails).subscribe(
      response => {
        console.log('Payment completed successfully', response);
      },
      error => {
        console.error('Payment completion failed', error);
      }
    );
  }

  //************************************************** */

  chashPayment():void{
    const ele = document.getElementById("continuePayment") as HTMLButtonElement;
    if (ele) {
      ele.disabled = false;
    }
  }

  placeOrder():void{
    this.currentStep = 3;
    const button = document.getElementById("pay") as HTMLButtonElement;
    if(button){
      button.disabled = true;
    }
    const firstButton = document.getElementById("delivery") as HTMLButtonElement;
    if(firstButton){
      firstButton.disabled = true;
    }
    const ele = document.getElementById("finish") as HTMLButtonElement;
    if (ele) {
      ele.disabled = false;
    }

  }
  nextStep() {
    this.currentStep = 2; // Move to the payment step
    const button = document.getElementById("pay") as HTMLButtonElement;
    if (button) {
      button.disabled = false;
      const ele = document.getElementById("payp");
      if (ele) ele.style.borderColor = "black";
      button.style.color = "black";

      var area = document.getElementById("panelsStayOpen-collapseOne");
     // if(area)this.isExpanded = true;
    }
  }

  discount(): void {
    const ele = document.getElementById("discountPromo");
    if (ele) {
        ele.style.display = "flex"; // Use flex to ensure items align properly
    }
  }

  enableButton():void{
    const ele = document.getElementById("promoButton") as HTMLButtonElement;
    if (ele) {
      ele.disabled = false;
    }
  }  

  applyDiscount():void{

  }
  //===========fetch order items=============
  loadCartItems(): void {
    const userId = this.authService.getUserIdNourhan(); 
    if(userId){
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
}