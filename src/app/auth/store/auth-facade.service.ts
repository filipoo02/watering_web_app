import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../shared/types/app-state.interface';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { registerActions, loginActions, logoutActions, refreshTokenActions } from './actions';
import { selectIsSubmitting } from './reducer';
import { LoginRequestInterface } from '../types/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private store: Store<AppStateInterface> = inject(Store);

  isSubmitting$ = this.store.pipe(select(selectIsSubmitting));

  register(request: RegisterRequestInterface): void {
    this.store.dispatch(registerActions.register({ request }));
  }

  login(request: LoginRequestInterface): void {
    this.store.dispatch(loginActions.login({ request }));
  }

  logout(): void {
    this.store.dispatch(logoutActions.logout());
  }

  refreshTokens(): void {
    this.store.dispatch(refreshTokenActions.refreshToken());
  }
}
