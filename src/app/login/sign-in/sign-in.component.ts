import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Credentials } from '../models';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicErrorStateMatcher } from '../utils/error-state-matchers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  /* Input/Output */
  @Input() disabled = false;
  @Output() formSubmitted = new EventEmitter<Credentials>();

  /* Password Visibility */
  isPasswordVisible = false;

  /* Form */
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  matcher = new BasicErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  toggleVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
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
}
