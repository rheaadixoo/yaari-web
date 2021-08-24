import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getAllCollections(){
    return this.http.get(this.apiUrl + 'collections').pipe(map(response =>{
          return response;
    }))
  }
}
