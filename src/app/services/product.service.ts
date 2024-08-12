import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Catergory, Product } from '../types';

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

  public cartCount: number = 0;

  public cartItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  public constructor(private http: HttpClient) {}

  public Categories(
  ): Observable<Catergory[]> {
    return this.http.get<Catergory[]>(`${environment.ApiUrl}/products/categories`);
  }

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
    return this.http.get<ProductsResponse>(
      `${environment.ApiUrl}/products/category/${category}`,
      {
        params,
      }
    );
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

  public addItemToCart(product: Product): void {
    this.cartCount++;
    this.cartItemsCount.next(this.cartCount);
  }

  public emptyCart(): void {
    this.cartCount = 0;
    this.cartItemsCount.next(this.cartCount);
  }
}
