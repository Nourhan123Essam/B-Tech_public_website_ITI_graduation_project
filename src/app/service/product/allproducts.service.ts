import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductB } from '../../models/product-b';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllproductsService {

  constructor(private http: HttpClient) {}

  private thisapi='https://localhost:7122/api';

 
  getallproducts():Observable<ProductB[]> {
    return this.http.get<ProductB[]>(`${this.thisapi}/product`);
  }
  

  fillterproduct():Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products/category/jewelery');
  }
  
 
  getProductById(id: Number): Observable<any> {
    return this.http.get(`${this.thisapi}/Product/${id}`);
  }

  getProductsByCategoryId(categoryId: number): Observable<ProductB[]> {
    return this.http.get<ProductB[]>(`${this.thisapi}/Category/GetProductsByCategoryId/${categoryId}`);
  }

 
  getProductsByCategoryName(categoryName: string): Observable<any> {
    return this.http.get<any>(`${this.thisapi}/Category/GetProductsByCategoryName/${categoryName}`);
  }
   
 
}
