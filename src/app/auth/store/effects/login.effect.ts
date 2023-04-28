import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';
import { PersistenceLsService } from 'src/app/services/persistence/persistence-ls.service';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      switchMap((req) => {
        return this.authService.login(req.request).pipe(
          map((res) => {
            this.persistenceLocalStorage.setValue(
              'access_token',
              res.access_token
            );
            this.persistenceLocalStorage.setValue(
              'refresh_token',
              res.refresh_token
            );

            const currentUser: CurrentUserInterface = {
              email: res.email,
              id: res.id,
            };

            return loginSuccessAction({ currentUser });
          }),
          catchError(() => of(loginFailureAction()))
        );
      })
    )
  );

  onLoginSubmit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccessAction),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistenceLocalStorage: PersistenceLsService
  ) {}
}
