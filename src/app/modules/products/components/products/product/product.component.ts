import { Component, Input } from '@angular/core';
import { Product } from '../../../../../types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input()
  public product: Product;

  public selectedCategory: string | null = null;

  public addToCart(product: Product): void {}
}
