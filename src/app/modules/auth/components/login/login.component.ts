import { Component } from '@angular/core';
import { AuthService } from '../../../../services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public isLoading: boolean = false;

  public loginError: string = '';

  public form: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.disable();
      this.isLoading = true;
      this.loginError = '';
      this.authService
        .login(this.form.value)
        .pipe(
          catchError((error, response) => {
            if (error.error) {
              this.loginError = error.error.message;
              throw new Error(error.error.message);
            }
            return response;
          }),
          finalize(() => {
            this.isLoading = false;
            this.form.enable();
          })
        )
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
