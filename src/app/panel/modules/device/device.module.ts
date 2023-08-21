import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceCreateComponent } from './components/device-create/device-create.component';
import { DeviceEditComponent } from './components/device-edit/device-edit.component';
import { deviceFeatureKey, deviceReducer } from './store/reducer';
import { GetDevicesEffect } from './store/effects/get-devices.effect';
import { CreateDeviceEffect } from './store/effects/create-device.effect';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { GetDeviceEffect } from './store/effects/get-device.effect';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { UpdateDeviceEffect } from './store/effects/update-device.effect';

const routes: Routes = [
  {
    path: '',
    component: DeviceListComponent,
  },
  {
    path: 'create',
    component: DeviceCreateComponent,
  },
  {
    path: 'edit/:id',
    component: DeviceEditComponent,
  },
];

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceCreateComponent,
    DeviceEditComponent,
    DeviceFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CdkTableModule,
    StoreModule.forFeature(deviceFeatureKey, deviceReducer),
    EffectsModule.forFeature([
      GetDevicesEffect,
      CreateDeviceEffect,
      GetDeviceEffect,
      UpdateDeviceEffect,
    ]),
    ReactiveFormsModule,
    TranslateModule,
    LoaderComponent,
  ],
})
export class DeviceModule {}
