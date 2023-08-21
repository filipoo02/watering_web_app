import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DeviceFormValuesInterface } from '../../types/device-form-values.interface';

export const createDeviceActions = createActionGroup({
  source: 'create device',
  events: {
    'Create device': props<{ data: DeviceFormValuesInterface }>(),
    'Create device success': emptyProps(),
    'Create device failure': emptyProps(),
  },
});
