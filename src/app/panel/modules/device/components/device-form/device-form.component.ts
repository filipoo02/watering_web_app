import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormBaseComponent } from '../../../../../shared/components/form-base/form-base.component';
import { DeviceFacadeService } from '../../store/device-facade.service';
import { DeviceFormValuesInterface } from '../../types/device-form-values.interface';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceFormComponent extends FormBaseComponent<DeviceFormValuesInterface> {
  private deviceFacade = inject(DeviceFacadeService);

  isSubmitting$ = this.deviceFacade.isSubmitting$;
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: '',
  });
}
