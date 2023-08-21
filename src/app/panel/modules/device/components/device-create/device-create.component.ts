import { Component, inject } from '@angular/core';

import { DeviceFormValuesInterface } from '../../types/device-form-values.interface';
import { DeviceFacadeService } from '../../store/device-facade.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.scss'],
})
export class DeviceCreateComponent {
  private deviceFacade = inject(DeviceFacadeService);

  dispatchSubmitAction(value: DeviceFormValuesInterface): void {
    this.deviceFacade.createDevice(value);
  }
}
