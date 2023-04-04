import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_CONFIG} from './config/app.config';
import {AppConfigInterface} from './config/app-config.interface';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG) private config: AppConfigInterface) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //  concat api url
    let url = request.url;

    if (this.shouldBePrefixed(url)) {
      url = this.config.apiUrl + request.url;
    }

    const clonedRequest = request.clone({
      url
    })

    // add token to the header
    // let headers = request.headers;
    // headers.set('', `${}`)
    return next.handle(clonedRequest);
  }

  private shouldBePrefixed(url: string): boolean {
    return !url.includes('assets');
  }
}
