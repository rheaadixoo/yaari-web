import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'yaari-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public myOrders : any = {};
  constructor(private orderService : OrderService,private localStorageService : LocalStorageService) { }

  ngOnInit(): void {
    this.getUserOrders();
  }

  get userData(){
    return JSON.parse(this.localStorageService.get('user-detail'));
  }
  
  getUserOrders(){
    this.orderService.getOrders(this.userData.id).subscribe(res =>{
      console.log("res",res);
    })
  }
}
