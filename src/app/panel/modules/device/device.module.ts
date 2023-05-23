import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceListComponent} from './components/device-list/device-list.component';
import {DeviceFormComponent} from './components/device-form/device-form.component';
import {RouterModule, Routes} from '@angular/router';
import { DeviceEditComponent } from './components/device-edit/device-edit.component';
import {CdkTableModule} from '@angular/cdk/table';

const routes: Routes = [
  {
    path: '',
    component: DeviceListComponent,
  },
  {
    path: 'create',
    component: DeviceFormComponent,
  },
  {
    path: ':id',
    component: DeviceEditComponent,
  }
]

@NgModule({
  declarations: [DeviceListComponent, DeviceFormComponent, DeviceEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CdkTableModule,
  ],
})
export class DeviceModule {
}
