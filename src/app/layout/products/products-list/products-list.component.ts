import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
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
  constructor(private productService : ProductService,private router : Router) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(){
    this.productService.getProductsList().subscribe(response =>{
        this.products = response;
        console.log("products",this.products);
    })
  }
  
  showProductDetailView(id){
    this.router.navigateByUrl(`app/products/detail/${id}`)
  }

}
