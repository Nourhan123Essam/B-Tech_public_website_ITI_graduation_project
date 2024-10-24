import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllproductsService {

  private productUrl = 'https://fakestoreapi.com/products';
   

  constructor(private http: HttpClient) {}

  // Ensure this method returns an Observable
  getallproducts():Observable<any[]> {
    return this.http.get<any[]>(this.productUrl);
  }

  fillterproduct():Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products/category/jewelery');
  }
  
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.productUrl}/${id}`);
  }

 
}
