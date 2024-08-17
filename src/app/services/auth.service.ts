import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { LoginCredential, User } from '../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  public constructor(private http: HttpClient, private router: Router) {}

  public isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        } else {
          if (localStorage.getItem('token') == null) {
            return of(false);
          }
          return this.refreshToken().pipe(
            switchMap((userInfo) => {
              return of(!!userInfo);
            })
          );
        }
      })
    );
  }

  public isGuest(): Observable<boolean> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return of(false);
        } else {
          if (localStorage.getItem('token') == null) {
            return of(true);
          }
          return this.refreshToken().pipe(
            switchMap((userInfo) => {
              return of(!userInfo);
            })
          );
        }
      })
    );
  }

  public login(credential: LoginCredential): Observable<User> {
    return this.http
      .post<User>(`${environment.ApiUrl}/auth/login`, credential)
      .pipe(
        tap((response: User) => {
          this.user$.next(response);
          localStorage.setItem('token', response.token);
        })
      );
  }

  public getCurrntAuthUser(): Observable<User> {
    return this.http.get<User>(`${environment.ApiUrl}/auth/me`);
  }

  public refreshToken(): Observable<User | null> {
    if (!localStorage.getItem('token')) {
      this.logout();
      return of(null);
    }
    return this.http
      .post<User>(`${environment.ApiUrl}/auth/refresh`, {
        refreshToken: localStorage.getItem('token'),
      })
      .pipe(
        tap((response: User) => {
          if (response.token) {
            this.user$.next(response);
            localStorage.setItem('token', response.token);
          } else {
            this.logout();
          }
        }),
        catchError(() => {
          this.logout();
          return of(null);
        })
      );
  }

  public logout(): void {
    this.user$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['', 'auth', 'login']);
  }
}
