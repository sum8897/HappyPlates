import { RegistercustomerComponent } from './../registercustomer/registercustomer.component';
import { RegisterchefComponent } from './../registerchef/registerchef.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule , Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage,RegisterchefComponent,RegistercustomerComponent]
})
export class SignupPageModule {}
