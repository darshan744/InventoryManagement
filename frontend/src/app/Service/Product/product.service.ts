import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IBaseResponse, ProductResponse } from '../../Types/Response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() {
    const url = `${environment.apiUrl}/api/products`;
    return this.http.get<IBaseResponse<ProductResponse[]>>(url, {
      withCredentials: true,
    });
  }
}
