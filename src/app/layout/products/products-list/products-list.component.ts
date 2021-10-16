import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/shared/services/wishlist.service.js';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import {UserProfileService} from 'src/app/shared/services/user-profile.service';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  /**
   * 
  */
  public products: any = [];
  public subCatId: number = 0;
  public subCatName: string = '';
  public catName: string = '';
  public section: string = '';
  public position: string = '';
  public brandIds=[];
  public size=[];
  public colorIds=[];
  public priceIds=[];
  public discountIds=[];
  public isProductListLoaded: boolean = false;


  constructor(
    private productService: ProductService, private router: Router, private route: ActivatedRoute
    , private wishlistService: WishlistService, private cookie: CookieService,
    private toastr: ToastrService, private localStorageService: LocalStorageService,
    private userService: UserProfileService,
    private domSanitizer: DomSanitizer,
    private pageLoaderService: PageLoaderService) {
    // this.productService.currentProductStage.subscribe(res => {
    //   this.subCatId = res['item_id'];
    //   this.subCatName = res['item_name'];
    //   this.catName = res['category'];
    //   this.getProductsList();`
    //   this.sortProductList('low');
    // })
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  checkId:any=0;
  isIconShow=false;

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.section && this.route.snapshot.queryParams.position ) {
      this.section = this.route.snapshot.queryParams.section;
      this.position = this.route.snapshot.queryParams.position;
    }
    // setTimeout(()=>{
      this.isProductListLoaded = true;
      console.log('this.isProductListLoaded: ', this.isProductListLoaded);
    // },5000);
    this.getProductsList();
    // this.sortProductList('low');

  if( this.userDetail.id != null){
    //console.log(this.userDetail.id)
    this.isIconShow=true;
  }
  }


  getBrandIds(id){
    console.log("@output:"+id)
    this.brandIds=id;
    this.getProductsList()
  }

  getSizes(id){
    console.log("@output:"+id)
    this.size=id;
    this.getProductsList()
  }


  getColorIds(id){
    console.log("@output:"+id)
    this.colorIds=id;
    this.getProductsList()
  }

  getPriceIds(id){
    this.priceIds=id;
    this.getProductsList()
  }

  getDiscountIds(id){
    this.discountIds=id;
    this.getProductsList()
  }

  getProductsList() {
    
    if (this.subCatId) {
    this.pageLoaderService.startLoading();    

      this.productService.getProductsList(this.subCatId,this.colorIds,this.brandIds,this.priceIds,this.discountIds,this.size).subscribe((response:[]) => {
        
        if(response && response.length){
          this.products = response;
          this.getWishlistDetail();
          this.productImgs(this.products[0]['images'][0]);
        }
        else{
          this.products = [];
          console.log("No product are there");
        }
        this.pageLoaderService.stopLoading();
        
      })
    }
  }

  getWishlistDetail() {
    if (this.cookie.get('wishlist')) {
      const wishlistObj = JSON.parse(this.cookie.get('wishlist'));
      this.wishlistService.fetchWishListDetails(wishlistObj.id).subscribe((res: any[]) => {
        if (res && res.length > 0) {
          for (let i = 0; i < this.products.length; i++) {
            for (let j = 0; j < res.length; j++) {
              if (this.products[i]['id'] == res[j]['productId']) {
                this.products[i]['wishlist_id'] = res[j]['id'];
                this.products[i]['is_added_in_wishlist'] = true;
              }
            }
          }
        }
      })
    }
  }

  removeProductFromWishlist(id) {
    this.wishlistService.deleteWishlistDetail(id).subscribe(res => {
      console.log("-success-- remove product");
      this.getProductsList();
    }, error => {
      console.log("error remove product", error);
    })
  }

  filterProductData(payload) {
    this.productService.filterProductsList(payload).subscribe(response => {
      this.products = response;
    })
  }

  showProductDetailView(id) {
    this.router.navigateByUrl(`app/products/detail/${id}`)
  }

  sortProductList(type) {
    let filterOptions = {};
    switch (type) {
      case ('feature'): {
        filterOptions = { subCategoryId: this.subCatId, isFeatured: true };
        this.filterProductData(filterOptions);
        break;
      }
      case ('low'): {
        filterOptions = { subCategoryId: this.subCatId, sort: { by: 'price', type: 'ASC' } };
        this.filterProductData(filterOptions);
        break;
      }
      case ('high'): {
        filterOptions = { subCategoryId: this.subCatId, sort: { by: 'price', type: 'DESC' } };
        this.filterProductData(filterOptions);
        break;
      }
      case ('new'): {
        filterOptions = { subCategoryId: this.subCatId, sort: { by: 'createdAt', type: 'DESC' } };
        this.filterProductData(filterOptions);
        break;
      }
      default: {
        break;
      }
    }
  }

  
  addToWishList(product) {
      
      console.log('the details'+this.userDetail.id);
      console.log("list",this.products);
      console.log('product: ', product);
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
              productId: product['id'],
              quantity: 1,
              businessId: product['businessId']
            }
            this.addToWishListDetails(data);
            this.cookie.set('wishlist', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
          }
        })
      } else if (this.cookie.get('wishlist')) {
        const data = {
          wishlistId: this.wishlistObj['id'],
          productId: product.id,
          quantity: 1,
          businessId: product['businessId']
        }
        this.wishlistService.isProductExistInWishlist(this.wishlistObj['id'], product['id']).subscribe((response: any[]) => {
          if (!response.length) {
            this.addToWishListDetails(data);
          } else {
              this.getProductsList();
          }
        })
      } 
   }
  addToWishListDetails(data) {
    console.log('data: ', data);
    this.wishlistService.createWishListDetail(data).subscribe(res => {
      this.getProductsList();
      this.toastr.success('Successfully added to wishlist');
    }, error => {
      this.toastr.error('Some error occurred while adding to wishlist please try again');
    })
  }

  get userDetail() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  get wishlistObj() {
    return JSON.parse(this.cookie.get('wishlist'));
  }
  
  productImgs(img){
    let imgUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(img);
    // console.log('imgUrl: ', imgUrl['changingThisBreaksApplicationSecurity']);
    return imgUrl['changingThisBreaksApplicationSecurity'];
  }

  

}
