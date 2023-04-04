import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {filter, Observable} from 'rxjs';

import {AppStateInterface} from 'src/app/shared/types/app-state.interface';
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface';
import {loginAction} from '../../store/actions/login.action';
import {
  currentUserSelector,
  isSubmittingSelector,
} from '../../store/selectors';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface>;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(12), Validators.required]]
  })

  constructor(private store: Store<AppStateInterface>, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.currentUser$ = this.store.pipe(
      select(currentUserSelector),
      filter(Boolean)
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      loginAction({request: {email: this.emailControl.value, password: this.passwordControl.value}})
    );
  }

  get emailControl(): FormControl {
    return this.form.controls.email;
  }

  get passwordControl(): FormControl {
    return this.form.controls.password;
  }
}
