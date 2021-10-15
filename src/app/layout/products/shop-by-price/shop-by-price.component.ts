import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-price',
  templateUrl: './shop-by-price.component.html',
  styleUrls: ['./shop-by-price.component.scss']
})
export class ShopByPriceComponent implements OnInit {

  constructor() { }

  public shopByPrice: any;
  public price=[]

  ngOnInit(): void {

    this.getProductPrice()
  }

  getProductPrice(){

  }

  onPrice(id){

  }

}
