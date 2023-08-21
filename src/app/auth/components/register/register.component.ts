import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { matchValueValidator } from '../../../shared/validators/match-value.validator';
import { AuthFacadeService } from '../../store/auth-facade.service';
import { ValidateFormBefore } from '../../../shared/components/form-base/validate-form-before';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends ValidateFormBefore {
  private authFacadeService = inject(AuthFacadeService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirm_password: ['', [Validators.required, Validators.minLength(12)]],
      terms: [false, [Validators.requiredTrue]],
    },
    { validators: [matchValueValidator(['password', 'confirm_password'])] }
  );
  isSubmitting$ = this.authFacadeService.isSubmitting$;

  togglePasswordVisibility(event: MouseEvent): void {
    const input = event.target as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  dispatchSubmitAction(): void {
    this.authFacadeService.register(this.form.getRawValue());
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
