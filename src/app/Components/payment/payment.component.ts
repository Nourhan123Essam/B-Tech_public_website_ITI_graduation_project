
import { Component, Input, input, OnInit , Output, ViewChild , OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import {OrderService} from '../../service/Order/order.service'
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PaypalButtonComponent} from "../paypal-button/paypal-button.component";
import {PaypalPaymentService } from '../../service/payment/paypal-payment.service'
import { AuthService } from '../../service/Identity/auth.service';
import {CitySidebarComponent} from '../city-side-bar-component/city-side-bar-component.component';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// import bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
declare const bootstrap: any;


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, PaypalButtonComponent, CitySidebarComponent],
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
  orderId:number|null = 0;
  totalPayPal:string = "100.0";


  constructor(private orderService: OrderService, private router:Router, private modalService: NgbModal,
    private paypalService: PaypalPaymentService, private authService: AuthService, private route: ActivatedRoute,
    private elementRef: ElementRef){}



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

  @ViewChild('citySidebar') citySidebar: any;
  choosedCity: string = "Select city";
  ngOnInit(): void {
    this.loadCartItems();
    // alert(this.route.snapshot.paramMap.get('orderId'));
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    // alert(`${this.orderId}agu`);
  }

  openCitySidebar() {
    if (this.citySidebar && typeof this.citySidebar.openSidebar === 'function') {
      this.citySidebar.openSidebar();
      console.log("from payment", this.choosedCity);

    } else {
      console.error('openSidebar method is not available on citySidebar');
    }
  }
  receiveData(data:string){
    this.choosedCity = data;
    const ele = document.getElementById("fullAddress");
    if(ele){
      ele.style.display = "block";
    }
  }
  fullAddress(){
    const but = document.getElementById("continueDelivery");
    if(but){
      but.style.display = "block";
    }
    //this.nextStep();
  }

  //====== finishing the payment =============
  completePayment() {
    const userID = this.authService.getUserIdNourhan();
    if(userID && this.orderId){
      // alert(this.orderId)
      this.orderService.finishOrder(this.orderId, this.totalAmount, userID).subscribe(
        (response) => {
          console.log('Quantity updated successfully', response);
          this.showThankYouModal();

          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error updating quantity', error);
        }
      );
    }
  }

  showThankYouModal(): void {
    const modalElement = this.elementRef.nativeElement.querySelector('#thankYouModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  //************************************************** */

  chashPayment():void{
    const ele = document.getElementById("continuePayment") as HTMLButtonElement;
    if (ele) {
      ele.disabled = false;
    }
  }

  onPaymentCompleted(success: boolean) {
    if (success) {
      console.log('Payment was successful. Proceeding to update the order status...');
      const ele = document.getElementById("continuePayment") as HTMLButtonElement;
      if (ele) {
        ele.disabled = false;
      }
    } else {
      console.log('Payment failed or was cancelled.');
      // Handle payment failure if needed
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
    if(userId){console.log("Entered");
    
      this.orderService.viewCart(userId).subscribe(
        (data) => {
          console.log("this id the data", data);
          this.cartItems = data;
          this.totalAmount = 0;
          this.totalPayPal = "0.0";

          for (const item of this.cartItems) {
            this.totalAmount  += item.totalPrice + this.fee;
          }
          this.totalPayPal = String(this.totalAmount);
          console.log("********************");
          
          console.log(this.totalAmount);
          console.log(this.totalPayPal);
          
          
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
