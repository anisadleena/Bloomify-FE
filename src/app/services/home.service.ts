// status.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../home/home.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = environment.ANGULAR_APP_BASE_URL;

  constructor(private http: HttpClient) { }

  getAllListFlowers(): Observable<Flower[]> {
  const token = sessionStorage.getItem('jwtToken');
  console.log("SERVICE: token = ", token);

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<Flower[]>(`${this.baseUrl}/get/all/flower`, { headers });
}

  addFlower(flower: Flower): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    console.log("SERVICE: token = ", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/create/flower`, flower, { headers });
  }

  deleteFlower(id: number): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    console.log("SERVICE: token = ", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/delete/flower/${id}`, { headers });
  }
}
