import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { refreshTokenActions } from '../actions';
import { PersistenceLsService } from '../../../services/persistence/persistence-ls.service';

@Injectable()
export class RefreshTokenEffect {
  refreshToken$ = createEffect(() =>
    this.action$.pipe(
      ofType(refreshTokenActions.refreshToken),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((tokens) => refreshTokenActions.refreshTokenSuccess({ tokens })),
          catchError(() => of(refreshTokenActions.refreshTokenFailure()))
        )
      )
    )
  );

  refreshTokenFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(refreshTokenActions.refreshTokenFailure),
        tap(() => this.router.navigateByUrl('/auth/login'))
      ),
    { dispatch: false }
  );

  refreshTokenSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(refreshTokenActions.refreshTokenSuccess),
        map((res) => res.tokens),
        tap(({ access_token, refresh_token }) => {
          this.persistenceLsService.setValue('access_token', access_token);
          this.persistenceLsService.setValue('refresh_token', refresh_token);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistenceLsService: PersistenceLsService
  ) {}
}
