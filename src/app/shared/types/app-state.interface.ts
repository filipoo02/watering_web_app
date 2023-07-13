import { AuthStateInterface } from 'src/app/auth/types/auth-state.interface';
import {DeviceStateInterface} from '../../panel/modules/device/types/device-state.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  device: DeviceStateInterface;
}
