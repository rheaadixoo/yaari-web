import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCollectionsRoutingModule } from './all-collections-routing.module';
import { AllCollectionsComponent } from './all-collections.component';


@NgModule({
  declarations: [AllCollectionsComponent],
  imports: [
    CommonModule,
    AllCollectionsRoutingModule
  ]
})
export class AllCollectionsModule { }
