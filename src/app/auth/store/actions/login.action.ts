import { createAction, props } from '@ngrx/store';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { LoginRequestInterface } from '../../types/login-request.interface';
import { ActionTypes } from '../action-types';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);
