import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/auth-state.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.action';
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action';

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
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(loginFailureAction, (state) => ({
    ...state,
    isSubmitting: false,
  })),
  on(registerAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(registerSuccessAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(registerFailureAction, (state) => ({
    ...state,
    isSubmitting: false,
  }))
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
