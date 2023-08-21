import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceFacadeService } from '../../store/device-facade.service';
import { DeviceInterface } from '../../types/device.interface';
import { DeviceFormValuesInterface } from '../../types/device-form-values.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceEditComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private deviceId: string;
  private route = inject(ActivatedRoute);
  private deviceFacade = inject(DeviceFacadeService);

  device$ = this.deviceFacade.device$.pipe(tap(() => this.cdr.markForCheck()));
  isLoading$ = this.deviceFacade.isLoading$;

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id') as string;
    this.deviceFacade.getDevice(this.deviceId);
  }

  update(device: Partial<DeviceFormValuesInterface>): void {
    this.deviceFacade.update(device, this.deviceId);
  }
}
