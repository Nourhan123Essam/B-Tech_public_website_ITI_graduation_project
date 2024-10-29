import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryB } from '../../models/category-b';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }



  getallcategory():Observable<CategoryB[]>{
    return this.http.get<CategoryB[]>(`${environment.apiBaseUrl}/Category`)
   }
 
}
