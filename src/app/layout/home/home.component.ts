import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from "jquery";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public isViewLoaded: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  customOptions1: OwlOptions = {
    loop: true,
    autoplay: true,
    navText: ['', ''],
    margin: 30,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  }

  slidesStore = [
    {
      id: 1,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: '0',
      alt: 'Image_1',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 2,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_2',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 3,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_3',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 4,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_4',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 5,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_5',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    }
  ]

  activeSlides: SlidesOutputData;

  constructor(private router: Router) { }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  ngOnInit(): void {
    // setTimeout(()=>{
    this.isViewLoaded = true;
    console.log('this.isViewLoaded: ', this.isViewLoaded);
    // },5000)
  }

  onChange(item) {

    if(item === "Indian & Fusion Wear"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Indian & fusion wear", category: "Indian & fusion wear" } });
    }
    else if(item==="T-shirts"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "T-shirts", category: "Men's Topwear" } });
    }
    else if(item==="Tops & Tunics"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Tops & Tunics", category: "Women Western Topwear" } });
    }
    else if(item==="All Collection"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "10% off deals" ,category: "All Collection"} });
    }

    else if(item==="Jewellery Sets"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Jewellery Sets", category: "Women's Jewellery" } });
    }
    else if(item==="Showpieces & Figurines"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "Showpieces & Figurines", category: "Home Décor" } });
    }
    else if(item==="Earrings"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Earrings", category: "Women's Jewellery"} });
    }
    else if(item==="Bedding Sets"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "Bedding Sets", category: "Bedsheets & Furnishing"} });
    }

    else if(item==="Sarees"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Sarees", category: "Indian & Fusion Wear" } });
    }
    else if(item==="Kurtas & Kurtis"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "Kurtas & Kurtis", category: "Indian & Fusion Wear" } });
    }
    else if(item==="Poncho"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Poncho", category: "Women Western Topwear"} });
    }
    else if(item==="Men\'s Topwear"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "Men\'s Topwear"} });
    }

    else if(item==="Face Makeup"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Face Makeup", category: "Makeup" } });
    }
    else if(item==="Footwear"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "Footwear" } });
    }
    else if(item==="Handbags"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 24, item_name: "Handbags", category: "Women\'s Bags"} });
    }
    else if(item==="Makeup Accessory"){
      this.router.navigate([`app/products`], { queryParams: { 'sub_id': 62, item_name: "Makeup Accessory", category: "Makeup"} });
    }



    // this.router.navigate([`app/products`], { queryParams: { 'sub_id': 2, item_name: "Kurta & Kurtis", category: "Indian & fusion wear" } });
  }
}
