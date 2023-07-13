import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../../shared/types/app-state.interface';
import { CreateDeviceInterface } from '../types/create-device.interface';
import { createDeviceActions, getDevicesActions } from './actions';
import { selectDevices, selectIsSubmitting } from './reducer';

@Injectable({
  providedIn: 'root',
})
export class DeviceFacadeService {
  devices$ = this.store.pipe(select(selectDevices));
  isSubmitting$ = this.store.pipe(select(selectIsSubmitting));

  constructor(private store: Store<AppStateInterface>) {}

  createDevice(data: CreateDeviceInterface): void {
    this.store.dispatch(createDeviceActions.createDevice({ data }));
  }

  getDevices(): void {
    this.store.dispatch(getDevicesActions.getDevices());
  }
}
