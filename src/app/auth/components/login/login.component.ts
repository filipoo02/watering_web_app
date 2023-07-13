import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormBaseComponent } from '../../../shared/components/form-base/form-base.component';
import { AuthFacadeService } from '../../store/auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  private authFacadeService = inject(AuthFacadeService);
  private fb = inject(FormBuilder);

  passwordInputType: 'password' | 'text' = 'password';
  isSubmitting$ = this.authFacadeService.isSubmitting$;

  ngOnInit(): void {
    this.initializeForm();
  }

  dispatchSubmitAction(): void {
    this.authFacadeService.login(this.form.getRawValue());
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
