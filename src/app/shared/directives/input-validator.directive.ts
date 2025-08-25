import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export function inputValidator(pattern: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = new RegExp(pattern).test(control.value);
    return result? null : {pattern : {value: control.value}};
  }
}

@Directive({
  selector: '[inputValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: InputValidatorDirective, multi: true
    }
  ]
})
export class InputValidatorDirective implements Validators {

  @Input('nameValidator') pattern: string = '';
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return inputValidator(this.pattern)(control);
  }

}
