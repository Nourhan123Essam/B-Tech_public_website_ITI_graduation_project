import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductB } from '../../models/product-b';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllproductsService {

  constructor(private http: HttpClient) {}

 
  getallproducts():Observable<ProductB[]> {
    return this.http.get<ProductB[]>(`${environment.apiBaseUrl}/product`);
  }

  fillterproduct():Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products/category/jewelery');
  }
  
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/product/${id}`);
  }

 
}
