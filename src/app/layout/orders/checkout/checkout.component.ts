import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocationStrategy } from '@angular/common';
import { PageLoaderService } from '../../page-loader/page-loader.service';
@Component({
  selector: 'yaari-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  txnToken = "";
  orderNumber = "";
  actionUrl: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private locationStrategy : LocationStrategy,
    private pageLoaderService: PageLoaderService,
  ) {
    this.preventBackButton();
   }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParam: any) => {
      this.pageLoaderService.startLoading()

      this.txnToken = queryParam.params.txnToken
      this.orderNumber = queryParam.params.orderNumber
      if (!this.txnToken || !this.orderNumber) {
        this.router.navigateByUrl("/")
      } else {
        this.actionUrl = this.domSanitizer.bypassSecurityTrustResourceUrl
          (`${environment.apiUrl}payments/checkout?txnToken=${this.txnToken}&orderNumber=${this.orderNumber}`)
        this.pageLoaderService.stopLoading()
        // console.log("----action url----------", this.actionUrl);
      }
    }
    )
  }


// Define a function to handle back button and use anywhere
preventBackButton() {
  history.pushState(null, null, location.href);
  this.locationStrategy.onPopState(() => {
    history.pushState(null, null, location.href);
  })
}

}