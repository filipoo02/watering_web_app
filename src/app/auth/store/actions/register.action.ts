import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';

export const registerActions = createActionGroup({
  source: 'register',
  events: {
    register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': emptyProps(),
  },
});
