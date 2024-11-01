import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7122/api/Account' ; // استخدم رابط الـ API الخاص بك

  constructor(private http: HttpClient) {}

  checkPhoneNumber(mobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/CheckNumber`, { PhoneNumber: mobileNumber });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, { Email: email, Password: password });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  signOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/signout`, {});
  }
}
