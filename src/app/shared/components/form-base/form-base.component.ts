import { ChangeDetectorRef, Directive, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ValidateFormBefore } from './validate-form-before';

@Directive()
export abstract class FormBaseComponent<T = unknown> extends ValidateFormBefore implements OnInit {
  protected cdr = inject(ChangeDetectorRef);
  protected fb = inject(FormBuilder);

  @Output('onSubmit') onSubmitEvent = new EventEmitter<T>();
  @Input() initialValues: T;

  ngOnInit(): void {
    if (!this.initialValues) {
      return;
    }

    this.form.patchValue(this.initialValues);
    console.log(this.initialValues);
    this.cdr.markForCheck();
  }

  dispatchSubmitAction(): void {
    this.onSubmitEvent.emit(this.form.getRawValue());
  }
}
