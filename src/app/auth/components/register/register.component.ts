import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormBaseComponent } from '../../../shared/components/form-base/form-base.component';
import { matchValueValidator } from '../../../shared/validators/match-value.validator';
import { AuthFacadeService } from '../../store/auth-facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormBaseComponent implements OnInit {
  private authFacadeService = inject(AuthFacadeService);
  private fb = inject(FormBuilder);

  isSubmitting$ = this.authFacadeService.isSubmitting$;

  ngOnInit(): void {
    this.initializeForm();
  }

  togglePasswordVisibility(event: MouseEvent): void {
    const input = event.target as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  override dispatchSubmitAction(): void {
    this.authFacadeService.register(this.form.getRawValue());
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
