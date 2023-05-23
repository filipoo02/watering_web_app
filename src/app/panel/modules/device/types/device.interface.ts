import { CurrentUserInterface } from '../../../../shared/types/current-user.interface';

export interface DeviceInterface {
  id: string;
  name: string;
  description: string;
  active: boolean;
  owner: CurrentUserInterface;
  createdAt: Date;
}
