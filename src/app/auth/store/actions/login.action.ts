import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { LoginRequestInterface } from '../../types/login-request.interface';

export const loginActions = createActionGroup({
  source: 'login',
  events: {
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': emptyProps(),
  }
});
