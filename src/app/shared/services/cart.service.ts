import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  createCart() {
    const info = { totalAmount: 0 }
    return this.http.post(this.apiUrl + 'carts', info).pipe(map(response => {
      return response;
    }))
  }

  updateCart(id,payload) {
    return this.http.patch(this.apiUrl + 'carts/'+id, payload).pipe(map(response => {
      return response;
    }))
  }

  createCartDetail(payload) {
    return this.http.post(this.apiUrl + 'cart-details', payload).pipe(map(response => {
      return response;
    }))
  }

  getCart(cart_id) {
    const query = {
      where: {
        and: [{ cartId : cart_id},]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "cart-details" , options).pipe(map(response => {
      return response;
    }))
  }

  deleteCartDetail(id){
    return this.http.delete(this.apiUrl + "cart-details/"+id).pipe(map(response => {
      return response;
    }))
  }
}
