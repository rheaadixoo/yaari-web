import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getColors(){

    return this.http.get(this.apiUrl+'colors').pipe(map(response => {
      return response;
    }))

  }
}
