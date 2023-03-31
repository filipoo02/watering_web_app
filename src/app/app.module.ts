import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TranslateHelperService } from './services/translate-helper/translate-helper.service';
import { LangType } from './services/translate-helper/language.type';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export function HttpLoaderFactory(http: HttpClient) {
  console.log('httploader factory');

  return new TranslateHttpLoader(http, './assets/i18n/main/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translateHelperService: TranslateHelperService) {
    let language = localStorage.getItem('lang') as LangType | null;
    console.log(language);
    if (!language) {
      this.translateHelperService.setLang('pl');
      return;
    }
    this.translateHelperService.setLang(language);
  }
}
