import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {logoutAction, logoutSuccessAction} from '../actions/logout.action';
import {PersistenceLsService} from '../../../services/persistence/persistence-ls.service';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(() => this.action$.pipe(
    ofType(logoutAction),
    switchMap(() =>
      this.authService.logout().pipe(
        map(() => logoutSuccessAction()),
      )
    )
  ));

  logoutSuccess$ = createEffect(() => this.action$.pipe(
    ofType(logoutSuccessAction),
    tap(() => {
      this.persistenceLsService.deleteValue('access_token');
      this.persistenceLsService.deleteValue('refresh_token');
      const ignorePromise = this.router.navigateByUrl('/auth/login');
    })
  ), {dispatch: false})

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistenceLsService: PersistenceLsService
  ) {
  }
}
