import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  getProductsList(){
    return this.http.get(this.apiUrl + 'products').pipe(map(response=>{
          return response;
    }))
  }

  getProductById(id){
    return this.http.get(this.apiUrl + 'products/' + id).pipe(map(response =>{
          return response;
    }))
  }
}
