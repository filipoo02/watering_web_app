import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import {
  refreshTokenAction,
  refreshTokenFailureAction,
  refreshTokenSuccessAction,
} from '../actions/refresh-token.action';
import { PersistenceLsService } from '../../../services/persistence/persistence-ls.service';

@Injectable()
export class RefreshTokenEffect {
  refreshToken$ = createEffect(() =>
    this.action$.pipe(
      ofType(refreshTokenAction),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((tokens) => refreshTokenSuccessAction({ tokens })),
          catchError(() => of(refreshTokenFailureAction()))
        )
      )
    )
  );

  refreshTokenFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(refreshTokenFailureAction),
        tap(() => this.router.navigateByUrl('/auth/login'))
      ),
    { dispatch: false }
  );

  refreshTokenSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(refreshTokenSuccessAction),
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
