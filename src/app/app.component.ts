import { Component } from '@angular/core';
import { AuthService, ProductService } from './services';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isAuth: boolean = false;

  public showUserDropdown: boolean = false;

  public showCartDropdown: boolean = false;

  public search: string = '';

  public cartItemsCount: number = 0;

  public constructor(
    public productService: ProductService,
    private authService: AuthService
  ) {
    authService.refreshToken().pipe(take(1)).subscribe();
    authService.user$.subscribe((user) => {
      this.isAuth = !!user;
    });

    productService.cartItemsCount.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  public logout(): void {
    this.closeUserDropdown();
    this.authService.logout();
  }

  public openUserDropdown(): void {
    this.showUserDropdown = true;
  }

  public closeUserDropdown(): void {
    this.showUserDropdown = false;
  }

  public emptyCart(): void {
    this.closeCartDropdown();
    this.productService.emptyCart();
  }

  public openCartDropdown(): void {
    this.showCartDropdown = true;
  }

  public closeCartDropdown(): void {
    this.showCartDropdown = false;
  }
}
