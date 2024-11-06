
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7122/api/Order'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  addToCart(productId: number, userId: string): Observable<any> {
    console.log(productId, userId);
    return this.http.post(`${this.apiUrl}/add-to-cart?productId=${productId}&userId=${userId}`, {productId, userId});
  }

  viewCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/?userId=${userId}`);
  }

  updateOrderItemQuantity(orderItemId: number, newQuantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-order-item-quantity?orderItemId=${orderItemId}&newQuantity=${newQuantity}`, { orderItemId, newQuantity });
  }
  deleteOrderItem(orderItemId: number): Observable<any> {
    var req = `${this.apiUrl}/order-item/${orderItemId}`;
    console.log(req);
    
    return this.http.delete(req);
  }

}
