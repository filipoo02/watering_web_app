import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import {AuthFacadeService} from '../../auth/store/auth-facade.service';

@Injectable()
export class ReauthenticateInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private authFacade = inject(AuthFacadeService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService
            .refreshToken()
            .pipe(
              tap((res) => this.authFacade.assignTokens(res)),
              switchMap(() => next.handle(req))
            );
        }

        return throwError(() => error);
      }),
    );
  }
}
