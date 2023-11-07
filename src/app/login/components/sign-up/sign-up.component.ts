import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Credentials } from '../../models/models';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicErrorStateMatcher, EqualFieldsErrorStateMatcher } from '../../utils/error-state-matchers';
import { equalFieldsValidator } from '../../utils/equal-fields.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  /* Input/Output */
  @Input() disabled = false;
  @Output() formSubmitted = new EventEmitter<Credentials>();

  /* Password Visibility */
  isPasswordVisible = false;
  isPasswordRepeatVisible = false;

  /* Form */
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordRepeat: ['', [Validators.required]],
  }, {
    validator: equalFieldsValidator('password', 'passwordRepeat')
  });
  equalFieldsErrorStateMatcher = new EqualFieldsErrorStateMatcher();
  basicErrorStateMatcher = new BasicErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  togglePasswordRepeatVisibility(): void {
    this.isPasswordRepeatVisible = !this.isPasswordRepeatVisible;
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(<Credentials>this.form.value);
    }
  }

  /* Getters to access form controls */
  get email(): FormControl {
    return this.form.get('email')! as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password')! as FormControl;
  }
  get passwordRepeat(): FormControl {
    return this.form.get('passwordRepeat')! as FormControl;
  }
}
