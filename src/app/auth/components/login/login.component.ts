import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthFacadeService } from '../../store/auth-facade.service';
import { ValidateFormBefore } from '../../../shared/components/form-base/validate-form-before';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends ValidateFormBefore {
  private authFacadeService = inject(AuthFacadeService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
  });
  passwordInputType: 'password' | 'text' = 'password';
  isSubmitting$ = this.authFacadeService.isSubmitting$;

  dispatchSubmitAction(): void {
    this.authFacadeService.login(this.form.getRawValue());
  }

  togglePasswordVisibility(): void {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }
}
