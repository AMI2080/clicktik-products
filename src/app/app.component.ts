import { Component } from '@angular/core';
import { AuthService } from './services';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isAuth: boolean = false;

  public showUserDropdown: boolean = false;

  public search: string = '';

  public cartItemsCount: number | '+9' = 3;

  public constructor(private authService: AuthService) {
    authService.refreshToken().pipe(take(1)).subscribe();
    authService.user$.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  public logout(): void {
    this.closeUserDropdown();
    this.authService.logout()
  }

  public openUserDropdown(): void {
    this.showUserDropdown = true;
  }

  public closeUserDropdown(): void {
    this.showUserDropdown = false;
  }
}
