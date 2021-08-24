import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  createOrder(payload) {
    return this.http.post(this.apiUrl + 'orders', payload).pipe(map(response => {
      return response;
    }))
  }

  orderCheckout(txnToken,orderNum){
    // Setup log namespace query parameter
    let obj = {'txnToken' : txnToken , 'orderNumber' : orderNum};
    return this.http.get(this.apiUrl + 'payments/checkout',{params : obj}).pipe(map(response =>{
        return response;
    }))
  }
}
