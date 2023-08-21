import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DeviceInterface } from '../../types/device.interface';

export const getDevicesActions = createActionGroup({
  source: 'get device',
  events: {
    'Get devices': emptyProps(),
    'Get devices success': props<{ devices: DeviceInterface[] }>(),
    'Get devices failure': emptyProps(),
    'Get device': props<{ id: string }>(),
    'Get device success': props<{ device: DeviceInterface}>(),
    'Get device failure': emptyProps(),
  },
});
