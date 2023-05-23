import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHelperService } from '../services/translate-helper/translate-helper.service';
import { AuthService } from '../auth/services/auth.service';
import { DeviceFormComponent } from './modules/device/components/device-form/device-form.component';
import { DeviceListComponent } from './modules/device/components/device-list/device-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/panel/', '.json');
}

const routes: Route[] = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [() => inject(AuthService).isUserAuthenticated()],
    canActivateChild: [() => inject(AuthService).isUserAuthenticated()],
    children: [
      {
        path: 'device',
        loadChildren: () => import('./modules/device/device.module').then((m) => m.DeviceModule)
      }
    ]
  },
];

@NgModule({
  declarations: [PanelComponent],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
      defaultLanguage: localStorage.getItem('lang') || 'pl',
    }),
  ],
})
export class PanelModule {
  constructor(
    private translate: TranslateService,
    private translateHelper: TranslateHelperService
  ) {
    translateHelper.reload(translate);
    translateHelper.lang$.subscribe(() => translateHelper.reload(translate));
  }
}
