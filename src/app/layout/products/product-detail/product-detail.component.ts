import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import { CartService } from 'src/app/shared/services/cart.service.js';
import { OrderService } from 'src/app/shared/services/order.service.js';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import "../../../../assets/js/product_zoom.js";
@Component({
  selector: 'yaari-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('warningModal') warningModal;
  constructor(private localStorageService: LocalStorageService, private cookie: CookieService,
    private readonly http: HttpClient, private route: ActivatedRoute,
    private productService: ProductService, private cartService: CartService,
    private orderService: OrderService, private router: Router,
    private toastr: ToastrService, private modalService: NgbModal) {
  }

  public modalRef: NgbModalRef;
  public quantity: number = 1;
  public productId: any = 0;
  public productObj: any = {};
  public showBuyNowBtn: boolean = true;
  public subTotal : any = 0;
  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.productId = this.route.snapshot.params.id;
    }
    if (this.cookie.get('cart')) {
      this.showBuyNowBtn = true;
    }
    this.getProductDetailById();
  }

  getProductDetailById() {
    this.productService.getProductById(this.productId).subscribe(res => {
      this.productObj = res;
      this.subTotal = this.productObj.sellingPrice
    })
  }

  addToCart() {
    if (!this.cookie.get('cart')) {
      this.cartService.createCart().subscribe(res => {
        if (res['id']) {
          this.productObj['productId'] = JSON.parse(this.productId);
          this.productObj['cartId'] = res['id'];
          // this.productObj['status'] = 'active';
          this.showBuyNowBtn = true;
          const payload = {
            cartId: res['id'],
            productId: JSON.parse(this.productId),
            quantity: this.quantity,
            businessId: this.productObj['businessId']
          }
          this.cartService.createCartDetail(payload).subscribe(response => {
            console.log("response---", response);
            try {
              this.toastr.success('Product added successfully');
            } catch (error) {
              this.toastr.error('Error,', error);
            }
          })
        }
        this.cookie.set('cart', JSON.stringify({id : res['id']}), { expires: 365, path: '/' });
      })
    } else {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      this.productObj['productId'] = JSON.parse(this.productId);
      this.productObj['cartId'] = cartObj['id'];
      // this.productObj['status'] = 'active';
      this.showBuyNowBtn = true;
      const payload = {
        cartId: cartObj['id'],
        productId: JSON.parse(this.productId),
        quantity: this.quantity
      }
      this.cartService.createCartDetail(payload).subscribe(response => {
        console.log("response---", response);
        this.toastr.success('Product added successfully',);
      })
    }
  }

  buyNow() {
    if (!this.localStorageService.get('user-detail')) {
      // alert('User sign in or sign up is required!')
      this.warningModal.open();
    }
    if (this.cookie.get('cart')) {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      this.router.navigate(['/app/orders/place-order'], { queryParams: { id: cartObj['id'] } })
    } else if (!this.cookie.get('cart')) {
      this.cartService.createCart().subscribe(res => {
        if (res['id']) {
          this.productObj['productId'] = JSON.parse(this.productId);
          this.productObj['cartId'] = res['id'];
          // this.productObj['status'] = 'active';
          this.showBuyNowBtn = true;
          const payload = {
            cartId: res['id'],
            productId: JSON.parse(this.productId),
            quantity: this.quantity
          }
          this.cartService.createCartDetail(payload).subscribe(response => {
            console.log("response---", response);
            try {
              this.toastr.success('Product added successfully',);
            } catch (error) {
              this.toastr.error('Error,', error);
            }
          })
        }
        this.cookie.set('cart', JSON.stringify({id : res['id']}), { expires: 365, path: '/' });
        if (this.cookie.get('cart')) {
          const cartObj = JSON.parse(this.cookie.get('cart'));
          this.router.navigate(['/app/place-order'], { queryParams: { id: cartObj['id'] } })
          // const userObj = JSON.parse(this.localStorageService.get('user-detail'));
          // const payload = {
          //   cartId: cartObj['id'],
          //   addressId: 5,
          //   userId: userObj['id']
          // }
          // this.orderService.createOrder(payload).subscribe(res => {
          //   try {
          //   } catch (error) {
          //     console.error("Error--------",error);  
          //   }
          // })
        }
      })
    }
  }

  increaseQuantity() {
    if (this.quantity != 10) {
      this.quantity = this.quantity + 1;
      this.subTotal = Math.round(this.productObj.sellingPrice * this.quantity);
    }
  }

  decreaseQuantity() {
    if (this.quantity != 1) {
      this.quantity = this.quantity - 1;
      this.subTotal = Math.round(this.productObj.sellingPrice * this.quantity);
    }
  }
}
