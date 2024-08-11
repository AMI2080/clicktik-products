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

  public search: string = '';

  public cartItemsCount: number | '+9' = 3;

  public constructor(authService: AuthService) {
    authService.refreshToken().pipe(take(1)).subscribe();
    authService.user$.subscribe((user) => {
      this.isAuth = !!user;
    });
  }
}
