import { createActionGroup, emptyProps } from '@ngrx/store';

export const logoutActions = createActionGroup({
  source: 'logout',
  events: {
    logout: emptyProps(),
    'Logout success': emptyProps(),
  },
});
