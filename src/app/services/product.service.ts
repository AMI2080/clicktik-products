import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../types';

type ProductsResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public constructor(private http: HttpClient) {}

  public products(
    limit: number = 12,
    page: number = 1,
    search: string = ''
  ): Observable<ProductsResponse> {
    const params = {
      limit,
      skip: (page - 1) * limit,
      search,
    };
    return this.http.get<ProductsResponse>(`${environment.ApiUrl}/products`, {
      params,
    });
  }
}
