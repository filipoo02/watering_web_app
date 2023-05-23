import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function matchValueValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      console.warn(`matchValueValidator should be use on FormGroup.`);
      return null;
    }

    if (!fields.length) {
      console.warn('You need to pass at least one control name to the matchValueValidator');
      return null;
    }

    const group = control as FormGroup;

    if (fields.every(key => group.controls[key].value === group.controls[fields[0]].value)) {
      return null;
    }

    return {notMatch: 'Not every fields match.'};
  }
}
