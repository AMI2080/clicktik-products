import { Component } from '@angular/core';
import { Catergory, Product } from '../../../../types';
import { ProductService } from '../../../../services';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public currentPage: number = 1;

  public perPage: number = 12;

  public totalPages: number = 1;

  public allItemsCount: number = 0;

  public totalItems: number = 0;

  public search: string = '';

  public categories: Catergory[] = [];

  public products: Product[] = [];

  public selectedCategory: Catergory | null = null;

  private gettingType: 'search' | 'all' | 'category' = 'all';

  public constructor(private productService: ProductService) {
    productService.search.subscribe((search) => {
      this.search = search;
      this.searchInProduct();
    });

    this.getProducts();

    productService.Categories().subscribe((list) => {
      this.categories = list;
      this.categories.forEach((category) => {
        productService
          .productsByCategory(category.slug)
          .subscribe((respose) => {
            category.count = respose.total;
          });
      });
    });
  }

  private searchInProduct(): void {
    this.currentPage = 1;
    this.selectedCategory = null;

    this.productService
      .searchInProduct(this.perPage, this.currentPage, this.search)
      .subscribe((response) => {
        this.gettingType = 'search';
        this.products = response.products;
        this.totalPages = Math.ceil(response.total / this.perPage);
        this.totalItems = response.total;
      });
  }

  public getProducts(
    category: string | null = null,
    perPage: number = 12,
    currentPage: number = 1
  ): void {
    this.search = '';
    this.perPage = perPage;
    this.currentPage = currentPage;

    if (!category) {
      this.selectedCategory = null;
      this.productService
        .products(this.perPage, this.currentPage)
        .subscribe((response) => {
          this.gettingType = 'all';
          this.products = response.products;
          this.totalPages = Math.ceil(response.total / this.perPage);
          this.totalItems = response.total;
          this.allItemsCount = response.total;
        });
    } else {
      this.productService
        .productsByCategory(category, this.perPage, this.currentPage)
        .subscribe((response) => {
          this.gettingType = 'category';
          this.products = response.products;
          this.totalPages = Math.ceil(response.total / this.perPage);
          this.totalItems = response.total;
        });
    }
  }

  public goTo(page: number): void {
    this.currentPage = page;

    switch (this.gettingType) {
      case 'all':
        this.getProducts(null, this.perPage, this.currentPage);
        break;

      case 'category':
        this.getProducts(this.selectedCategory?.slug, this.perPage, this.currentPage);
        break;

      case 'search':
        this.searchInProduct();
        break;
    }
  }
}
