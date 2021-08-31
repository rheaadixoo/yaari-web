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

  getProductsList(subCatId){
    const query = {
      where: {
        and: [{ sub_category_id : subCatId},]
      },
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'products',options).pipe(map(response=>{
          return response;
    }))
  }

  getProductById(id){
    return this.http.get(this.apiUrl + 'products/' + id).pipe(map(response =>{
          return response;
    }))
  }
}
