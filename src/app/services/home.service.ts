// status.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../home/home.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.ANGULAR_APP_BASE_URL;

  constructor(private http: HttpClient) {}

  getAllListFlowers(): Observable<Flower[]> {
    const token = sessionStorage.getItem('jwtToken');
    console.log('SERVICE: token = ', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Flower[]>(`${this.baseUrl}/get/all/flower`, {
      headers,
    });
  }

  getFlowerById(id: any): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    console.log('SERVICE: token = ', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/get/flower/${id}`, { headers });
  }

  addFlower(flower: Flower): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    console.log('SERVICE: token = ', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.baseUrl}/create/flower`, flower, {
      headers,
    });
  }

   editFlower(flower: Flower, id : any): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    console.log('SERVICE: token = ', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.baseUrl}/update/flower/${id}`, flower, {
      headers,
    });
  }

  deleteFlower(id: any): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    console.log('SERVICE: token = ', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}/delete/flower/${id}`, { headers });
  }

uploadImage(id: any, file: File): Observable<any> {
  const token = sessionStorage.getItem('jwtToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${this.baseUrl}/upload/image/${id}`, formData, { headers });
}
}
