import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from './components/status/status.component';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    StatusComponent,
    IsAuthenticatedDirective,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IsAuthenticatedDirective
  ]
})
export class LoginModule {}
