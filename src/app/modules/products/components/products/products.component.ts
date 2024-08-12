import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from '../../../../types';
import { ProductService } from '../../../../services';

type Catergory = {
  slug: string;
  name: string;
  url: string;
};

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public currentPage: number = 1;

  public perPage: number = 12;

  public totalPages: number = 1;

  public totalItems: number = 0;

  public search: string = '';

  public categories: Catergory[] = [
    {
      slug: 'beauty',
      name: 'Beauty',
      url: 'https://dummyjson.com/products/category/beauty',
    },
    {
      slug: 'fragrances',
      name: 'Fragrances',
      url: 'https://dummyjson.com/products/category/fragrances',
    },
    {
      slug: 'furniture',
      name: 'Furniture',
      url: 'https://dummyjson.com/products/category/furniture',
    },
    {
      slug: 'groceries',
      name: 'Groceries',
      url: 'https://dummyjson.com/products/category/groceries',
    },
    {
      slug: 'home-decoration',
      name: 'Home Decoration',
      url: 'https://dummyjson.com/products/category/home-decoration',
    },
    {
      slug: 'kitchen-accessories',
      name: 'Kitchen Accessories',
      url: 'https://dummyjson.com/products/category/kitchen-accessories',
    },
    {
      slug: 'laptops',
      name: 'Laptops',
      url: 'https://dummyjson.com/products/category/laptops',
    },
    {
      slug: 'mens-shirts',
      name: 'Mens Shirts',
      url: 'https://dummyjson.com/products/category/mens-shirts',
    },
    {
      slug: 'mens-shoes',
      name: 'Mens Shoes',
      url: 'https://dummyjson.com/products/category/mens-shoes',
    },
    {
      slug: 'mens-watches',
      name: 'Mens Watches',
      url: 'https://dummyjson.com/products/category/mens-watches',
    },
    {
      slug: 'mobile-accessories',
      name: 'Mobile Accessories',
      url: 'https://dummyjson.com/products/category/mobile-accessories',
    },
    {
      slug: 'motorcycle',
      name: 'Motorcycle',
      url: 'https://dummyjson.com/products/category/motorcycle',
    },
    {
      slug: 'skin-care',
      name: 'Skin Care',
      url: 'https://dummyjson.com/products/category/skin-care',
    },
    {
      slug: 'smartphones',
      name: 'Smartphones',
      url: 'https://dummyjson.com/products/category/smartphones',
    },
    {
      slug: 'sports-accessories',
      name: 'Sports Accessories',
      url: 'https://dummyjson.com/products/category/sports-accessories',
    },
    {
      slug: 'sunglasses',
      name: 'Sunglasses',
      url: 'https://dummyjson.com/products/category/sunglasses',
    },
    {
      slug: 'tablets',
      name: 'Tablets',
      url: 'https://dummyjson.com/products/category/tablets',
    },
    {
      slug: 'tops',
      name: 'Tops',
      url: 'https://dummyjson.com/products/category/tops',
    },
    {
      slug: 'vehicle',
      name: 'Vehicle',
      url: 'https://dummyjson.com/products/category/vehicle',
    },
    {
      slug: 'womens-bags',
      name: 'Womens Bags',
      url: 'https://dummyjson.com/products/category/womens-bags',
    },
    {
      slug: 'womens-dresses',
      name: 'Womens Dresses',
      url: 'https://dummyjson.com/products/category/womens-dresses',
    },
    {
      slug: 'womens-jewellery',
      name: 'Womens Jewellery',
      url: 'https://dummyjson.com/products/category/womens-jewellery',
    },
    {
      slug: 'womens-shoes',
      name: 'Womens Shoes',
      url: 'https://dummyjson.com/products/category/womens-shoes',
    },
    {
      slug: 'womens-watches',
      name: 'Womens Watches',
      url: 'https://dummyjson.com/products/category/womens-watches',
    },
  ];

  public products: Product[] = [];

  public selectedCategory: string | null = null;
  
  public category: string | null;

  private gettingType: 'search' | 'all' | 'category' = 'all';

  public constructor(private productService: ProductService) {
    productService.search.subscribe((search) => {
      this.search = search;
      this.searchInProduct();
    });
    this.getProducts();
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
      this.category = null;
      this.productService
        .products(this.perPage, this.currentPage)
        .subscribe((response) => {
          this.gettingType = 'all';
          this.products = response.products;
          this.totalPages = Math.ceil(response.total / this.perPage);
          this.totalItems = response.total;
        });
    } else {
      this.productService
        .productsByCategory(category, this.perPage, this.currentPage)
        .subscribe((response) => {
          this.category = category;
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
        this.getProducts(this.category, this.perPage, this.currentPage);
        break;
      case 'search':
        this.searchInProduct();
        break;
    }
  }
}
