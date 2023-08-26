import { Component, inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { DeviceFacadeService } from '../../store/device-facade.service';
import { ToastrTranslationService } from '../../../../../services/toastr/toastr-translation.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  private deviceFacadeService = inject(DeviceFacadeService);
  private toast = inject(ToastrTranslationService);
  private clipboard = inject(Clipboard);

  devices$ = this.deviceFacadeService.devices$;
  isLoading$ = this.deviceFacadeService.isLoading$;

  ngOnInit(): void {
    this.deviceFacadeService.getDevices();
  }

  copyDeviceId(id: string): void {
    this.clipboard.copy(id);
    this.toast.info('device.device_id_copied');
  }
}
