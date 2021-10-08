import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';


import * as _ from "lodash";
import { NgbModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'yaari-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
 
@ViewChild('modal') modal;
  public myOrders: any = [];
  public modalRef: NgbModalRef;

  constructor(private orderService: OrderService, private localStorageService: LocalStorageService,private router:Router,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getUserOrders();
  }

  openModal=false;
  
  
  closeModal(){
    this.modalRef.close();
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

        this.modalRef = this.modalService.open(this.modal, { windowClass : 'orderSummary' ,backdrop: 'static', keyboard: false, centered: true })
        

        this.getUserOrders();
       
        // this.router.navigate(['app/cancel-order']);
        // this.router.navigateByUrl('/cancel-order');
    })
  }
}
