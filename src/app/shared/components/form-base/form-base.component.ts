import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class FormBaseComponent {
  form: FormGroup;
  abstract dispatchSubmitAction(): void;

  get isFormValid(): boolean {
    return this.form.valid;
  }

  onSubmit(): void {
    if (!this.isFormValid) {
      this.form.markAllAsTouched();
      this.scrollToTheFirstError();
      return;
    }

    this.dispatchSubmitAction();
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
