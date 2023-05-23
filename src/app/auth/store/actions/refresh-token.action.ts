import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../action-types';
import {RefreshTokenInterface} from '../../types/refresh-token.interface';

export const refreshTokenAction = createAction(
  ActionTypes.REFRESH_TOKEN,
);

export const refreshTokenSuccessAction = createAction(
  ActionTypes.REFRESH_TOKEN_SUCCESS,
  props<{tokens: RefreshTokenInterface}>(),
);

export const refreshTokenFailureAction = createAction(
  ActionTypes.REFRESH_TOKEN_FAILURE,
);
