import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private readonly _http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>('/api/products');
  }

  public createProduct(model: IProduct): Observable<IProduct> {
    return this._http.post<IProduct>(`/api/products`, model);
  }

  public updateProduct(model: IProduct): Observable<IProduct> {
    return this._http.put<IProduct>(`/api/products/${model.id}`, model);
  }

  public deleteProduct(id: number): Observable<number> {
    return this._http.delete<number>(`/api/products/${id}`);
  }
}
