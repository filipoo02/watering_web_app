import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DeviceInterface } from '../../types/device.interface';

export const getDevicesActions = createActionGroup({
  source: 'get device',
  events: {
    'Get devices': emptyProps(),
    'Get devices success': props<{ devices: DeviceInterface[] }>(),
    'Get devices failure': emptyProps(),
  },
});
