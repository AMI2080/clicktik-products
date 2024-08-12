import { Component, Input } from '@angular/core';
import { Product } from '../../../../../types';
import { ProductService } from '../../../../../services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input()
  public product: Product;

  public constructor(private productService: ProductService) {}

  public addToCart(product: Product): void {
    this.productService.addItemToCart(product);
  }
}
