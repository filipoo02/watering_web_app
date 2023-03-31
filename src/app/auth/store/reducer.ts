import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/auth-state.interface';
import { loginAction, loginSuccessAction } from './actions/login.action';

const initialState: AuthStateInterface = {
  currentUser: null,
  isLoggedIn: false,
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(loginSuccessAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    currentUser: action.currentUser,
  }))
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
