import { FormGroup } from '@angular/forms';


export function ConfirmPassword (controlName: string, matchingControlName: string) {
  return ( _formGroup: FormGroup) => {
      const control = _formGroup.controls[controlName];
      const matchingControl = _formGroup.controls[matchingControlName];
      if ( matchingControl.errors && !matchingControl.errors.confirmPassword ) {
        return ; // it return if another validator has already found an error on matchingControl
      }

      // set error on matchingControl if validation  fails
      if ( control.value !== matchingControl.value ) {
          matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
  };
}
