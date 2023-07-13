import { DeviceInterface } from './device.interface';

export interface DeviceStateInterface {
  devices: DeviceInterface[];
  isLoading: boolean | null;
  isSubmitting: boolean | null;
}
