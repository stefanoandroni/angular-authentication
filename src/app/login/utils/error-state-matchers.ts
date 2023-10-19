import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class BasicErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const userActions = control?.dirty || control?.touched || form?.submitted;
      const invalidControl = control?.invalid;

      return !!(invalidControl && userActions);
    }
}

export class EqualFieldsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const userActions = control?.dirty || control?.touched || form?.submitted;
    const invalidControl = control?.invalid;
    const invalidParentEqualFields = control?.parent?.hasError('equalFields');

    return !!((invalidControl || invalidParentEqualFields) && userActions);
  }
}