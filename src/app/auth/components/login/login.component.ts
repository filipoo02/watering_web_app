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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormBaseComponent} from '../../../shared/components/form-base/form-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  passwordInputType: 'password' | 'text' = 'password';
  isSubmitting$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface>;
  form: FormGroup;

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.currentUser$ = this.store.pipe(
      select(currentUserSelector),
      filter(Boolean)
    );
  }

  dispatchSubmitAction(): void {
    this.store.dispatch(loginAction({ request: this.form.value }));
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  togglePasswordVisibility(): void {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }
}
