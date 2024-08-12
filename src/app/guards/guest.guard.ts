import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate, CanActivateChild {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(): Observable<boolean> {
    return this.checkGuest();
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkGuest();
  }

  private checkGuest(): Observable<boolean> {
    return this.authService.isGuest().pipe(
      tap((user) => {
        if (!user) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
