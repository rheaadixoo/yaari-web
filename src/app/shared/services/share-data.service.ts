import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { LocalStorageService } from './local-storage.service';
import { UserProfileService } from './user-profile.service';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  
  public userdetails:any
  public count:any=0
  imgUrl="";
  public userId:any

  constructor(private userService:UserProfileService,
    private cart:CartService,private cookie: CookieService,
    private localStorageService: LocalStorageService) { }

 setimageAddress(val?:any,address?:any){
    
    if(val){
      this.userService.getUserDetailsById(val).subscribe((response)=>{
        this.userdetails=response

        this.imgUrl=this.userdetails.profileImage;
     }, 
     error => {
       console.log("uuuuser========", error);
     })

    }
    else{
      this.userId=JSON.parse(this.localStorageService.get('user-detail')).id;
      this.userService.getUserDetailsById(this.userId).subscribe((response)=>{
        this.userdetails=response

        this.imgUrl=this.userdetails.profileImage;
     }, 
     error => {
       console.log("uuuuser========", error);
     })

    }


 }
 
 getimageAddress(){
    return this.imgUrl
  }

  setCartCount(num?:number){
    if(num){
      console.log(num)
      this.count=num
    }
    else{
      let cartObj = {};
      if (this.cookie.get('cart')) {
        cartObj = JSON.parse(this.cookie.get('cart'));
        console.log("cartObj="+cartObj);
        if (cartObj) {
          this.cart.getCart(cartObj['id']).subscribe((res: any[]) => {
            this.count = res.length;
            console.log(this.count)
          })
        }
      } else {
        this.count= 0;
      }
    }
  }
  
  getCartCount(){
    return this.count
  }
 
  
}
