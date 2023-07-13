import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateDeviceInterface } from '../../types/create-device.interface';

export const createDeviceActions = createActionGroup({
  source: 'create device',
  events: {
    'Create device': props<{ data: CreateDeviceInterface }>(),
    'Create device success': emptyProps(),
    'Create device failure': emptyProps(),
  },
});
