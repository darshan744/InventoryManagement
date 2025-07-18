import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IBaseResponse, OrderResponse } from '../../Types/Response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getOrders() {
    const url = `${environment.apiUrl}/orders`;
    return this.http.get<IBaseResponse<OrderResponse[]>>(url, {
      withCredentials: true,
    });
  }
}
