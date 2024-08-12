import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
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
  public search: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public constructor(private http: HttpClient) {}

  public products(
    limit: number = 12,
    page: number = 1
  ): Observable<ProductsResponse> {
    const params = {
      limit,
      skip: (page - 1) * limit,
    };
    return this.http.get<ProductsResponse>(`${environment.ApiUrl}/products`, {
      params,
    });
  }

  public productsByCategory(
    category: string,
    limit: number = 12,
    page: number = 1
  ): Observable<ProductsResponse> {
    const params = {
      limit,
      skip: (page - 1) * limit,
    };
    return this.http.get<ProductsResponse>(`${environment.ApiUrl}/products/category/${category}`, {
      params,
    });
  }

  public searchInProduct(
    limit: number = 12,
    page: number = 1,
    search: string = ''
  ): Observable<ProductsResponse> {
    const params = {
      limit,
      skip: (page - 1) * limit,
    };
    return this.http.get<ProductsResponse>(
      `${environment.ApiUrl}/products/search?q=${search}`,
      {
        params,
      }
    );
  }
}
