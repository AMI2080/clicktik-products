import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';
import { SharedModule } from '../shared-module/products.module';

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [CommonModule, FormsModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
