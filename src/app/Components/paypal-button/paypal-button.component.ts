// // import { Component, Input, OnInit } from '@angular/core';
// // import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';


// // @Component({
// //   selector: 'app-paypal-button',
// //   standalone: true,
// //   imports: [NgxPayPalModule],
// //   templateUrl: './paypal-button.component.html',
// //   styleUrl: './paypal-button.component.css'
// // })
// //   export class PaypalButtonComponent implements OnInit {

// //     public payPalConfig?: IPayPalConfig;

// //     ngOnInit(): void {
// //       this.initConfig();
// //     }

// //     private initConfig(): void {
// //       this.payPalConfig = {
// //       currency: 'EUR',
// //       clientId: 'ATvDFJFysYICcOZtRecpSyQbw0iwDwl6tVuTRTyYDi-aJAbFLNTIQMrY21C-xY11cB9cykkearVgb5Op',
// //       createOrderOnClient: (data) => <ICreateOrderRequest>{
// //         intent: 'CAPTURE',
// //         purchase_units: [
// //           {
// //             amount: {
// //               currency_code: 'EUR',
// //               value: '9.99',
// //               breakdown: {
// //                 item_total: {
// //                   currency_code: 'EUR',
// //                   value: '9.99'
// //                 }
// //               }
// //             },
// //             items: [
// //               {
// //                 name: 'Enterprise Subscription',
// //                 quantity: '1',
// //                 category: 'DIGITAL_GOODS',
// //                 unit_amount: {
// //                   currency_code: 'EUR',
// //                   value: '9.99',
// //                 },
// //               }
// //             ]
// //           }
// //         ]
// //       },
// //       advanced: {
// //         commit: 'true'
// //       },
// //       style: {
// //         label: 'paypal',
// //         layout: 'vertical'
// //       },
// //       onApprove: (data, actions) => {
// //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
// //         actions.order.get().then((details:any) => {
// //           console.log('onApprove - you can get full order details inside onApprove: ', details);
// //         });
// //       },
// //       onClientAuthorization: (data) => {
// //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
// //       },
// //       onCancel: (data, actions) => {
// //         console.log('OnCancel', data, actions);
// //       },
// //       onError: err => {
// //         console.log('OnError', err);
// //       },
// //       onClick: (data, actions) => {
// //         console.log('onClick', data, actions);
// //       },
// //     };
// //     }
// //   }
// import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
// import { PaypalScriptLoaderService } from '../../service/paypal-script-loader/paypal-script-loader.service';

// declare var paypal: any;

// @Component({
//   selector: 'app-paypal-button',
//   standalone: true,
//   template: `<div id="paypal-button-container"></div>`,
//   styleUrls: ['./paypal-button.component.css']
// })
// export class PaypalButtonComponent implements OnInit, AfterViewInit {

//   constructor() {}

//   ngOnInit(): void {
//     // Any other initialization logic can go here
//   }

//   ngAfterViewInit(): void {
//     this.loadPayPalScript().then(() => {
//       this.renderPayPalButton();
//     }).catch(error => {
//       console.error('PayPal SDK could not be loaded.', error);
//     });
//   }

//   loadPayPalScript(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if ((window as any).paypal) {
//         resolve();
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = `https://www.paypal.com/sdk/js?client-id=ATvDFJFysYICcOZtRecpSyQbw0iwDwl6tVuTRTyYDi-aJAbFLNTIQMrY21C-xY11cB9cykkearVgb5Op&currency=USD`;
//       script.onload = () => resolve();
//       script.onerror = (error) => reject(error);
//       document.body.appendChild(script);
//     });
//   }

//   renderPayPalButton(): void {
//     paypal.Buttons({
//       createOrder: (data: any, actions: any) => {
//         return actions.order.create({
//           purchase_units: [{
//             amount: {
//               value: '10.00' // Replace this with the actual amount
//             }
//           }]
//         });
//       },
//       onApprove: (data: any, actions: any) => {
//         return actions.order.capture().then((details: any) => {
//           console.log('Transaction completed successfully:', details);
//           alert(`Transaction completed by ${details.payer.name.given_name}`);
//         }).catch((error: any) => {
//           console.error('Error capturing order:', error);  // Log the error details here
//           alert('There was an issue with the transaction.');
//         });
//       },
//       onError: (error: any) => {
//         console.error('Error in PayPal button rendering:', error);
//       }
//     }).render('#paypal-button-container');
//   }
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';


declare global {
  interface Window {
    paypal: any;
  }
}
interface CreateOrderResponse {
  orderId: string; // The response should contain an 'orderId' of type string
}
@Component({
  selector: 'app-paypal-button',
  standalone: true,
  template: `<div id="paypal-button-container"></div>`,
  styleUrls: ['./paypal-button.component.css']
})



export class PaypalButtonComponent implements OnInit, AfterViewInit {
  
  constructor(private http: HttpClient) {}
  @Output() paymentCompleted = new EventEmitter<boolean>();
  @Input()amount:string = "0.0";


  onPaymentSuccess() {
    // This method would be called when payment is successful
    this.paymentCompleted.emit(true); // Emit a success event to the parent component
  }

  onPaymentError() {
    // If there’s an error in payment, you can also emit `false` or handle it differently
    this.paymentCompleted.emit(false);
  }
  ////////////////////////////////////////////////

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.amount);

    this.loadPayPalScript().then(() => {
      console.log("script of paypal loadded successfully!");
      
      this.renderPaypalButton();
    }).catch(error => {
      console.error('PayPal SDK could not be loaded.', error);
      this.onPaymentError();
    });
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {
        resolve();
        return;
      }
      const testId = "Adg7mLBPWA-0Rw9hmGimuiewUDb-v3SlpHtxip-4vASbqTf5ns1fzTh2WztSaM5BwoVFshc03le3ddkd";
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${testId}&currency=USD`;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }
  // This is where you initiate the PayPal payment process
  renderPaypalButton(): void {
    // Load the PayPal Buttons dynamically
    if (window.paypal) {
      window.paypal.Buttons({
        // Step 1: Create the order
        createOrder: () => {
          return fetch('https://localhost:7122/api/paypal/create-order', {  // Send request to create order
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              amount: this.amount,  // Amount for the order (adjust this based on your use case)
              // currency: 'USD',  // Currency
             
            })
          })
          .then(response => response.json())  // Parse the response to get the order ID
          .then(orderData => {
            console.log("may be come from back", orderData, orderData.id);
            
            return orderData.id;  // Return the orderID from the API response
          });
        },
        // Step 2: Capture the payment after approval
        onApprove: (data:any) => {
          console.log("Order ID:", data.orderID); // Log the order ID
        
          fetch(`https://localhost:7122/api/paypal/capture-order`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then(response => response.json()) // Directly parse as JSON
          .then(data => {
            console.log("Capture Order Response:", data);
            // Handle the successful capture response
            if (data === "success") {
              console.log("Payment completed successfully!");
            } else {
              console.error("Payment capture failed:", data);
            }
            this.onPaymentSuccess();
          })
          .catch(error => {
            console.error("Error capturing order:", error);
            this.onPaymentError();
          });
          
        }
        ,
        // Optionally, you can define other actions like onCancel
        onCancel: (data:any) => {
          console.log('Payment was canceled:', data);
          this.onPaymentError();
        }
      }).render('#paypal-button-container');  // Render the PayPal button inside a container with id 'paypal-button-container'
    }
  }
}

// Render the PayPal button


  // renderPayPalButton(): void {
  //   // Step 1: Create Order on Backend
  //   this.http.post<CreateOrderResponse>('https://localhost:7122/api/paypal/create-order', {}).subscribe(response => {
  //     const orderId = response.orderId; // Now TypeScript knows that response has 'orderId'
  //     console.log(`now finally get the orderId: ${orderId}`);
      
  //     paypal.Buttons({
  //       createOrder: (data: any, actions: any) => {
  //         return actions.order.create({
  //           purchase_units: [{
  //             amount: {
  //               value: '10.00'
  //             }
  //           }],
  //           id: orderId  // Use the orderId from the backend
  //         });
  //       },
  //       onApprove: (data: any, actions: any) => {console.log("entered onApprove!!!");
  //         return actions.order.capture().then((details: any) => {
  //           console.log('Transaction completed:');

  //           // Step 2: Verify and Capture Payment on Backend
  //           /*this.http.post(`https://localhost:7122/api/paypal/capture-order?orderId=${orderId}`,{orderId}).subscribe(response => {
  //             console.log('Payment verified and processed:', response);
  //           }, error => {
  //             console.error('Error verifying payment:', error);
  //           });*/

  //           this.http.post(`https://localhost:7122/api/paypal/capture-order?orderId=${orderId}`, {
  //             orderId: details.id,
  //             payerId: details.payer.payer_id,
  //             amount: details.purchase_units[0].amount.value
  //           }, {
  //             headers: new HttpHeaders({
  //               'Content-Type': 'application/json'
  //             })
  //           })
  //           .subscribe(response => {
  //             console.log('Payment verified and processed:', response);
  //           }, error => {
  //             console.error('Error verifying payment:', error);
  //           });
  //         });
  //       },
  //       /*onError: (error: any) => {
  //         console.error('Error in PayPal button rendering:', error);
  //       }*/