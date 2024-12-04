import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalScriptLoaderService {
  private isLoaded = false;

  loadPaypalScript(clientId: string): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      script.onerror = (error) => reject(new Error('PayPal SDK failed to load.'));
      document.body.appendChild(script);
    });
  }
}
