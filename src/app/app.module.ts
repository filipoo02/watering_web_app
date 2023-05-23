import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TranslateHelperService } from './services/translate-helper/translate-helper.service';
import { LangType } from './services/translate-helper/language.type';
import { APP_CONFIG } from './config/app.config';
import { enviroment } from '../environmets/enviroment';
import { ApiInterceptor } from './api.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { PanelModule } from './panel/panel.module';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { PersistenceLsService } from './services/persistence/persistence-ls.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/main/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    PanelModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('lang') || 'pl',
      extend: true,
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      iconClasses: {
        error: 'wat-toast--error',
        success: 'wat-toast--success',
        info: 'wat-toast--info',
        warning: 'wat-toast--warning',
      },
      toastClass: 'wat-toast',
      extendedTimeOut: 2000,
      tapToDismiss: false,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: enviroment,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translateHelperService: TranslateHelperService, private persistenceLs: PersistenceLsService) {
    let language = this.persistenceLs.getValue('lang') as LangType | null;
    if (!language) {
      this.persistenceLs.setValue('lang', 'pl');
      this.translateHelperService.setLang('pl');
      return;
    }
    this.translateHelperService.setLang(language);
  }
}
