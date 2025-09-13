import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';
  private cartUrl = 'http://localhost:3000/users/cart';

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrl, this.getAuthHeaders());
  }

  getProductById(id: string): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  
  createProduct(product: any): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrl, product, this.getAuthHeaders());
  }


  updateProduct(id: string, product: any): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.apiUrl}/${id}`, product, this.getAuthHeaders());
  }

  deleteProduct(id: string): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
  addProductToCart(id: string): Observable<any> {
    return this.http.post(this.cartUrl, { productId: id }, this.getAuthHeaders());
  }
  getCart(): Observable<any> {
    return this.http.get(this.cartUrl, this.getAuthHeaders());
  }
  removeProductFromCart(productId: string): Observable<any> {
  return this.http.delete(this.cartUrl, {
    ...this.getAuthHeaders(),
    body: { productId }
  });
}


}
