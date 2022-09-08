import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function confirmPasswordCheck(form:UntypedFormGroup): { [key: string]: any } | null {     
    return form.get('Password')?.value === form.get('ConfirmPassword')?.value ? null : { confirmPasswordNotMatchError: true }
}
