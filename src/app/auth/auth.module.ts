import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TranslateHelperService } from '../services/translate-helper/translate-helper.service';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffect } from './store/effects/login.effect';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/auth/', '.json');
}

const routes: Route[] = [
  {
    path: '',
    component: AuthWrapperComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LoginEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
      defaultLanguage: localStorage.getItem('lang') || 'pl',
    }),
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AuthWrapperComponent,
  ],
})
export class AuthModule {
  constructor(
    private translate: TranslateService,
    private translateHelper: TranslateHelperService
  ) {
    translateHelper.reload(translate);
    translateHelper.lang$.subscribe((lang) =>
      translateHelper.reload(translate)
    );
  }
}
