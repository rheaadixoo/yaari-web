import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCollectionsComponent } from './all-collections.component';

const routes: Routes = [{
    path : '',
    component : AllCollectionsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCollectionsRoutingModule { }
