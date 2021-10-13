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

  getOrders(id){
    const query = {
      where: {
        and: [{ userId : id},{status :'placed'}]
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'orders/details', options).pipe(map(response =>{
        return response;
    }))
  }

  cancelOrder(id){
    return this.http.patch(this.apiUrl + 'deliveries/order-cancel/'+id,{}).pipe(map(response =>{
      
        return response;
    }))
  }
}
