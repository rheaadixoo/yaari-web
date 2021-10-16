import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-discount',
  templateUrl: './shop-by-discount.component.html',
  styleUrls: ['./shop-by-discount.component.scss']
})
export class ShopByDiscountComponent implements OnInit {

  @Output() discountId=new EventEmitter()
  
  constructor() { }

  public shopByDiscount: any;
  public discount=[]
  public all_discount_list=[];

  ngOnInit(): void {
    this.getProductDiscount();
  }

  getProductDiscount(){
    this.all_discount_list=[
      {
        
      }
    ]
  }

  onDiscount(id){
    console.log(id);
    if(this.discount.includes(id)){
      let index=this.discount.indexOf(id)
      this.discount.splice(index,1);
      console.log(this.discount)
      // this.discountId.emit(this.discount)
    }
    else{
      this.discount.push(id);
      console.log(this.discount);
      // this.discountId.emit(this.discount)
    }
  }

}
