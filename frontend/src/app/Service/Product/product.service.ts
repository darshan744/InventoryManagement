import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  IBaseResponse,
  ProductResponse,
  ShopProductsResponse,
} from '../../Types/Response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAllAvailableProducts() {
    const url = `${environment.apiUrl}/api/products/all`;
    return this.http.get<IBaseResponse<ShopProductsResponse[]>>(url, {
      withCredentials: true,
    });
  }
  createFormData(nameToAppend: string = 'file', ...file: File[]) {
    const formData = new FormData();
    file.forEach((f) => {
      formData.append(nameToAppend, f);
    });
    return formData;
  }
  getProductOfUser() {
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
  addProduct(product: ProductResponse, files: File[] = []) {
    const url = `${environment.apiUrl}/api/product`;
    console.log(files)
    const formData = this.createFormData('productImage', ...files);
    formData.append('product', JSON.stringify(product));
    return this.http.post<IBaseResponse<ProductResponse>>(url, formData, {
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
