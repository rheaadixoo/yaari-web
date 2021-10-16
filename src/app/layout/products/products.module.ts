import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopByMaterialComponent } from './shop-by-material/shop-by-material.component';
import { ShopByBrandsComponent } from './shop-by-brands/shop-by-brands.component';
import { ShopByColorComponent } from './shop-by-color/shop-by-color.component';
import { ShopBySizeComponent } from './shop-by-size/shop-by-size.component';  
import { CategoriesComponent } from './categories/categories.component';
import { ModalsModule } from '../modals/modals.module';
import "../../../assets/js/product_zoom.js";
import { ShopByDiscountComponent } from './shop-by-discount/shop-by-discount.component';
import { ShopByPriceComponent } from './shop-by-price/shop-by-price.component';
import { ShopByGenderComponent } from './products-list/shop-by-gender/shop-by-gender.component';

@NgModule({
  declarations: [ProductsComponent, ProductsListComponent, ProductDetailComponent, ShopByMaterialComponent, ShopByBrandsComponent, ShopByColorComponent, ShopBySizeComponent,CategoriesComponent, ShopByDiscountComponent, ShopByPriceComponent, ShopByGenderComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
