import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DeviceInterface } from '../../types/device.interface';

export const updateDeviceActions = createActionGroup({
  source: 'update device',
  events: {
    'Update device': props<{ device: Partial<DeviceInterface>, id: string }>(),
    'Update device success': emptyProps(),
    'Update device failure': emptyProps(),
  }
})
