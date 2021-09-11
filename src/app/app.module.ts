import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './layout/header/header.module';
import { FooterModule } from './layout/footer/footer.module';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutModule } from './layout/layout.module';
import { PageLoaderService } from './layout/page-loader/page-loader.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule,
    NgbModule,
    LayoutModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgSelectModule
  ],
  providers: [CookieService, PageLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
