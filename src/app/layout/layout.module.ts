import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { BrandsComponent } from './brands/brands.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [LayoutComponent, BrandsComponent, FrequentlyAskedQuestionsComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
