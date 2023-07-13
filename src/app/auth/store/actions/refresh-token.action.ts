import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { RefreshTokenInterface } from '../../types/refresh-token.interface';

export const refreshTokenActions = createActionGroup({
  source: 'refresh-token',
  events: {
    'Refresh token': emptyProps(),
    'Refresh token success': props<{ tokens: RefreshTokenInterface }>(),
    'Refresh token failure': emptyProps(),
  },
});
