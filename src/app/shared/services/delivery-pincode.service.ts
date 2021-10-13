import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams } from '@angular/common/http';
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
    const option= {
      params : new HttpParams().append('pickup_postcode','6546').append('delivery_postcode',pincode)
    }
    return this.http.post(this.apiUrl+pincode,{},option);
    }
}
