import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { registerActions } from '../actions';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { PersistenceLsService } from '../../../services/persistence/persistence-ls.service';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(registerActions.register),
      switchMap((req) => {
        return this.authService.register(req.request).pipe(
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

            return registerActions.registerSuccess({ currentUser });
          }),
          catchError(() => of(registerActions.registerFailure()))
        );
      })
    )
  );

  onRegisterSubmit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(registerActions.registerSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private authService: AuthService,
    private persistenceLocalStorage: PersistenceLsService,
    private action$: Actions,
    private router: Router
  ) {}
}
