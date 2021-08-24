import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [{
  path : '',
  component : OrdersComponent,
  children :[
    { path : 'checkout', component : CheckoutComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
