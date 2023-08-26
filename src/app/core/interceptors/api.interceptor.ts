import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../../config/app.config';
import { AppConfigInterface } from '../../config/app-config.interface';
import { PersistenceLsService } from '../../services/persistence/persistence-ls.service';

export const RT_REQUEST = new HttpContextToken(() => false);

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
    const rtRequest = request.context.get(RT_REQUEST);

    let url = request.url;

    if (this.shouldBePrefixed(url)) {
      url = this.config.apiUrl + request.url;
    }

    let headers = request.headers;
    const token =
      rtRequest ?
        this.persistenceLocalStorage.getValue('refresh_token') :
        this.persistenceLocalStorage.getValue('access_token');

    headers = headers
      .set('Authorization', `Bearer ${token}`)
      .set('Accept-Language', localStorage['lang'] ?? 'pl');

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
