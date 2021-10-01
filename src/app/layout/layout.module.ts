import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { BrandsComponent } from './brands/brands.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-condition/terms-and-condition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from './modals/modals.module';
import { ContactUsModule } from './contact-us/contact-us.module';

@NgModule({
  declarations: [LayoutComponent, BrandsComponent, FrequentlyAskedQuestionsComponent, PrivacyPolicyComponent, TermsAndConditionsComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    ContactUsModule
  ]
})
export class LayoutModule { }
