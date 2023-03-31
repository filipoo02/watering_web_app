import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { loginAction } from '../../store/actions/login.action';
import {
  currentUserSelector,
  isSubmittingSelector,
} from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.currentUser$ = this.store.pipe(
      select(currentUserSelector),
      filter(Boolean)
    );
  }

  onSubmit(): void {
    this.store.dispatch(
      loginAction({ request: { login: 'x', password: 'y' } })
    );
  }
}
