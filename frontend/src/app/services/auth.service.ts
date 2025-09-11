import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  
  getMe(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }
}
