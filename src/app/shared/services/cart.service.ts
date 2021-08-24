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

  createCart(){
      const info = {totalAmount : 0}
      return this.http.post(this.apiUrl + 'carts' ,info).pipe(map(response =>{
            return response;
      }))
  }

  createCartDetail(payload){
    return this.http.post(this.apiUrl + 'cart-details' ,payload).pipe(map(response =>{
      return response;
    }))
  }
}
