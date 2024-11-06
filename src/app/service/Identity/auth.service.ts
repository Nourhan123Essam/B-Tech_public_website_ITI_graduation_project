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
    var url = `${this.apiUrl}/GetCurrentUser`;
    console.log(url);
    
   // alert(url);
    return this.http.get<any>(url);
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
  getUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/UserId?id=${id}`);
  }

  getUserIdNourhan(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const claims = this.getTokenClaims(token);
      return claims?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    }
    return null;
  }

  loginUser(id: number): void {
    this.getUserId(id).subscribe(
      (response) => {
        if (response && response.userId) {
          // تخزين userId في localStorage
          localStorage.setItem('userId', response.userId);
          console.log('User ID saved:', response.userId);
        }
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
  }


  getTokenClaims(token: string): any {
    try {
      const payload = token.split('.')[1];  // الحصول على الجزء الثاني من التوكن
      const decodedPayload = JSON.parse(atob(payload));  // فك الترميز وتحويله إلى كائن JSON
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
