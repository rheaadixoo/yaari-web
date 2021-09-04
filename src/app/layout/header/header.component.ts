import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import "../../../assets/js/popper.min.js";
import * as $ from "jquery"
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
  private docEle: any = {};
  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {}

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
    if (text === '' || text.length < 2) {
      return
    }
    this.productService.searchProducts(text).subscribe(res => {
      // console.log("Re-s---", res);
      this.productList = res;
    })
  }

  onChange(product) {
    if (product) {
      if (this.router.url.includes('/products/detail')) {
        this.productService.stage.next(product);
      } else {
        this.router.navigateByUrl(`app/products/detail/${product.id}`);
      }
    }
  }
}
