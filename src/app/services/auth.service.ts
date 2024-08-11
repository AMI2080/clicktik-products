import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginCredential, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  public constructor(private http: HttpClient) {}

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

  public logout(): void {
    this.user$.next(null);
    localStorage.removeItem('token');
  }
}
