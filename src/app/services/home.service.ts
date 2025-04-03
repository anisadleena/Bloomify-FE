// status.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Flower[]>(`${this.baseUrl}/get/all/flower`);
  }

  addFlower(flower: Flower): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create/flower`, flower);
  }

  deleteFlower(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/flower/${id}`);
  }
}
