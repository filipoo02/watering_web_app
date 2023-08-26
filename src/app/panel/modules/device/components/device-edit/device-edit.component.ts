import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DeviceFacadeService } from '../../store/device-facade.service';
import { DeviceFormValuesInterface } from '../../types/device-form-values.interface';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceEditComponent implements OnInit {
  private deviceId: string;
  private route = inject(ActivatedRoute);
  private deviceFacade = inject(DeviceFacadeService);

  device$: Observable<DeviceFormValuesInterface | null> = this.deviceFacade.device$;
  isLoading$ = this.deviceFacade.isLoading$;

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id') as string;
    this.deviceFacade.getDevice(this.deviceId);
  }

  update(device: Partial<DeviceFormValuesInterface>): void {
    this.deviceFacade.update(device, this.deviceId);
  }
}
