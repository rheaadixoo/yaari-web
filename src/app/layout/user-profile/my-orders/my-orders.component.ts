import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import * as _ from "lodash";
@Component({
  selector: 'yaari-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public myOrders: any = [];
  constructor(private orderService: OrderService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserOrders();
  }

  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  getUserOrders() {
    this.orderService.getOrders(this.userData.id).subscribe((res: any[]) => {
      this.myOrders = res;
      //GET —-> /delhiveries/track-order/{orderId}
      // POST ——> /delhiveries/cancel-order/{orderId}
    })
  }

  cancelProductOrder(item){
    this.orderService.cancelOrder(item.id).subscribe(resp =>{
        console.log("resp",resp);
        this.getUserOrders();
    })
  }
}
