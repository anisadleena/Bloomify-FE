// status.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../home/home.type';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.ANGULAR_APP_BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('SERVICE: login = ', credentials);
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  signup(data: {
    username: string;
    email: string;
    password: string;
    [key: string]: any;
  }): Observable<any> {
    console.log('SERVICE: signup = ', data);
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }

  saveSession(token: string): void {
    sessionStorage.setItem('jwtToken', token);
    // Optionally decode the token to extract user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded JWT payload:', payload);
      sessionStorage.setItem('user', JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to decode token', err);
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  getUserData(): any {
    const data = sessionStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }
}
