import { Injectable } from '@angular/core';
import { Observable, of, delay, map, filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LoginRequestInterface } from '../types/login-request.interface';
import { LoginResponseInterface } from '../types/login-response.interface';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { currentUserSelector } from '../store/selectors';
import { Router } from '@angular/router';
import { ToastrTranslationService } from 'src/app/services/toastr/toastr-translation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<AppStateInterface>,
    private router: Router,
    private toastrTranslation: ToastrTranslationService
  ) {}

  login(req: LoginRequestInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>(`/auth/signin`, req);
  }

  logout(userId: number): Observable<any> {
    return this.http.post<any>('/auth/logout', { userId });
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>('/auth/refresh', null);
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(currentUserSelector),
      map((user) => !!user),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.toastrTranslation.error('common.errors.not-authenticated');
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
