import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../../shared/types/app-state.interface';
import { DeviceFormValuesInterface } from '../types/device-form-values.interface';
import { createDeviceActions, getDevicesActions } from './actions';
import { selectDevice, selectDevices, selectIsLoading, selectIsSubmitting } from './reducer';
import { updateDeviceActions } from './actions/update-device.action';

@Injectable({
  providedIn: 'root',
})
export class DeviceFacadeService {
  devices$ = this.store.pipe(select(selectDevices));
  device$ = this.store.pipe(select(selectDevice));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  isSubmitting$ = this.store.pipe(select(selectIsSubmitting));

  constructor(private store: Store<AppStateInterface>) {}

  createDevice(data: DeviceFormValuesInterface): void {
    this.store.dispatch(createDeviceActions.createDevice({ data }));
  }

  getDevices(): void {
    this.store.dispatch(getDevicesActions.getDevices());
  }

  getDevice(id: string): void {
    this.store.dispatch(getDevicesActions.getDevice({ id }));
  }

  update(device: Partial<DeviceFormValuesInterface>, id: string): void {
    this.store.dispatch(updateDeviceActions.updateDevice({ device, id }));
  }
}
