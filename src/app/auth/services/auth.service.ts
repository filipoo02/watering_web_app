import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { LoginRequestInterface } from '../types/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly users: CurrentUserInterface[] = [
    { id: 1, login: 'filipsadowski.os@o2.pl' },
  ];

  login(req: LoginRequestInterface): Observable<CurrentUserInterface> {
    return of(this.users[0]).pipe(delay(1000));
  }
}
