import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  public isProductListLoaded : boolean = false;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
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

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.sub_id) {
      this.subCatId = this.route.snapshot.queryParams.sub_id;
      this.subCatName = this.route.snapshot.queryParams['item_name'];
      this.catName = this.route.snapshot.queryParams['category'];
    }
    // setTimeout(()=>{
      this.isProductListLoaded = true;
      console.log('this.isProductListLoaded: ', this.isProductListLoaded);
    // },5000);
    this.getProductsList();
    // this.sortProductList('low');
  }

  getProductsList() {
    if(this.subCatId){
      this.productService.getProductsList(this.subCatId).subscribe(response => {
        this.products = response;
      })
    }
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
}
