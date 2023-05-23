import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { FormBaseComponent } from '../../../shared/components/form-base/form-base.component';
import { AppStateInterface } from '../../../shared/types/app-state.interface';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector } from '../../store/selectors';
import { matchValueValidator } from '../../../shared/validators/match-value.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormBaseComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  togglePasswordVisibility(event: MouseEvent): void {
    const input = event.target as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  override dispatchSubmitAction(): void {
    this.store.dispatch(registerAction({ request: this.form.value }));
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  private initializeForm(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(12)]],
        confirm_password: ['', [Validators.required, Validators.minLength(12)]],
        terms: [false, [Validators.requiredTrue]],
      },
      { validators: [matchValueValidator(['password', 'confirm_password'])] }
    );
  }

  get passwordsNotMatch(): boolean {
    const passwordControl = this.form.get('password');
    const confirmPasswordControl = this.form.get('confirm_password');

    if (!(passwordControl?.value && confirmPasswordControl?.value)) {
      return false;
    }

    if (!this.form.errors) {
      return false;
    }

    return !!(
      passwordControl?.touched &&
      confirmPasswordControl?.touched &&
      this.form.errors['notMatch']
    );
  }
}
