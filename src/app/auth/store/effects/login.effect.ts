import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { loginAction, loginSuccessAction } from '../actions/login.action';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      switchMap((req) => {
        return this.authService
          .login(req.request)
          .pipe(map((currentUser) => loginSuccessAction({ currentUser })));
      })
    )
  );

  constructor(
    private store: Store,
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
