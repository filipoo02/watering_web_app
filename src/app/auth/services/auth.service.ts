import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { LoginRequestInterface } from '../types/login-request.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = '/auth'
  private readonly users: CurrentUserInterface[] = [
    { id: 1, login: 'filipsadowski.os@o2.pl', token: 'qweqweqweqwe', email: 'filipsadowski.o@o2.pl' },
  ];

  constructor(private http: HttpClient) {
  }

  login(req: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<CurrentUserInterface>(`${this.url}/signin`, req);
  }
}
