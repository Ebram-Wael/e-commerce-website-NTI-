import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../models/iproduct'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrl, this.getHeaders());
  }
  getProductById(id: string): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
  createProduct(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrl, product, this.getHeaders());
  }
  updateProduct(id: string, product: IProducts): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.apiUrl}/${id}`, product, this.getHeaders());
  }
  deleteProduct(id: string): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
  addProductToCart(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, { productId: id }, this.getHeaders());
  }
}
