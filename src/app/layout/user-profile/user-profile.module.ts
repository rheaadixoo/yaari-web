import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [UserProfileComponent, ChangePasswordComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
