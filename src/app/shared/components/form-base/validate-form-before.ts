import { FormGroup } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive()
export abstract class ValidateFormBefore {
  abstract form: FormGroup;
  abstract dispatchSubmitAction(): void;

  onSubmit(): void {
    if (!this.isFormValid) {
      this.form.markAllAsTouched();
      this.scrollToTheFirstError();
      return;
    }

    this.dispatchSubmitAction();
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  scrollToTheFirstError(): void {
    const fieldWithError =
      document.querySelector<HTMLInputElement>('form input.ng-invalid') ||
      document.querySelector<HTMLTextAreaElement>('form textarea.ng-invalid') ||
      document.querySelector<HTMLInputElement>('.form-group input.ng-invalid') ||
      document.querySelector<HTMLInputElement>('.form-group textarea.ng-invalid');

    if (!fieldWithError) {
      return;
    }

    fieldWithError.focus();
  }
}
