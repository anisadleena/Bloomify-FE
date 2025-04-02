// status.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../home/home.type';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'https://drive-api-java.onrender.com/api/v1/get/all/flower';

  constructor(private http: HttpClient) { }

  getAllListFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(`${this.baseUrl}`);
  }
}
