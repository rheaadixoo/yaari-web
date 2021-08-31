import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('WarningModal') WarningModal;
  public cartDetails: any = [];
  public totalPrice: any = 0;
  public totalDiscount: any = 0;
  public totalAmount: any = 0;
  public totalQuantity: any = 0;
  public cartObj: any = {};
  constructor(private cartService: CartService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.getCartDetail();
  }

  getCartDetail() {
    this.cartObj = JSON.parse(this.cookie.get('cart'));
    this.cartService.getCart(this.cartObj.id).subscribe(res => {
      this.cartDetails = res;
      this.totalAmount = 0;
      this.totalDiscount = 0;
      this.totalQuantity = 0;
      this.totalPrice = 0; 
      this.setTotalAmount();
    })
  }

  setTotalAmount() {
    for (let ele of this.cartDetails) {
      this.totalQuantity += ele.quantity;
      this.totalPrice += Math.round(ele.product.price * ele.quantity);
      this.totalDiscount += Math.round((ele.product.price * ele.quantity) - (ele.product.sellingPrice * ele.quantity));
    }
    this.totalAmount = Math.round(this.totalPrice - this.totalDiscount);
    console.log("quantity after", typeof this.totalAmount);
  }

  increaseQuantity(quantity, id) {
    if (quantity != 10) {
      quantity = quantity + 1;
      for (let item of this.cartDetails) {
        if (item.product.id == id) {
          item.quantity = quantity;
          this.totalAmount = 0;
          this.totalQuantity = 0;
          this.totalPrice = 0;
          this.totalDiscount = 0;
        }
      }
      this.setTotalAmount();
    }
  }

  decreaseQuantity(quantity, id) {
    if (quantity > 1) {
      quantity = quantity - 1;
      for (let item of this.cartDetails) {
        if (item.product.id == id) {
          item.quantity = quantity;
          this.totalAmount = 0;
          this.totalQuantity = 0;
          this.totalPrice = 0;
          this.totalDiscount = 0;
        }
      }
      this.setTotalAmount();
      // this.setTotalAmount();
    }
  }

  get isUserLoggedIn(){
    return localStorage.getItem('token');
  }

  placeOrder() {
    if(!this.isUserLoggedIn){
        this.WarningModal.open();
    }else{

      this.router.navigate(['/app/orders/place-order'], { queryParams: { id: this.cartObj.id } });
    }
  }

  removeProductFromCart(id){
    this.cartService.deleteCartDetail(id).subscribe(res =>{
        console.log("-success-- remove product");
        this.getCartDetail();
    },error =>{
        console.log("error remove product",error);
    })
  }
}
