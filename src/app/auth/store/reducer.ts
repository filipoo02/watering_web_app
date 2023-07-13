import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/auth-state.interface';
import { loginActions, registerActions } from './actions';

const initialState: AuthStateInterface = {
  currentUser: null,
  isLoggedIn: false,
  isSubmitting: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(loginActions.login, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(loginActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })),
    on(loginActions.loginFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(registerActions.register, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(registerActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })),
    on(registerActions.registerFailure, (state) => ({
      ...state,
      isSubmitting: false,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectCurrentUser,
  selectIsLoggedIn,
  selectIsSubmitting,
} = authFeature;
