import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeliveryPincodeService {

  // public apiUrl = environment.apiUrl;

  public apiUrl="https://apiv2.shiprocket.in/v1/external/courier/serviceability/";

  constructor(private http:HttpClient) {
   }

   getDeliveryPincode(pincode){
    console.log(pincode);
    let shiprocketToken=localStorage.setItem('shiprocketToken','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE4MzkxODcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjM0MjA4MzY3LCJleHAiOjE2MzUwNzIzNjcsIm5iZiI6MTYzNDIwODM2NywianRpIjoiYzJXUllISGtwdFA5U1NsNCJ9.clV7vfamPyfq_Yz5q51FitEIZ58XiDIoomwFDAzRtUg');
    let token=localStorage.getItem('shiprocketToken');
    console.log(token);
    const option= {
      headers:new  HttpHeaders().set('content-type', 'application/json').set('Authorization','Bearer '+token),
      params : new HttpParams().append('pickup_postcode','450001').append('delivery_postcode',pincode).append('weight','12').append('cod','1')
    }
    return this.http.get(this.apiUrl,option);
    }
}
