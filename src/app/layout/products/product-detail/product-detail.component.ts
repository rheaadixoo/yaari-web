import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import "../../../../assets/js/product_zoom.js";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import { CartService } from 'src/app/shared/services/cart.service.js';
import { OrderService } from 'src/app/shared/services/order.service.js';

@Component({
  selector: 'yaari-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private cookie: CookieService,
    private readonly http: HttpClient, private route: ActivatedRoute,
    private productService: ProductService, private cartService: CartService,
    private orderService: OrderService, private router: Router) {
  }

  public productJson = [
    {
      id: 1,
      name: 'Velvet Long Gown',
      description: 'Nam tempus turpis at scelerisque in placerat turpis at scelerisque',
      brand_id: '',
      category_id: '',
      price: 500,
      quantity: 1,
      img: '../../../../assets/images/product_list_img.png'
    }
  ];
  public quantity: number = 1;
  public productId: any = 0;
  public productObj: any = {};
  public showBuyNowBtn: boolean = true;
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
    })
  }

  addToCart() {
    if (!this.cookie.get('cart')) {
      this.cartService.createCart().subscribe(res => {
        if (res['id']) {
          this.productObj['productId'] = JSON.parse(this.productId);
          this.productObj['cartId'] = res['id'];
          this.productObj['status'] = 'active';
          this.showBuyNowBtn = true;
        }
      })
      if (this.productObj['productId']) {
        this.cartService.createCartDetail(this.productObj).subscribe(response => {
          console.log("response---", response);
        })
      }
      this.cookie.set('cart', JSON.stringify(this.productObj), { expires: 365, sameSite: 'Lax' });
    } else {
      const cardObj = JSON.parse(this.cookie.get('cart'));
      this.productObj['productId'] = JSON.parse(this.productId);
      this.productObj['cartId'] = cardObj['id'];
      this.productObj['status'] = 'active';
      this.showBuyNowBtn = true;
    }
    // this.localStorageService.set('cart-items', JSON.stringify(this.productObj));
  }

  buyNow() {
    console.log("buyNow");
    if(!this.localStorageService.get('user-detail')){
      alert('User sign in or sign up is required!')
      return ;
    }
    if (this.cookie.get('cart')) {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      const userObj = JSON.parse(this.localStorageService.get('user-detail'));
      const payload = {
        cartId: cartObj['id'],
        addressId: 5,
        userId: userObj['id']
      }
      this.orderService.createOrder(payload).subscribe(res => {
        this.localStorageService.set('order-success', JSON.stringify(res));
        let orderDetail = this.localStorageService.get('order-success');
        let ordr = JSON.parse(orderDetail);
        console.log("ordr amount", res['order'])
        console.log("res", res);
        this.router.navigateByUrl(
          `app/orders/checkout?txnToken=${res['txnToken']}&orderNumber=${res['order'].orderNumber}`);
      })
    }
  }

  increaseQuantity() {
    if (this.quantity != 10) {
      this.quantity = this.quantity + 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity != 0) {
      this.quantity = this.quantity - 1;
    }
  }
}
