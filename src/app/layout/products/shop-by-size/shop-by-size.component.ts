import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'yaari-shop-by-size',
  templateUrl: './shop-by-size.component.html',
  styleUrls: ['./shop-by-size.component.scss']
})
export class ShopBySizeComponent implements OnInit {

  @Output() sizeId=new EventEmitter()

  public shopBySize: any;
  public size=[]


  constructor(private productfilter:ProductFilterService) { }

  ngOnInit(): void {
    this.getProductSize()
  }

  
  getProductSize(){
    
    this.productfilter.getSize().subscribe((response:[]) => {
      console.log(response)
      this.shopBySize=response
    },error => {
      console.log(error);
    })
  }

  

  onSize(id){
    console.log(id);
    if(this.size.includes(id)){
      let index=this.size.indexOf(id)
      this.size.splice(index,1);
      console.log(this.size)
      this.sizeId.emit(this.size)
    }
    else{
      this.size.push(id);
      console.log(this.size);
      this.sizeId.emit(this.size)
    }
  }


}
