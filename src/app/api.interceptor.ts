import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from './config/app.config';
import { AppConfigInterface } from './config/app-config.interface';
import { PersistenceLsService } from './services/persistence/persistence-ls.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfigInterface,
    private persistenceLocalStorage: PersistenceLsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let url = request.url;

    if (this.shouldBePrefixed(url)) {
      url = this.config.apiUrl + request.url;
    }

    const headers = request.headers;
    const accessToken = this.persistenceLocalStorage.getValue('access_token');

    headers.set('Authorization', `Bearer ${accessToken}`);

    const clonedRequest = request.clone({
      url,
      headers,
    });

    return next.handle(clonedRequest);
  }

  private shouldBePrefixed(url: string): boolean {
    return !url.includes('assets');
  }
}
