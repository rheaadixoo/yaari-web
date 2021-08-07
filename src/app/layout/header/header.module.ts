import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { CategoryMenuBarComponent } from './category-menu-bar/category-menu-bar.component';


@NgModule({
  declarations: [HeaderComponent, CategoryMenuBarComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
