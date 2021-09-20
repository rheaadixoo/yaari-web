import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import "../../../assets/js/popper.min.js";
import * as $ from "jquery"
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'yaari-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public isBtnClicked: boolean = false;
  public userOptions: boolean = false;
  public searchValue: string = '';
  public productList: any = [];
  public placeValue : any = 'Search Products...'
  private docEle: any = {};
  public productCount : any = 0;
  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router,
    private productService: ProductService,private cookie : CookieService,
    private cartService : CartService) {
        this.cartService.cartItemCount.subscribe(response =>{
          this.productCount = response;
        })
     }

  ngOnInit(): void {
      this.getCartDetail();
  }

  get isUserLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

    /**
   * Close signin signup option popup
   * @param event event object
   */
     closePopUp(event){
      let _that = this;
      if(event.target.id == 'sign_in_option'){
          if(document.querySelector(".before_login")){
            document.querySelector(".before_login").addEventListener('click', (e) => {
              _that.docEle = e;
            }); 
          }
      }else if(event.target != _that.docEle['target']){
        this.isBtnClicked = false;
        this.userOptions = false;
      }
    }

  logout() {
    let _that = this;
    localStorage.clear()
    this.userOptions = false;
    this.cookie.deleteAll();
    _that.router.navigate(['/home']);
    this.changeDetectorRef.detectChanges()
  }

  get getUserName() {
    if (localStorage.getItem('user-detail')) {
      let userObj = JSON.parse(localStorage.getItem('user-detail'));
      return userObj.name;
    }
  }

  searchProduct(event) {
    let text = event.term;
    this.productList = [];
    if (text === '' || text.length < 1) {
      this.placeValue = "Search Products...";
      return
    }
    this.placeValue = "";
    this.productService.searchProducts(text).subscribe(res => {
      // console.log("Re-s---", res);
      this.productList = res;
    })
  }

  onChange(product) {
    if (product) {
      this.router.navigateByUrl(`app/products/detail/${product.id}`);
      // if (this.router.url.includes('/products/detail')) {
      //   this.productService.stage.next(product);
      // } else {
      // }
    }
  }

  getCartDetail() {
    let cartObj = {};
    if(this.cookie.get('cart')){
      cartObj = JSON.parse(this.cookie.get('cart'));
      if(cartObj){
        this.cartService.getCart(cartObj['id']).subscribe((res : any[]) => {
          this.productCount = res.length;
        })
      }
    }else {
      this.productCount = 0;
    }
  }

  // get cartProductCount(){
  //   return this.productCount;
  // }
}
