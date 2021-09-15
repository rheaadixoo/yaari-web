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
import { WishlistService } from 'src/app/shared/services/wishlist.service.js';
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
    private toastr: ToastrService, private modalService: NgbModal,
    private wishlistService: WishlistService) {

    this.productService.currentProductStage.subscribe(res => {
      if (res && res.id) {
        this.productId = res.id;
      }
      this.getProductDetailById();
    })
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  public modalRef: NgbModalRef;
  public quantity: number = 1;
  public productId: any = 0;
  public productObj: any = {};
  public showBuyNowBtn: boolean = true;
  public subTotal: any = 0;
  public productList: any = [];
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
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(res => {
        this.productObj = res;
        this.subTotal = this.productObj.sellingPrice;
        this.getProductListById(this.productObj['subCategoryId']);
      })
    } else {
      return;
    }
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
        this.cookie.set('cart', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
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
        quantity: this.quantity,
        businessId: this.productObj['businessId']
      }
      this.cartService.createCartDetail(payload).subscribe(response => {
        console.log("response---", response);
        this.toastr.success('Product added successfully',);
      })
    }
  }

  buyNow() {
    if (this.localStorageService.get('user-detail') == false) {
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
            quantity: this.quantity,
            businessId: this.productObj['businessId']
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
        if (!this.cookie.get('cart')) {
          this.cookie.set('cart', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
        }
        if (this.cookie.get('cart')) {
          const cartObj = JSON.parse(this.cookie.get('cart'));
          this.router.navigate(['/app/place-order'], { queryParams: { id: cartObj['id'] } })
        }
      })
    }
  }

  addToWishList() {
    let payload;
    if (this.userDetail) {
      payload = { userId: this.userDetail.id };
    } else {
      payload = { userId: null };
    }
    if (!this.cookie.get('wishlist')) {
      this.wishlistService.createWishList(payload).subscribe(res => {
        if (res['id']) {
          const data = {
            wishlistId: res['id'],
            productId: JSON.parse(this.productId),
            quantity: this.quantity,
            businessId: this.productObj['businessId']
          }
          this.addToWishListDetails(data);
          this.cookie.set('wishlist', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
        }
      })
    } else if (this.cookie.get('wishlist')) {
      const data = {
        wishlistId: this.wishlistObj['id'],
        productId: JSON.parse(this.productId),
        quantity: this.quantity,
        businessId: this.productObj['businessId']
      }
      this.addToWishListDetails(data);
    }
  }

  get wishlistObj() {
    return JSON.parse(this.cookie.get('wishlist'));
  }

  addToWishListDetails(data) {
    this.wishlistService.createWishListDetail(data).subscribe(res => {
      this.toastr.success('Successfully added to wishlist');
    }, error => {
      this.toastr.error('Some error occurred while adding to wishlist please try again');
    })
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

  get userDetail() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  getProductListById(productId) {
    if(productId){
      this.productService.getProductListById(productId).subscribe((res : any[]) => {
        if(res && res.length > 0){
          this.productList = res;
        }
      }, error => {
      })
    }else{
      this.productList = [this.productObj];
    }
  }
  /**
   * Method for setting dynamic background image url on the zoom overlay div when product image get clicked
   */
  setZoomOverlayUrl() {
    document.getElementById('zoom-overlay').style.background = `url(${this.productObj.thumbImages})`
    console.log('document.getElementByIdstyle.background: ', document.getElementById('zoom-overlay').style.background);
  }

  openInDetailView(item) {
    this.router.navigate([`app/products/detail/${item.id}`]);
  }
}
