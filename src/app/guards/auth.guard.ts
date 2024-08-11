import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((user) => {
        if (!user) {
          this.router.navigate(['', 'auth', 'login']);
        }
      })
    );
  }
}
