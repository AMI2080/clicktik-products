import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  public refreshToken(): Observable<User> {
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
        })
      );
  }

  public logout(): void {
    this.user$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['', 'auth', 'login']);
  }
}
