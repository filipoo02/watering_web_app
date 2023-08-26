import { DeviceInterface } from './device.interface';
import { DeviceFormValuesInterface } from './device-form-values.interface';

export interface DeviceStateInterface {
  devices: DeviceInterface[] | null;
  isLoading: boolean | null;
  isSubmitting: boolean | null;
  device: DeviceFormValuesInterface | null;
}
