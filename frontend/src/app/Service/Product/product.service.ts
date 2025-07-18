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
  updateProduct(product: ProductResponse) {
    const url = `${environment.apiUrl}/api/product/${product.id}`;
    return this.http.patch<IBaseResponse<ProductResponse>>(url, product, {
      withCredentials: true,
    });
  }
  addProduct(product: ProductResponse) {
    const url = `${environment.apiUrl}/api/product`;

    return this.http.post<IBaseResponse<ProductResponse>>(url, product, {
      withCredentials: true,
    });
  }
  deleteProduct(productId: string) {
    const url = `${environment.apiUrl}/api/product/${productId}`;

    return this.http.delete<IBaseResponse<ProductResponse>>(url, {
      withCredentials: true,
    });
  }
}
