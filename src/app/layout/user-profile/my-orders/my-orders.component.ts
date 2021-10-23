import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import * as _ from "lodash";
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { data } from 'jquery';
import { JSDocComment } from '@angular/compiler';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';


@Component({
  selector: 'yaari-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  @ViewChild('modal') modal;
  public a: number = 0;
  public count: number = 0;

  public myOrders: any = [];
  public data: any = [];

  public show = false;
  public modalRef: NgbModalRef;
  public reason = "0";
  //  page = 4;
  // TotalLength: any;
  // p: number = 1;

  public productCount:number=5;
  public allProducts:any=[];
 public order:any=[];
public activities:any=[];
  cancelOrderForm = new FormGroup({
    reason: new FormControl('Select the reason for cancel order'),
    text: new FormControl('')
  })


  //  public cancelOrderForm: FormGroup = new FormGroup({});
  constructor(private orderService: OrderService, private localStorageService: LocalStorageService
    , private router: Router, private modalService: NgbModal,private pageloader:PageLoaderService) { }

  ngOnInit(): void {
     this.getUserOrders();
      //  this.getAllProducts();
    // this.showtext();
  }
  // document.getElementById("try").onclick="showtext()"


  save(item){
    console.log(this.cancelOrderForm.value);
    let payload={
      value:this.cancelOrderForm.value
    }
    this.orderService.cancelOrder(item.id,payload).subscribe(resp=>{
      console.log(resp);
      this.closeModal();
      // this.getUserOrders();
      // this.getAllProducts();
    })

  }

  
  
  selectReason(reason) {
    //  let sel=document.getElementById("try");
    // this.reason = reason;
    // console.log(this.reason);
    // console.log(this.cancelOrderForm.value.reason);
    if (this.cancelOrderForm.value.reason == "Other") {
      this.show = true;
    }
    else {
      this.show = false;
    }


  }



  closeModal() {

    this.modalRef.close();
  }
  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  getUserOrders() {
    this.pageloader.startLoading();
    this.orderService.getOrders(this.userData.id).subscribe((res: any[]) => {
      this.myOrders = res;
      console.log(res);
      this.pageloader.stopLoading();
      // //GET —-> /delhiveries/track-order/{orderId}
      // POST ——> /delhiveries/cancel-order/{orderId}
      // console.log(this.data);
    })
    

    
    console.log(this.allProducts);
  }

  cancelProductOrder(item) {
    // this.orderService.cancelOrder(item.id).subscribe(resp => {
    //   console.log("resp", resp);
    //   console.log(item);
      // this.show=true;
      // this.getUserOrders();
      this.modalRef = this.modalService.open(this.modal, { windowClass: 'orderSummary', centered: true, keyboard: false });
      console.log(this.show);
      // this.showtext();
      // this.router.navigate(['app/cancelOrder']);
    // })
  }

  viewMore() {
    this.productCount += 5; 
  }

  viewLess(){
    
  }

}
