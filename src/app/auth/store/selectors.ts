import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

export const authFeatureSelector = (state: AppStateInterface) => state.auth;

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.isSubmitting
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.currentUser
);
