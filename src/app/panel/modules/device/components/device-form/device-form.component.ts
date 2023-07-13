import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormBaseComponent } from '../../../../../shared/components/form-base/form-base.component';
import { DeviceFacadeService } from '../../store/device-facade.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent extends FormBaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private deviceFacade = inject(DeviceFacadeService);

  isSubmitting$ = this.deviceFacade.isSubmitting$;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: '',
    });
  }

  dispatchSubmitAction(): void {
    this.deviceFacade.createDevice(this.form.value);
  }
}
