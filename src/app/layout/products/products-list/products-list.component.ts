import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  /**
   * 
  */
  public products : any = [];
  public subCatId : number = 0;
  constructor(private productService : ProductService,private router : Router,private route : ActivatedRoute) {
      if(this.route.snapshot.params.sub_id){
          this.subCatId = this.route.snapshot.params.sub_id;
      }
   }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(){
    this.productService.getProductsList(this.subCatId).subscribe(response =>{
        this.products = response;
    })
  }
  
  showProductDetailView(id){
    this.router.navigateByUrl(`app/products/detail/${id}`)
  }

}
