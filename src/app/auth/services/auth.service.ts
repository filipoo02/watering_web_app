import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { LoginRequestInterface } from '../types/login-request.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(req: LoginRequestInterface): Observable<CurrentUserInterface> {
    // TODO - post type
    return this.http.post<any>(`/api/v1/auth/signin`, req);
  }
}
