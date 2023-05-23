import {Component, inject} from '@angular/core';
import {DeviceInterface} from '../../types/device.interface';
import {DeviceListService} from '../../services/device-list.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {
  deviceListService = inject(DeviceListService);
  device$ = this.deviceListService.getDevice();
}
