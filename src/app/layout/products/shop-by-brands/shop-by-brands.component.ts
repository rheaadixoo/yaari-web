import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-brands',
  templateUrl: './shop-by-brands.component.html',
  styleUrls: ['./shop-by-brands.component.scss']
})
export class ShopByBrandsComponent implements OnInit {

 /**
 * Brand id will come inside this.
 */
  public shopByBrand: any;
  constructor() { }

  ngOnInit(): void {
  }

}
