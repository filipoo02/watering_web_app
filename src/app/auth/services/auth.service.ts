import { Injectable } from '@angular/core';
import { Observable, map, catchError, switchMap, of } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { LoginRequestInterface } from '../types/login-request.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { ToastrTranslationService } from 'src/app/services/toastr/toastr-translation.service';
import { AuthCredentialsInterface } from '../types/auth-credentials.interface';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { PersistenceLsService } from '../../services/persistence/persistence-ls.service';
import { RT_REQUEST } from '../../api.interceptor';
import { RefreshTokenInterface } from '../types/refresh-token.interface';
import { selectCurrentUser } from '../store/reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<AppStateInterface>,
    private router: Router,
    private toastrTranslation: ToastrTranslationService,
    private persistenceLsService: PersistenceLsService
  ) {}

  login(req: LoginRequestInterface): Observable<AuthCredentialsInterface> {
    return this.http.post<AuthCredentialsInterface>(`/auth/signin`, req);
  }

  register(
    req: RegisterRequestInterface
  ): Observable<AuthCredentialsInterface> {
    return this.http.post<AuthCredentialsInterface>(`/auth/signup`, req);
  }

  logout(): Observable<any> {
    return this.http.post<any>('/auth/logout', null);
  }

  refreshToken(): Observable<RefreshTokenInterface> {
    return this.http.post<any>('/auth/refresh', null, {
      context: new HttpContext().set(RT_REQUEST, true),
    });
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(selectCurrentUser),
      map((user) => !!user),
      switchMap((isLoggedIn) => {
        if (this.persistenceLsService.getValue('refresh_token')) {
          return this.refreshToken().pipe(
            map(({ access_token, refresh_token }) => {
              this.persistenceLsService.setValue('access_token', access_token);
              this.persistenceLsService.setValue(
                'refresh_token',
                refresh_token
              );
              return true;
            }),
            catchError(() => {
              this.router.navigateByUrl('/auth/login');
              return of(false);
            })
          );
        }
        if (!isLoggedIn) {
          this.toastrTranslation.error('common.errors.not-authenticated');
          this.router.navigateByUrl('/auth/login');
        }

        return of(isLoggedIn);
      })
    );
  }
}
