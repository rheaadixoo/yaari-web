import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '../modals/modals.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule
  ]
})
export class ContactUsModule { }
